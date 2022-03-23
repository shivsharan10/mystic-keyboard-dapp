import { useState } from "react";
import SecondaryButton from "./secondary-button";
import { ethers } from "ethers";
import abi from "../utils/Keyboards.json"

export default function TipButton({ keyboardsContract, index }) {
  const contractAddress = '0x9f7170b9355F7eE227f2ed7CEF20b11BCD651fdF';
  const contractABI = abi.abi;

  const [mining, setMining] = useState(false)

  const submitTip = async (e) => {
    if (!keyboardsContract) {
      console.error('KeyboardsContract object is required to submit a tip');
      return;
    }
  
    setMining(true);
    try {
      const tipTxn = await keyboardsContract.tip(index, { value: ethers.utils.parseEther("0.01") })
      console.log('Tip transaction started...', tipTxn.hash)
  
      await tipTxn.wait();
      console.log('Sent tip!', tipTxn.hash);
    } finally {
      setMining(false);
    }
  }
  
  return <SecondaryButton onClick={submitTip} disabled={mining}>
    {mining ? 'Tipping...' : 'Tip 0.01 eth!'}
  </SecondaryButton>
}
