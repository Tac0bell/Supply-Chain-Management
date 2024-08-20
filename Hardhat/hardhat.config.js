require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const QUICKNODE_HTTP_URL = process.env.QUICKNODE_HTTP_URL;
const  privateKeys= process.env.PRIVATE_KEY;

module.exports = {
  defaultNetwork: "liberty",
  networks: {
    hardhat: {
    },
    liberty: {
      url: "https://liberty20.shardeum.org/",
      chainId: 8081,
      accounts:[privateKeys]
    },
  },
  solidity: {
 //configure solidity version for compilation
  version: "0.8.0",
  settings: {
    optimizer: {
      enabled: true
    }
   }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  }
 };