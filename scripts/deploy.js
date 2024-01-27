// Explicit import of Hardhat Runtime Environment. This allows the script to be run independently using `node <script>`
// or within the Hardhat environment using `npx hardhat run <script>`, where Hardhat compiles contracts and sets up the environment.

const hardhatRuntimeEnv = require("hardhat");
const fileSystem = require("fs");

async function deployNFTContract() {
  // Retrieve the contract factory for deployment
  const NFTContractFactory = await hardhatRuntimeEnv.ethers.getContractFactory("KingsNFT");

  // Initiating the deployment of the contract
  const nftContractInstance = await NFTContractFactory.deploy();

  // Ensuring the contract is fully deployed
  await nftContractInstance.deployed();

  // Output the address of the deployed contract
  console.log("NFT Contract has been deployed to:", nftContractInstance.address);
}

// Trigger the deployment process
deployNFTContract()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed due to an error:", error);
    process.exit(1);
  });
