// Import dependencies
const { ethers } = require("hardhat");
const FXRootContractAbi = require("../artifacts/FXRootContractAbi.js");
require("dotenv").config(); // Load environment variables from .env file

// Initialize constants from environment variables
const { NETWORK_ADDRESS, PRIVATE_KEY, NFT_ADDRESS, FXROOT_ADDRESS } = process.env;

// Create a provider and wallet from the environment configuration
const provider = new ethers.providers.JsonRpcProvider(NETWORK_ADDRESS);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// Function to get contract instances
async function getContractInstances() {
    const NFTContract = await ethers.getContractFactory("KingsNFT");
    const nftInstance = await NFTContract.attach(NFT_ADDRESS);

    const fxRootInstance = await ethers.getContractAt(FXRootContractAbi, FXROOT_ADDRESS, wallet);

    return { nftInstance, fxRootInstance };
}

// Function to approve and deposit NFTs
async function approveAndDepositNFTs(nftInstance, fxRootInstance) {
    console.log("Approving NFTs for transfer...");
    await nftInstance.setApprovalForAll(fxRootInstance.address, true);

    console.log("Depositing NFTs...");
    const tokenIds = [0, 1, 2, 3, 4]; // Token IDs to be transferred
    for (const tokenId of tokenIds) {
        await fxRootInstance.deposit(nftInstance.address, wallet.address, tokenId, "0x6566");
    }

    console.log("NFTs approved and deposited.");
}

// Main execution function
async function main() {
    const { nftInstance, fxRootInstance } = await getContractInstances();

    await approveAndDepositNFTs(nftInstance, fxRootInstance);

    const balance = await nftInstance.balanceOf(wallet.address);
    console.log(`KingsNFT balance of ${wallet.address} is: ${balance.toString()}`);
}

// Execute main function and handle errors
main().then(() => {
    console.log("Operation completed successfully.");
    process.exit(0);
}).catch((error) => {
    console.error("Error occurred:", error);
    process.exit(1);
});
