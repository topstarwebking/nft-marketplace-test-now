import { useContractFunction } from "@usedapp/core";
import { useEffect, useState } from "react";
import useContract from "./useContract";
import marketABI from '../abi/NFTMarketPlace.json';


const useCreateNewSellOrder = () => {
    const marketContract = useContract(marketABI.address, marketABI.abi);
    const { state, send } = useContractFunction(marketContract, "createItemForSaleWithToken");
    
    useEffect(() => {
        console.log('sell order state: ', state)
    }, [state]);
    
    return [state, send];
}

export default useCreateNewSellOrder;