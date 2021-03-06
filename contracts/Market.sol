// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Market is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;

    address payable public owner;
    uint256 public listingPrice = 0.015 ether;

    constructor() {
        owner = payable(msg.sender);
    }

    struct MarketItem {
        uint256 itemId;
        address nftContract; // nft contract address
        uint256 tokenId; // nft id
        address payable seller; // seller address
        address payable owner; // buyer address
        uint256 price; // listing price of nft
        bool sold; // sale state of nft. true = sold / false = not sold
        uint256 highestBid; // highest bid for nft
        address highestBidder; // highest biddder for nft
        bool started; // auction started
        bool ended; // auction end time
        uint256 endTime; // time auction ended
    }

    event MarketItemCreated(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold,
        uint256 highestBid,
        address highestBidder,
        bool started,
        bool ended,
        uint256 endTime
    );

    event NewBidPlaced(
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        bool sold,
        uint256 highestBid,
        address indexed highestBidder,
        uint256 endTime
    );

    event End(
        address nftContract,
        uint256 tokenId,
        address owner,
        address highestBidder,
        uint256 highestBid
    );

    event WithdrawBid(address indexed bidder, uint256 amount);

    mapping(uint256 => MarketItem) private idToMarketItem; // map id to a market item
    mapping(address => uint256) public bids; // map address to amount bidded

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function createMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price,
        uint256 time
    ) public payable nonReentrant {
        require(price > 0, "Price must be atleast 1 wei");
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        // set listing price to initial highest bid
        uint256 highestBid = price;

        // set highest bidder to seller
        address highestBidder = msg.sender;

        // start the auction
        bool started = true;

        // set auction end time
        uint256 endTime = time;

        idToMarketItem[itemId] = MarketItem(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            false,
            highestBid,
            highestBidder,
            started,
            false,
            endTime
        );

        // transfer ownership of the token to Market contract
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        // emit token creation event
        emit MarketItemCreated(
            itemId,
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            price,
            false,
            highestBid,
            highestBidder,
            started,
            false,
            endTime
        );
    }

    function placeBidOnAuction(
        address nftContract,
        uint256 itemId,
        uint256 bid
    ) public payable nonReentrant {
        uint256 tokenId = idToMarketItem[itemId].tokenId;
        uint256 highestBid = idToMarketItem[itemId].highestBid;
        address highestBidder = idToMarketItem[itemId].highestBidder;
        uint256 endTime = idToMarketItem[itemId].endTime;

        require(idToMarketItem[itemId].started, "Not Started");
        require(block.timestamp < idToMarketItem[itemId].endTime, "Ended!");
        require(
            bid > idToMarketItem[itemId].highestBid,
            "Bid is lower than highest bid"
        );

        if (idToMarketItem[itemId].highestBidder != address(0)) {
            bids[idToMarketItem[itemId].highestBidder] += idToMarketItem[itemId]
                .highestBid;
        }

        //* Update marketItem struct
        idToMarketItem[itemId].highestBid = bid;
        idToMarketItem[itemId].highestBidder = msg.sender;

        //* emit bid event
        emit NewBidPlaced(
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            false,
            highestBid,
            highestBidder,
            endTime
        );
    }

    function endMarketAuction(address nftContract, uint256 itemId)
        public
        nonReentrant
    {
        uint256 tokenId = idToMarketItem[itemId].tokenId;
        address highestBidder = idToMarketItem[itemId].highestBidder;
        uint256 highestBid = bids[highestBidder];
        address seller = idToMarketItem[itemId].seller;

        require(idToMarketItem[itemId].started, "Auction not started!");
        require(
            block.timestamp >= idToMarketItem[itemId].endTime,
            "Auction still in progress"
        );
        require(!idToMarketItem[itemId].ended, "Auction already ended!");

        if (idToMarketItem[itemId].highestBidder != address(0)) {
            // set owner of nft to highest bidder
            idToMarketItem[itemId].owner = payable(highestBidder);

            // transfer highest bid to seller at the end of the auction
            (bool sent, bytes memory data) = seller.call{value: highestBid}("");
            require(sent, "Couldn't credit seller");

            // transfer ownership of nft to the highest bidder at the end of the auction
            IERC721(nftContract).transferFrom(
                address(this),
                highestBidder,
                tokenId
            );

            // increment number of sold nfts
            _itemsSold.increment();

            // pay the contract/marketplace owner
            payable(owner).transfer(listingPrice);
        } else {
            IERC721(nftContract).transferFrom(address(this), seller, tokenId);
        }

        // set sale state to true
        idToMarketItem[itemId].sold = true;

        // set end state to true
        idToMarketItem[itemId].ended = true;

        emit End(
            nftContract,
            tokenId,
            idToMarketItem[itemId].owner,
            highestBidder,
            highestBid
        );
    }

    function withdrawBids(uint256 itemId) external payable {
        uint256 highestBid = idToMarketItem[itemId].highestBid;
        address sellerAddress = idToMarketItem[itemId].seller;

        // get bid placed by user's wallet
        uint256 placedBid = bids[msg.sender];

        // set msg.sender bid to 0
        bids[msg.sender] = 0;

        // make sure user isnt highest bidder
        require(placedBid < highestBid, "You are the highest bidder!");

        // make sure wallet address isn't the seller address
        require(msg.sender != sellerAddress, "You are the seller!");

        // set user's bids to 0
        bids[msg.sender] = 0;

        // send bid to user (withdrawal process)
        (bool sent, bytes memory data) = payable(msg.sender).call{
            value: placedBid
        }("");
        require(sent, "Could not withdraw");

        emit WithdrawBid(msg.sender, placedBid);
    }

    // get all unsold nfts
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _itemIds.current();
        uint256 unsoldItemCount = _itemIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].owner == address(0)) {
                uint256 currentId = idToMarketItem[i + 1].itemId;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    // get all nfts bought by a user
    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _itemIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = idToMarketItem[i + 1].itemId;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    // get all nfts created by the current user
    function fetchItemsCreated() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _itemIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                uint256 currentId = idToMarketItem[i + 1].itemId;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}
