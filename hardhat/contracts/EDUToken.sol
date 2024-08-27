// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/interfaces/draft-IERC6093.sol";


// A simple ERC20 token named EDUToken
contract EDUToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("EDU Token", "EDU") {
        _mint(msg.sender, initialSupply); // Mint initial supply to the deployer
    }
}
