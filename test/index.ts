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
      const epoch = await convertInput('7 d');

      
      await nft.createToken("https://www.mytokenlocation.com");
      await nft.createToken("https://www.mytokenlocation2.com");
      
      await Market.isApprovedForAll
      
      await nft.approve(marketAddress, 1)
      await Market.createMarketItem(nftContractAddress, 1, auctionPrice, epoch, {
        value: listingPrice
      });

      await nft.approve(marketAddress, 2)
      await Market.createMarketItem(nftContractAddress, 2, auctionPrice, epoch, {
        value: listingPrice
      });

      let listedItems: any = await Market.fetchMarketItems()
      expect(await listedItems).to.have.lengthOf(2);

      let data: any = await Market.fetchMarketItems();
      console.log(data);
    })

    it("Should deploy, list and accept bid for NFT", async function() {
      // place bid
      const [_, bidder1, bidder2] = await ethers.getSigners();
      console.log({"Owner:": _.address, "bidder1:": bidder1.address})

      const bidPrice: any = ethers.utils.parseUnits("500", "ether");

      await Market.connect(bidder1).placeBidOnAuction(nftContractAddress, 1, bidPrice);

      await Market.connect(bidder1).placeBidOnAuction(nftContractAddress, 2, bidPrice);

      let data: any = await Market.fetchMarketItems();
    })

    it("Should place bid with a different address", async function(){
      const [_, bidder1, bidder2] = await ethers.getSigners();
      console.log({"Owner:": _.address, "bidder2:": bidder2.address})

      const bidPrice: any = ethers.utils.parseUnits("550", "ether");

      await Market.connect(bidder2).placeBidOnAuction(nftContractAddress, 2, bidPrice);

      let data: any = await Market.fetchMarketItems();
      console.log(data);
    })
});

describe("Greeter", function () {
  it("Should log to console", async function () {

    console.log("Welcoming You to This place! 🤣");
  });
});
