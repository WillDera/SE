import { ethers } from "hardhat";
import { expect } from "chai"
// import { Market } from '../typechain-types/contracts/Market';

let NFTMarket, Market: any, marketAddress: any, NFT, nft: any, nftContractAddress: any;

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

      
      await nft.createToken("https://www.mytokenlocation.com");
      await nft.createToken("https://www.mytokenlocation2.com");
      
      await Market.isApprovedForAll
      
      await nft.approve(marketAddress, 1)
      await Market.createMarketItem(nftContractAddress, 1, auctionPrice, {
        value: listingPrice
      });

      await nft.approve(marketAddress, 2)
      await Market.createMarketItem(nftContractAddress, 2, auctionPrice, {
        value: listingPrice
      });

      let listedItems: any = await Market.fetchMarketItems()
      expect(await listedItems).to.have.lengthOf(2);
    })
});

describe("Greeter", function () {
  it("Should log to console", async function () {
    console.log("I'am The Greeter!")
  });
});
