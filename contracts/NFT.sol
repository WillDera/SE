// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address public contractAddress;

    constructor(address marketplaceAddress) ERC721("Metaverse Tokens", "METT") {
        contractAddress = marketplaceAddress;
    }

    function createToken(string memory tokenURI) public returns (uint256) {
        // increment the value of _tokenIds from 0
        _tokenIds.increment();
        // assign the current value of _tokenIds to newItemId
        uint256 newItemId = _tokenIds.current();

        // mint token
        _mint(msg.sender, newItemId);
        // set token uri
        _setTokenURI(newItemId, tokenURI);
        // give marketplace approval to transact the token between users
        setApprovalForAll(contractAddress, true);

        return newItemId;
    }
}
