const hre = require("hardhat");

async function main() {
  const Uma = await hre.ethers.getContractFactory("Uma");

  const uma = await Uma.deploy();

  await uma.deployed();

  console.log("Uma deployed to the", uma.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
