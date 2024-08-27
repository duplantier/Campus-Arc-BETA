const hre = require("hardhat");

async function main() {
  // Get the contract factory for the Staking contract
  const Staking = await hre.ethers.getContractFactory("StakeEduToken");

  // The address of the deployed EDUToken contract
  const eduTokenAddress = "0xD279Cea1B5168A0801486Be1715F547cab669113";

  // Set the reward rate (e.g., 1 token per second)
  const rewardRate = hre.ethers.parseUnits("1", 15); // Adjust as needed

  // The deployer's address (owner)
  const [deployer] = await hre.ethers.getSigners();
  const ownerAddress = deployer.address;

  // Deploy the Staking contract with the specified parameters
  const staking = await Staking.deploy(
    eduTokenAddress,
    rewardRate,
    ownerAddress
  );

  await staking.waitForDeployment();
  console.log(`Staking contract deployed to ${staking.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
