import { useContractFunction } from "@usedapp/core";
import { useEffect, useState } from "react";
import useContract from "./useContract";
import marketABI from '../abi/NFTMarketPlace.json';


const useBuyNFT = () => {
    const marketContract = useContract(marketABI.address, marketABI.abi);
    const { state, send } = useContractFunction(marketContract, "createMarketForSaleWithToken");
    
    useEffect(() => {
        console.log('buy order state: ', state)
    }, [state]);
    
    return [state, send];
}

export default useBuyNFT;