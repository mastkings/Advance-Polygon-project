const { ethers } = require("ethers");

// Establish connection parameters
const provider = new ethers.providers.JsonRpcProvider('https://matic-mumbai.chainstacklabs.com');
const NFT_CONTRACT_ADDRESS = "0xDCc198654456d2575A8A1987d1104922678Bfc58";
const QUERY_ADDRESS = "0x3D054C3CB85c9044421a4b5FC9c2A10478b26Ed7";

async function getNFTContractInstance() {
  const signer = await getPrimarySigner();
  const NFTContract = await ethers.getContractFactory("KingsNFT", signer);
  return NFTContract.attach(NFT_CONTRACT_ADDRESS);
}

async function getPrimarySigner() {
  const accounts = await ethers.getSigners();
  return accounts[0]; // Assuming the first account is the primary
}

async function queryNFTBalance(nftInstance, address) {
  const balance = await nftInstance.balanceOf(address);
  console.log(`\nBalance of ${address} on Polygon Mumbai:`, balance.toString());
}

async function execute() {
  try {
    const nftInstance = await getNFTContractInstance();
    await queryNFTBalance(nftInstance, QUERY_ADDRESS);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

execute();
