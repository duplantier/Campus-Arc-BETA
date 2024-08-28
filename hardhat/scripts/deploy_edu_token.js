const hre = require("hardhat");

async function main() {
  // Get the contract factory for the EDUToken
  const EDUToken = await hre.ethers.getContractFactory("EDUToken");

  // Deploy the EDUToken contract with an initial supply of 1,000,000 tokens (adjust as needed)
  // The amount is specified in the smallest unit (wei) if the token has 18 decimal places
  const initialSupply = hre.ethers.parseUnits("100000000", 18); // 1,000,000 tokens with 18 decimals
  const eduToken = await EDUToken.deploy(initialSupply);

  await eduToken.waitForDeployment();
  console.log(`EDU Token deployed to ${eduToken.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
