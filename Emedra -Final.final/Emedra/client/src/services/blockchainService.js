import { ethers } from "ethers";

const contractABI = [
  "function storeReportHash(string hash) public returns (bool)",
  "function getReports() public view returns (string[])"
];

const contractAddress = "0xddac3dbbe907f43eb70b7bfc2842917cd8550584"; // Replace with your Ganache contract address
const rpcUrl = "http://127.0.0.1:7545"; // Ganache RPC
const privateKey = "0x77c5b6dfb65b79bbe78024a183cb7654b93e5cba0ce9f132f8b92479ed95f02a"; // Ganache private key

let contract;

export function initBlockchain() {
  try {
    const provider = new ethers.JsonRpcProvider(rpcUrl); // ✅ v6
    const wallet = new ethers.Wallet(privateKey, provider);
    contract = new ethers.Contract(contractAddress, contractABI, wallet);
    console.log("✅ Blockchain initialized:", contractAddress);
  } catch (err) {
    console.error("❌ Blockchain init failed:", err);
  }
}

export async function getReports() {
  if (!contract) throw new Error("Blockchain not initialized");
  try {
    const reports = await contract.getReports();
    return reports;
  } catch (err) {
    console.error("❌ Error fetching reports:", err);
    throw err;
  }
}

export async function storeOnBlockchain(hash) {
  if (!contract) throw new Error("Blockchain not initialized");
  try {
    const tx = await contract.storeReportHash(hash);
    console.log("⏳ Transaction sent:", tx.hash);
    await tx.wait();
    console.log("✅ Transaction mined:", tx.hash);
    return tx.hash;
  } catch (err) {
    console.error("❌ Error storing hash:", err);
    throw err;
  }
}



