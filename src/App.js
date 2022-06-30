import logo from './logo.svg';
import './App.css';
import ConnectButton from './components/ConnectButton/ConnectButton';
import { useEthers, useTokenBalance } from '@usedapp/core';

import ASIX from './abi/ASIX_TOKEN.json';
import NFT from './abi/NFT.json';
import Marketplace from './abi/NFTMarketPlace.json';

import useMintNewNFT from './hook/useMintNewNFT';
import useContract from './hook/useContract';
import { parseUnits } from '@ethersproject/units';
import useCreateNewSellOrder from './hook/useCreateNewSellOrder';
import useApprove from './hook/useApprove';
import useBuyNFT from './hook/useBuyNFT';

const nftTokenUri = "https://gateway.ipfs.io/QwEsSfsdfEFSe";
const price = 20000;
const marketFee = 10000;

function App() {
  const [mintState, mintNFT, tokenId] = useMintNewNFT();
  const [sellOrderState, createNewSellOrder] = useCreateNewSellOrder();
  const [buyState, buyNFT] = useBuyNFT();
  const [approveState, approve] = useApprove();

  return (
    <>
      <ConnectButton />
      <div>
        <button onClick={() => mintNFT(nftTokenUri)}>Mint NFT</button>
        <p>tokenId: {tokenId}</p>

        <button onClick={() => approve(Marketplace.address, parseUnits(`${marketFee}`, 9).toString())} disabled={mintState.status !== 'Success'}>Approve ASIX Token For Sell: {marketFee}</button>

        <button onClick={() => createNewSellOrder(NFT.address, tokenId, parseUnits(`${price}`, 9).toString())} disabled={mintState.status !== 'Success' || approveState.status !== 'Success'}>Create New Sell order</button>
        <p>Sell Order State: {sellOrderState.status}</p>

        <button onClick={() => approve(Marketplace.address, parseUnits(`${price}`, 9).toString())} disabled={sellOrderState.status !== 'Success' }>Approve ASIX Token For Buy: {price}</button>
        
        <button onClick={() => buyNFT(NFT.address, tokenId)} disabled={sellOrderState.status !== 'Success' || approveState.status !== 'Success' }>Buy NFT</button>
        <p>Buy Order State: {buyState.status}</p>

      </div>
    </>
  );
}

export default App;
