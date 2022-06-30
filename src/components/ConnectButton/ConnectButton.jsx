import React from 'react';
import { useEtherBalance, useEthers, useTokenBalance } from '@usedapp/core';
import { ethers } from 'ethers';
import ASIX from '../../abi/ASIX_TOKEN.json';

const ConnectButton = () => {
    const { account, deactivate, activateBrowserWallet } = useEthers();
    
    const etherBalance = useEtherBalance(account)
    const tokenBalance = useTokenBalance(ASIX.address, account)

    const connectWallet = async () => {
        await activateBrowserWallet();
    }

    return (
        <>
            {!account && <button onClick={() => connectWallet()}>Connect</button> }

            {account && (
                <>
                <p>{account}</p>
                {
                    etherBalance && 
                    <p>BNB balance: {ethers.utils.formatEther(etherBalance)}</p>
                }
                {
                    tokenBalance &&
                    <p>ASIX Balance: {ethers.utils.formatEther(tokenBalance.mul(10 ** 9) )}</p>
                }
                <button onClick={() => deactivate()}>Disconnect</button>
                </>
            )
            }
        </>
    )
}

export default ConnectButton;