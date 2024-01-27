require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    // Keep the existing networks if you want, or remove them if you don't need them
    mumbai: {
      url: 'https://polygon-mumbai.g.alchemy.com/v2/PfihUnn4SOIFdAQwkTI_bTQW4bj2dWeX',
      accounts: ["9673488150c05380c2d245a4b7926252132489ecc9f19fd3513e926993cce2d1"],
    },
   // goerli: {
    //  url: "https://ethereum-goerli.publicnode.com",
     // accounts: [process.env.PRIVATE_KEY],
    //},
    // Add Sepolia network configuration
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/adWMnDUcqmiSGSOzzSmo1fCkonljKqHr', // You'll need to set this in your .env file
      accounts: ["9673488150c05380c2d245a4b7926252132489ecc9f19fd3513e926993cce2d1"],
    },
  },
};
