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
  // this.beforeEach(async () => {
  //   await new Promise(resolve => setTimeout(resolve, 16000));
  //  console.log("----------------------");
  // })

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
      console.log({"Owner:": _.address, "bidder1:": bidder1.address})

      const bidPrice: any = ethers.utils.parseUnits("500", "ether");

      await Market.connect(bidder1).placeBidOnAuction(nftContractAddress, 1, bidPrice);

      await Market.connect(bidder1).placeBidOnAuction(nftContractAddress, 2, bidPrice);

    })

    it("Should place bid on a listed NFT, with a different address", async function(){
      const [_, , bidder2] = await ethers.getSigners();
      console.log({"Owner:": _.address, "bidder2:": bidder2.address})

      const bidPrice: any = ethers.utils.parseUnits("550", "ether");

      await Market.connect(bidder2).placeBidOnAuction(nftContractAddress, 2, bidPrice);

      let data: any = await Market.fetchMarketItems();
      console.log(data);
    })

    it("Transfer NFT to winner of auction", async function() {
      const [_, bidder1, bidder2] = await ethers.getSigners();
      
      await new Promise(resolve => setTimeout(resolve, 16000));
      
      let tx = await Market.connect(bidder2).endMarketAuction(nftContractAddress, 2)
      tx.wait();
    })

    // it("Should return NFT owned by user", async function() {
    //   // await new Promise(resolve => setTimeout(resolve, 10000));
    //     const [_, bidder1, bidder2] = await ethers.getSigners();
    //     let data: any = await Market.connect(bidder2).fetchMyNFTs();

    //     console.log("------------NFTs------------", data);
    // })
});

describe("Greeter", function () {
  it("Should log to console", async function () {

    console.log("Welcoming You to This place! 🤣");
  });
});
