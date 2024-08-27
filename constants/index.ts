export const ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_eduTokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_rewardRate",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    name: "stake",
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    name: "withdraw",
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    name: "calculateRewards",
    inputs: [
      {
        internalType: "address",
        name: "_staker",
        type: "address",
      },
    ],
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    name: "setRewardRate",
    inputs: [
      {
        internalType: "uint256",
        name: "_newRate",
        type: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    name: "eduToken",
    inputs: [],
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    name: "stakes",
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    name: "rewardRate",
    inputs: [],
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
