require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("hardhat-deploy");
require("solidity-coverage");
require("hardhat-contract-sizer");
require("dotenv").config();

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const SEPOLIA_EXPLORER_URL = process.env.SEPOLIA_EXPLORER_URL;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const SEPOLIA_EXPLORER_API_URL = process.env.SEPOLIA_EXPLORER_API_URL;

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.24",
      },
    ],
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`],
      saveDeployments: true,
      chainId: 11155111,
    },
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
    },
    customChains: [
      {
        network: "sepolia",
        chainId: 11155111,
        urls: {
          apiURL: SEPOLIA_EXPLORER_API_URL,
          browserURL: SEPOLIA_EXPLORER_URL,
        apiKey: ETHERSCAN_API_KEY,
      },
      },
    ],
  },
  gasReporter: {
    enabled: true,
    currency: "ETH",
    outputFile: "gas-report.txt",
    noColors: true,
  },
  namedAccounts: {
    deployer: {
      default: 0,
      11155111: 0,
      31337: 0,
    },
    user0: {
      default: 0,
    },
    user1: {
      default: 1,
    },
    user2: {
      default: 2,
    },
  },
  mocha: {
    timeout: 200000, // 200 seconds max for running tests
  },
  sourcify: {
    enabled: true
  }
};

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});