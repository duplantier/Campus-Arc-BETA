// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Context.sol";

// The Staking contract allows users to stake ERC20 tokens and earn rewards based on the staking duration.
// Yani öğrenci 28 günlük bir Arc Module sonunda hem harika bir eğitim almış hem de para kazanmış oluyor.
// It inherits from Ownable to ensure that only the owner can set the reward rate.

contract StakeToken is Ownable {
    // The ERC20 token that users will stake
    IERC20 public eduToken;

    // Structure to store staking information for each user
    // Type definition aslında.
    struct Stake {
        uint256 amount; // Amount of tokens staked by the user
        uint256 timestamp; // Time when the last stake or withdrawal occurred
    }

    // Mapping of user addresses to their stake information
    // Kullanıcı adresini kullanarak, o kullanıcının stake bilgilerine erişiyoruz.
    // Hangi tarih ve zamanda ne kadar EDU stake ettiği bilgisini alıyoruz.
    // stakes array'ine address'i input olarak vericez, o bize o adresin stake bilgisini verecek
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

        // Calculate rewards before updating the stake
        uint256 rewards = calculateRewards(msg.sender);

        // Update the user's stake
        stakes[msg.sender].amount += rewards; // Add rewards first
        stakes[msg.sender].amount += _amount; // Then add new stake
        stakes[msg.sender].timestamp = block.timestamp;

        // Transfer tokens after updating state
        require(
            eduToken.transferFrom(msg.sender, address(this), _amount),
            "Transfer Failed"
        );
    }

    // Function to withdraw a specified amount of tokens
    function withdraw(uint256 _amount) external {
        // Ensure the user has enough staked tokens to withdraw
        require(
            stakes[msg.sender].amount >= _amount,
            "Insufficient balance to withdraw"
        );

        // Calculate rewards earned since the last withdrawal
        uint256 rewards = calculateRewards(msg.sender);
        stakes[msg.sender].amount += rewards;
        stakes[msg.sender].amount -= _amount;

        // Update the user's stake timestamp
        stakes[msg.sender].timestamp = block.timestamp;

        // Transfer tokens from the contract to the user
        require(eduToken.transfer(msg.sender, _amount), "Transfer failed");
    }

    // Function to calculate rewards for a given staker
    function calculateRewards(address _staker) public view returns (uint256) {
        Stake memory stakeInfo = stakes[_staker];
        uint256 stakedTime = block.timestamp - stakeInfo.timestamp; // Calculate time since last update
        uint256 reward = stakedTime * stakeInfo.amount * rewardRate; // Calculate reward based on time, amount, and rate
        return reward;
    }

    // Function to update the reward rate (only callable by the contract owner)
    function setRewardRate(uint256 _newRate) external onlyOwner {
        rewardRate = _newRate; // Set a new reward rate
    }
}
