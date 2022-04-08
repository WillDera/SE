/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../common";

export declare namespace Market {
  export type MarketItemStruct = {
    itemId: BigNumberish;
    nftContract: string;
    tokenId: BigNumberish;
    seller: string;
    owner: string;
    price: BigNumberish;
    sold: boolean;
    highestBid: BigNumberish;
    highestBidder: string;
    started: boolean;
    ended: boolean;
    endTime: BigNumberish;
  };

  export type MarketItemStructOutput = [
    BigNumber,
    string,
    BigNumber,
    string,
    string,
    BigNumber,
    boolean,
    BigNumber,
    string,
    boolean,
    boolean,
    BigNumber
  ] & {
    itemId: BigNumber;
    nftContract: string;
    tokenId: BigNumber;
    seller: string;
    owner: string;
    price: BigNumber;
    sold: boolean;
    highestBid: BigNumber;
    highestBidder: string;
    started: boolean;
    ended: boolean;
    endTime: BigNumber;
  };
}

export interface MarketInterface extends utils.Interface {
  functions: {
    "bids(address)": FunctionFragment;
    "createMarketItem(address,uint256,uint256)": FunctionFragment;
    "endMarketAuction(address,uint256)": FunctionFragment;
    "fetchItemsCreated()": FunctionFragment;
    "fetchMarketItems()": FunctionFragment;
    "fetchMyNFTs()": FunctionFragment;
    "getListingPrice()": FunctionFragment;
    "listingPrice()": FunctionFragment;
    "owner()": FunctionFragment;
    "placeBidOnAuction(address,uint256,uint256)": FunctionFragment;
    "withdrawBids(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "bids"
      | "createMarketItem"
      | "endMarketAuction"
      | "fetchItemsCreated"
      | "fetchMarketItems"
      | "fetchMyNFTs"
      | "getListingPrice"
      | "listingPrice"
      | "owner"
      | "placeBidOnAuction"
      | "withdrawBids"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "bids", values: [string]): string;
  encodeFunctionData(
    functionFragment: "createMarketItem",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "endMarketAuction",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "fetchItemsCreated",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "fetchMarketItems",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "fetchMyNFTs",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getListingPrice",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "listingPrice",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "placeBidOnAuction",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawBids",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "bids", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "createMarketItem",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "endMarketAuction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "fetchItemsCreated",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "fetchMarketItems",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "fetchMyNFTs",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getListingPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "listingPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "placeBidOnAuction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawBids",
    data: BytesLike
  ): Result;

  events: {
    "Bid(address,uint256)": EventFragment;
    "End(address,uint256)": EventFragment;
    "MarketItemCreatedOrAuctionEnded(uint256,address,uint256,address,address,uint256,bool,uint256,address,bool,bool,uint256)": EventFragment;
    "NewBidPlaced(address,uint256,address,address,bool,uint256,address,uint256)": EventFragment;
    "WithdrawBid(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Bid"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "End"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "MarketItemCreatedOrAuctionEnded"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewBidPlaced"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WithdrawBid"): EventFragment;
}

export interface BidEventObject {
  sender: string;
  amount: BigNumber;
}
export type BidEvent = TypedEvent<[string, BigNumber], BidEventObject>;

export type BidEventFilter = TypedEventFilter<BidEvent>;

export interface EndEventObject {
  highestBidder: string;
  highestBid: BigNumber;
}
export type EndEvent = TypedEvent<[string, BigNumber], EndEventObject>;

export type EndEventFilter = TypedEventFilter<EndEvent>;

export interface MarketItemCreatedOrAuctionEndedEventObject {
  itemId: BigNumber;
  nftContract: string;
  tokenId: BigNumber;
  seller: string;
  owner: string;
  price: BigNumber;
  sold: boolean;
  highestBid: BigNumber;
  highestBidder: string;
  started: boolean;
  ended: boolean;
  endTime: BigNumber;
}
export type MarketItemCreatedOrAuctionEndedEvent = TypedEvent<
  [
    BigNumber,
    string,
    BigNumber,
    string,
    string,
    BigNumber,
    boolean,
    BigNumber,
    string,
    boolean,
    boolean,
    BigNumber
  ],
  MarketItemCreatedOrAuctionEndedEventObject
>;

export type MarketItemCreatedOrAuctionEndedEventFilter =
  TypedEventFilter<MarketItemCreatedOrAuctionEndedEvent>;

export interface NewBidPlacedEventObject {
  nftContract: string;
  tokenId: BigNumber;
  seller: string;
  owner: string;
  sold: boolean;
  highestBid: BigNumber;
  highestBidder: string;
  endTime: BigNumber;
}
export type NewBidPlacedEvent = TypedEvent<
  [string, BigNumber, string, string, boolean, BigNumber, string, BigNumber],
  NewBidPlacedEventObject
>;

export type NewBidPlacedEventFilter = TypedEventFilter<NewBidPlacedEvent>;

export interface WithdrawBidEventObject {
  bidder: string;
  amount: BigNumber;
}
export type WithdrawBidEvent = TypedEvent<
  [string, BigNumber],
  WithdrawBidEventObject
>;

export type WithdrawBidEventFilter = TypedEventFilter<WithdrawBidEvent>;

export interface Market extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MarketInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    bids(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    createMarketItem(
      nftContract: string,
      tokenId: BigNumberish,
      price: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    endMarketAuction(
      nftContract: string,
      itemId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    fetchItemsCreated(
      overrides?: CallOverrides
    ): Promise<[Market.MarketItemStructOutput[]]>;

    fetchMarketItems(
      overrides?: CallOverrides
    ): Promise<[Market.MarketItemStructOutput[]]>;

    fetchMyNFTs(
      overrides?: CallOverrides
    ): Promise<[Market.MarketItemStructOutput[]]>;

    getListingPrice(overrides?: CallOverrides): Promise<[BigNumber]>;

    listingPrice(overrides?: CallOverrides): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    placeBidOnAuction(
      nftContract: string,
      itemId: BigNumberish,
      bid: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawBids(
      itemId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  bids(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  createMarketItem(
    nftContract: string,
    tokenId: BigNumberish,
    price: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  endMarketAuction(
    nftContract: string,
    itemId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  fetchItemsCreated(
    overrides?: CallOverrides
  ): Promise<Market.MarketItemStructOutput[]>;

  fetchMarketItems(
    overrides?: CallOverrides
  ): Promise<Market.MarketItemStructOutput[]>;

  fetchMyNFTs(
    overrides?: CallOverrides
  ): Promise<Market.MarketItemStructOutput[]>;

  getListingPrice(overrides?: CallOverrides): Promise<BigNumber>;

  listingPrice(overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  placeBidOnAuction(
    nftContract: string,
    itemId: BigNumberish,
    bid: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawBids(
    itemId: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    bids(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    createMarketItem(
      nftContract: string,
      tokenId: BigNumberish,
      price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    endMarketAuction(
      nftContract: string,
      itemId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    fetchItemsCreated(
      overrides?: CallOverrides
    ): Promise<Market.MarketItemStructOutput[]>;

    fetchMarketItems(
      overrides?: CallOverrides
    ): Promise<Market.MarketItemStructOutput[]>;

    fetchMyNFTs(
      overrides?: CallOverrides
    ): Promise<Market.MarketItemStructOutput[]>;

    getListingPrice(overrides?: CallOverrides): Promise<BigNumber>;

    listingPrice(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    placeBidOnAuction(
      nftContract: string,
      itemId: BigNumberish,
      bid: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawBids(
      itemId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Bid(address,uint256)"(
      sender?: string | null,
      amount?: null
    ): BidEventFilter;
    Bid(sender?: string | null, amount?: null): BidEventFilter;

    "End(address,uint256)"(
      highestBidder?: null,
      highestBid?: null
    ): EndEventFilter;
    End(highestBidder?: null, highestBid?: null): EndEventFilter;

    "MarketItemCreatedOrAuctionEnded(uint256,address,uint256,address,address,uint256,bool,uint256,address,bool,bool,uint256)"(
      itemId?: BigNumberish | null,
      nftContract?: string | null,
      tokenId?: BigNumberish | null,
      seller?: null,
      owner?: null,
      price?: null,
      sold?: null,
      highestBid?: null,
      highestBidder?: null,
      started?: null,
      ended?: null,
      endTime?: null
    ): MarketItemCreatedOrAuctionEndedEventFilter;
    MarketItemCreatedOrAuctionEnded(
      itemId?: BigNumberish | null,
      nftContract?: string | null,
      tokenId?: BigNumberish | null,
      seller?: null,
      owner?: null,
      price?: null,
      sold?: null,
      highestBid?: null,
      highestBidder?: null,
      started?: null,
      ended?: null,
      endTime?: null
    ): MarketItemCreatedOrAuctionEndedEventFilter;

    "NewBidPlaced(address,uint256,address,address,bool,uint256,address,uint256)"(
      nftContract?: string | null,
      tokenId?: BigNumberish | null,
      seller?: null,
      owner?: null,
      sold?: null,
      highestBid?: null,
      highestBidder?: string | null,
      endTime?: null
    ): NewBidPlacedEventFilter;
    NewBidPlaced(
      nftContract?: string | null,
      tokenId?: BigNumberish | null,
      seller?: null,
      owner?: null,
      sold?: null,
      highestBid?: null,
      highestBidder?: string | null,
      endTime?: null
    ): NewBidPlacedEventFilter;

    "WithdrawBid(address,uint256)"(
      bidder?: string | null,
      amount?: null
    ): WithdrawBidEventFilter;
    WithdrawBid(bidder?: string | null, amount?: null): WithdrawBidEventFilter;
  };

  estimateGas: {
    bids(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    createMarketItem(
      nftContract: string,
      tokenId: BigNumberish,
      price: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    endMarketAuction(
      nftContract: string,
      itemId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    fetchItemsCreated(overrides?: CallOverrides): Promise<BigNumber>;

    fetchMarketItems(overrides?: CallOverrides): Promise<BigNumber>;

    fetchMyNFTs(overrides?: CallOverrides): Promise<BigNumber>;

    getListingPrice(overrides?: CallOverrides): Promise<BigNumber>;

    listingPrice(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    placeBidOnAuction(
      nftContract: string,
      itemId: BigNumberish,
      bid: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawBids(
      itemId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    bids(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    createMarketItem(
      nftContract: string,
      tokenId: BigNumberish,
      price: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    endMarketAuction(
      nftContract: string,
      itemId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    fetchItemsCreated(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    fetchMarketItems(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    fetchMyNFTs(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getListingPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    listingPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    placeBidOnAuction(
      nftContract: string,
      itemId: BigNumberish,
      bid: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawBids(
      itemId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
