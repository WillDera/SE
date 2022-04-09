// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { expect } from "chai"
// import { Market } from '../typechain-types/contracts/Market';

let NFTMarket, Market: any, marketAddress: any, NFT, nft: any, nftContractAddress: any;

async function main() {

  // Get marketplace contract address
  NFTMarket = await ethers.getContractFactory("Market");
  Market = await NFTMarket.deploy()
  marketAddress = Market.address;
  
  // Get NFT contract address
  NFT = await ethers.getContractFactory("NFT")
  nft = await NFT.deploy(marketAddress);
  nftContractAddress = nft.address;

  describe("NFTMarket", function (){
    it("Should deploy and list an NFT", async function() {
      // simulate simple deployment and listing
      await Market.deployed();

      await nft.deployed();

      // set listing price
      let listingPrice: string = await Market.getListingPrice();
      listingPrice = listingPrice.toString();

      const auctionPrice: any = ethers.utils.parseUnits("100", "ether");

      await nft.createToken("https://www.mytokenlocation.com");
      await nft.createToken("https://www.mytokenlocation2.com");

      await Market.createMarketItem(nftContractAddress, 1, auctionPrice, {
        value: listingPrice
      });

      await Market.createMarketItem(nftContractAddress, 1, auctionPrice, {
        value: listingPrice
      });

      let listedItems: any = await Market.fetchMarketItems()
      expect(listedItems).to.have.lengthOf(2);
    })
  })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
