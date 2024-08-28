const hre = require("hardhat");

async function main() {
  const Staking = await hre.ethers.getContractFactory("StakeEduToken");

  const eduTokenAddress = process.env.EDUTOKEN_ADDRESS;

  const rewardRate = hre.ethers.parseUnits("1", 15);

  const [deployer] = await hre.ethers.getSigners(); // Dev1
  const ownerAddress = deployer.address;

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
