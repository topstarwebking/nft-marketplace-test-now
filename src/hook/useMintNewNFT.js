import { useContractFunction } from "@usedapp/core";
import { useEffect, useState } from "react";
import useContract from "./useContract";
import NFT_ABI from '../abi/NFT.json';


const useMintNewNFT = () => {
    const nftContract = useContract(NFT_ABI.address, NFT_ABI.abi);
    const { state, send } = useContractFunction(nftContract, "createNFTToken");
    const [tokenId, setTokenId] = useState(undefined);
    
    useEffect(() => {
        console.log('state: ', state);
        if (state.status == 'Success') {
            let _tokenId = state.receipt.events[0].args.tokenId.toNumber();
            setTokenId(_tokenId)
        }
    }, [state.status]);
    
    return [state, send, tokenId];
}

export default useMintNewNFT;