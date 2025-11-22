const hre = require("hardhat");

async function run() {
  const [owner] = await hre.ethers.getSigners();
  const emedra = await hre.ethers.getContractAt("Emedra", "DEPLOYED_ADDRESS");

  await emedra.uploadReport("QmHash123", "Blood Test Report");
  console.log("Report uploaded");
}
run();
