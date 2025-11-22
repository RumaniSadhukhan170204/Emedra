// services/reportService.js
import { ethers } from "ethers";
import { uploadToIPFS } from "./ipfsService"; // 👈 assumes you created this service

// Smart contract ABI
const contractABI = [
  "function storeReportHash(string memory hash) public returns (bool)",
  "function getReports() public view returns (string[] memory)"
];

// Ganache RPC provider
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");

// Use one Ganache account private key (from Ganache UI → copy private key)
const wallet = new ethers.Wallet(
  "0x77c5b6dfb65b79bbe78024a183cb7654b93e5cba0ce9f132f8b92479ed95f02a",
  provider
);

// Replace with your deployed contract address from Remix/Ganache
const contractAddress = "0xddac3dbbe907f43eb70b7bfc2842917cd8550584";

// Connect contract
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

/**
 * Upload file to IPFS and store CID on blockchain
 */
export const uploadReport = async (file) => {
  try {
    // Step 1: Upload to IPFS
    const { cid } = await uploadToIPFS(file);

    // Step 2: Store on blockchain
    const tx = await contract.storeReportHash(cid.toString());
    const receipt = await tx.wait();

    return { cid: cid.toString(), txHash: receipt.transactionHash };
  } catch (err) {
    console.error("Upload failed:", err);
    return { error: err.message };
  }
};

/**
 * Fetch report history directly from blockchain
 */
export const getHistory = async () => {
  try {
    const reports = await contract.getReports();
    // Map them into objects
    return reports.map((cid, i) => ({
      cid,
      txHash: `Tx #${i + 1} (stored on chain)` // Placeholder, unless you track tx hashes separately
    }));
  } catch (err) {
    console.error("Error fetching history:", err);
    return [];
  }
};

