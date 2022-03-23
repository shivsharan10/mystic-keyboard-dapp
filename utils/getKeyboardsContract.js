import { ethers } from "ethers";

import abi from "../utils/Keyboards.json"

const contractAddress = '0x9f7170b9355F7eE227f2ed7CEF20b11BCD651fdF';
const contractABI = abi.abi;

export default function getKeyboardsContract(ethereum) {
  if(ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  } else {
    return undefined;
  }
}
