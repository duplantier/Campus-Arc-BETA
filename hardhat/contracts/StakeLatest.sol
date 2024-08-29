// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Context.sol";

// The Staking contract allows users to stake ERC20 tokens and earn rewards based on the staking duration.
contract StakeEduToken is Ownable {
    // The ERC20 token that users will stake
    IERC20 public eduToken;

    // Structure to store staking information for each user
    struct Stake {
        uint256 amount; // Amount of tokens staked by the user
        uint256 timestamp; // Time when the last stake or withdrawal occurred
    }

    // Mapping of user addresses to their stake information
    mapping(address => Stake) public stakes;

    // The reward rate is specified as the reward per second per staked EDU token
    uint256 public rewardRate;

    // Constructor to initialize the contract with the token address, reward rate, and owner
    constructor(
        address _eduTokenAddress, // Address of the ERC20 token contract
        uint256 _rewardRate, // Reward rate per second per staked token
        address _owner // Initial owner of the contract
    ) Ownable(_owner) {
        eduToken = IERC20(_eduTokenAddress); // Set the ERC20 token contract
        rewardRate = _rewardRate; // Set the reward rate
    }

    // Function to stake a specified amount of tokens
    function stake(uint256 _amount) external {
        require(_amount > 0, "Cannot stake 0 tokens");

        // Transfer tokens from the user to the contract
        require(
            eduToken.transferFrom(msg.sender, address(this), _amount),
            "Transfer Failed"
        );

        // Calculate rewards if user already has a stake
        uint256 rewards = 0;
        if (stakes[msg.sender].amount > 0) {
            rewards = calculateRewards(msg.sender);
        }

        // Update the user's stake amount and prevent overflow
        stakes[msg.sender].amount = safeAdd(stakes[msg.sender].amount, rewards);
        stakes[msg.sender].amount = safeAdd(stakes[msg.sender].amount, _amount);
        stakes[msg.sender].timestamp = block.timestamp;
    }

    // Function to withdraw a specified amount of tokens
    function withdraw(uint256 _amount) external {
        require(
            stakes[msg.sender].amount >= _amount,
            "Insufficient balance to withdraw"
        );

        // Calculate rewards earned since the last withdrawal
        uint256 rewards = calculateRewards(msg.sender);
        stakes[msg.sender].amount = safeAdd(stakes[msg.sender].amount, rewards);
        stakes[msg.sender].amount = safeSubtract(
            stakes[msg.sender].amount,
            _amount
        );
        stakes[msg.sender].timestamp = block.timestamp;

        // Transfer tokens from the contract to the user
        require(eduToken.transfer(msg.sender, _amount), "Transfer failed");
    }

    // Function to calculate rewards for a given staker
    function calculateRewards(address _staker) public view returns (uint256) {
        Stake memory stakeInfo = stakes[_staker];
        uint256 stakedTime = block.timestamp - stakeInfo.timestamp; // Calculate time since last update

        // Safely calculate reward
        uint256 reward = safeMultiply(stakeInfo.amount, stakedTime);
        reward = safeMultiply(reward, rewardRate);
        return reward;
    }

    // Function to update the reward rate (only callable by the contract owner)
    function setRewardRate(uint256 _newRate) external onlyOwner {
        rewardRate = _newRate; // Set a new reward rate
    }

    // Safe Math Functions
    function safeAdd(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "Addition overflow");
        return c;
    }

    function safeSubtract(
        uint256 a,
        uint256 b
    ) internal pure returns (uint256) {
        require(b <= a, "Subtraction underflow");
        return a - b;
    }

    function safeMultiply(
        uint256 a,
        uint256 b
    ) internal pure returns (uint256) {
        // If one of the values is 0, multiplication can't overflow
        if (a == 0 || b == 0) {
            return 0;
        }
        uint256 c = a * b;
        require(c / a == b, "Multiplication overflow");
        return c;
    }
}
