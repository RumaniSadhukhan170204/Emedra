async function main() {
  const Emedra = await ethers.getContractFactory("Emedra");
  const emedra = await Emedra.deploy();
  await emedra.deployed();
  console.log("Emedra deployed to:", emedra.address);
}
main();
