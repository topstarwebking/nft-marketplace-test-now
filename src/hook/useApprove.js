import { useContractFunction } from "@usedapp/core";
import { useEffect, useState } from "react";
import useContract from "./useContract";
import ASIX from '../abi/ASIX_TOKEN.json';


const useApprove = () => {
    const tokenContract = useContract(ASIX.address, ASIX.abi);

    const { state, send } = useContractFunction(tokenContract, "approve");
    
    return [state, send];
}

export default useApprove;