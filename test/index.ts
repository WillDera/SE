import { ethers } from "hardhat";
import { expect } from "chai"
import moment from "moment";
// import { Market } from '../typechain-types/contracts/Market';

let NFTMarket, Market: any, marketAddress: any, NFT, nft: any, nftContractAddress: any;

async function convertInput(date: string) {
  let splitDate: any = date.split(" ")
  let value: number = parseInt(splitDate[0])
  let interval: any = splitDate[1]

  let epoch = moment(new Date()).add(value, interval).toDate();
  let Mepoch = moment(epoch).unix();

  return Mepoch;
}

describe("NFTMarket", function (){

  it("Should deploy and list 2 NFTs", async function() {
      // Get marketplace contract address
      NFTMarket = await ethers.getContractFactory("Market");
      Market = await NFTMarket.deploy()
      marketAddress = Market.address;
      
      // Get NFT contract address
      NFT = await ethers.getContractFactory("NFT")
      nft = await NFT.deploy(marketAddress);
      nftContractAddress = nft.address;


      // simulate simple deployment and listing
      await Market.deployed();

      await nft.deployed();

      // set listing price
      let listingPrice: string = await Market.getListingPrice();
      listingPrice = listingPrice.toString();

      const auctionPrice: any = ethers.utils.parseUnits("100", "ether");

      // set time of expiration to few seconds in the future
      const epoch5 = await convertInput('12 s');
      const epoch10 = await convertInput('14 s');

      
      await nft.createToken("https://www.mytokenlocation.com");
      await nft.createToken("https://www.mytokenlocation2.com");
      
      await nft.approve(marketAddress, 1)
      await Market.createMarketItem(nftContractAddress, 1, auctionPrice, epoch5, {
        value: listingPrice
      });

      await nft.approve(marketAddress, 2)
      await Market.createMarketItem(nftContractAddress, 2, auctionPrice, epoch10, {
        value: listingPrice
      });

      let listedItems: any = await Market.fetchMarketItems()
      expect(await listedItems).to.have.lengthOf(2);
    })

    it("Should deploy, list and accept bid for NFT", async function() {
      // place bid
      const [_, bidder1] = await ethers.getSigners();

      const bidPrice: any = ethers.utils.parseUnits("500", "ether");

      await Market.connect(bidder1).placeBidOnAuction(nftContractAddress, 1, bidPrice);

      await Market.connect(bidder1).placeBidOnAuction(nftContractAddress, 2, bidPrice);

    })

    it("Should place bid on a listed NFT, with a second address", async function(){
      const [_, , bidder2] = await ethers.getSigners();

      const bidPrice: any = ethers.utils.parseUnits("550", "ether");

      await Market.connect(bidder2).placeBidOnAuction(nftContractAddress, 2, bidPrice);

      let data: any = await Market.fetchMarketItems();
      expect(await data[1].highestBidder).to.be.equal(bidder2.address);
    })

    it("Should transfer NFT to winner of auction", async function() {
      const [_, , bidder2] = await ethers.getSigners();
      
      await new Promise(resolve => setTimeout(resolve, 16000));
      
      let tx = await Market.connect(bidder2).endMarketAuction(nftContractAddress, 2)
      await tx.wait();
    })

    it("Second bidder should be owner of an NFT", async function() {
        const [_, , bidder2] = await ethers.getSigners();
        let data: any = await Market.connect(bidder2).fetchMyNFTs();

        expect(await data[0].owner).to.be.equal(bidder2.address);
    })

    it("Should allow non-winners of an auction to withdraw their bids", async function() {
      const [_, bidder1, ] = await ethers.getSigners();

      await Market.connect(bidder1).withdrawBids(2);
      
      const testBid: any = ethers.utils.parseUnits("80", "ether");
      expect(await bidder1.getBalance()).to.be.above(testBid);
    })

});

describe("NFT Market Trials", async function () {
  it("7 days Trial: Should deploy and list an NFT", async function() {
    // Get marketplace contract address
    NFTMarket = await ethers.getContractFactory("Market");
    Market = await NFTMarket.deploy()
    marketAddress = Market.address;
    
    // Get NFT contract address
    NFT = await ethers.getContractFactory("NFT")
    nft = await NFT.deploy(marketAddress);
    nftContractAddress = nft.address;


    // simulate simple deployment and listing
    await Market.deployed();

    await nft.deployed();

    // set listing price
    let listingPrice: string = await Market.getListingPrice();
    listingPrice = listingPrice.toString();

    const auctionPrice: any = ethers.utils.parseUnits("100", "ether");

    // set time of expiration to 7days in the future
    const epoch7days = await convertInput('7 d');

    
    await nft.createToken("https://www.mytokenlocation.com");

    await nft.approve(marketAddress, 1)
    await Market.createMarketItem(nftContractAddress, 1, auctionPrice, epoch7days, {
      value: listingPrice
    });

    let listedItems: any = await Market.fetchMarketItems()
    expect(await listedItems).to.have.lengthOf(1);
    expect(await listedItems[0].endTime).to.equal(epoch7days);
  })
})