const { eduTokenAbi } = require("../abis");
const { ethers, hardhat } = require("hardhat");

async function transferTokens(fromAddress, toAddress, amount) {
  // Connect to the blockchain network
  const provider = new ethers.providers.JsonRpcProvider();
  const signer = provider.getSigner();

  // Load the token contract
  const tokenContractAddress = process.env.EDUTOKEN_ADDRESS;
  const tokenContract = new ethers.Contract(
    tokenContractAddress,
    eduTokenAbi,
    signer
  );

  // Transfer tokens
  const transaction = await tokenContract.transfer(toAddress, amount);
  await transaction.wait();

  console.log(
    `Transferred ${amount} tokens from ${fromAddress} to ${toAddress}`
  );
}

transferTokens(
  "0xE7892374cB5B75cF1cd3eeEB675C3dCb67762F5A",
  "0x8cd93F2c343769ec6e3184551Fb4Fc1e7F9A6704",
  "12500000"
);
