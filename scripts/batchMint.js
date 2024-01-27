// Import necessary libraries
const { ethers } = require("ethers");
require("dotenv").config();

// Configuration constants
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PROVIDER_URL = "https://eth-sepolia.g.alchemy.com/v2/adWMnDUcqmiSGSOzzSmo1fCkonljKqHr";
const NFT_CONTRACT_ADDRESS = "0xDCc198654456d2575A8A1987d1104922678Bfc58";
const NUMBER_OF_TOKENS = 5;

// Initialize provider and signer
const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// Function to get the NFT contract instance
async function getNFTContractInstance() {
  const NFTContractFactory = await ethers.getContractFactory("KingsNFT", signer);
  return NFTContractFactory.attach(NFT_CONTRACT_ADDRESS);
}

// Function to mint tokens
async function mintTokens(nftContract, quantity) {
  const mintTx = await nftContract.mint(quantity);
  await mintTx.wait(); // Wait for the transaction to be mined
  console.log(`Successfully minted ${quantity} tokens.`);
}

// Main execution function
async function runMintingProcess() {
  try {
    const nftContract = await getNFTContractInstance();
    await mintTokens(nftContract, NUMBER_OF_TOKENS);
    process.exit(0);
  } catch (error) {
    console.error("Minting process failed:", error);
    process.exit(1);
  }
}

// Execute the minting process
runMintingProcess();
