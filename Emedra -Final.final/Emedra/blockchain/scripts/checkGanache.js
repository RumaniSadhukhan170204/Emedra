import { ethers } from "ethers";

const contractABI = [
  "function storeReportHash(string memory hash) public returns (bool)",
  "function getReports() public view returns (string[] memory)"
];

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");

// Use one Ganache private key
const wallet = new ethers.Wallet(
  "0x77c5b6dfb65b79bbe78024a183cb7654b93e5cba0ce9f132f8b92479ed95f02a",
  provider
);

const contractAddress = "0xddac3dbbe907f43eb70b7bfc2842917cd8550584";

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

const main = async () => {
  // Read reports
  console.log("Reports before:", await contract.getReports());

  // Write transaction
  const tx = await contract.storeReportHash("ganache-test-hash");
  await tx.wait();

  // Check again
  console.log("Reports after:", await contract.getReports());
};

main();
