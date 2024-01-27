const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("NFT King's Collection Tests", function () {
  let mainAccount, altAccount1, altAccount2;
  let nftInstance;

  beforeEach(async function () {
    // Retrieve accounts for testing
    [mainAccount, altAccount1, altAccount2] = await ethers.getSigners();

    // Contract deployment
    const NFTContract = await ethers.getContractFactory("KingsNFT");
    nftInstance = await NFTContract.deploy();
    await nftInstance.deployed();
  });

  // Checking the metadata URI setting
  it("verifies the metadata URI is set correctly", async function () {
    const expectedMetadataUri = "https://gateway.pinata.cloud/ipfs/QmcKBhCbyaedQQuM8oqKXJV3d1ZZx93vsnMP4HWi3vvJEo";
    assert.equal(await nftInstance.promptDescription(), expectedMetadataUri);
  });

  // Confirming the minting capability of the main account
  it("allows the main account to mint NFTs", async function () {
    const mintQuantity = 5;
    await nftInstance.connect(mainAccount).mint(mintQuantity);

    assert.equal(await nftInstance.totalSupply(), mintQuantity);
    assert.equal(await nftInstance.balanceOf(mainAccount.address), mintQuantity);
  });

  // Testing the restriction on minting for unauthorized accounts
  it("prevents unauthorized accounts from minting NFTs", async function () {
    const unauthorizedMintAttempt = nftInstance.connect(altAccount1).mint(5);
    await assert.isRejected(unauthorizedMintAttempt, "Only owner can perform this action!");

    assert.equal(await nftInstance.totalSupply(), 0);
    assert.equal(await nftInstance.balanceOf(altAccount1.address), 0);
  });

  // Ensuring minting limit is respected
  it("adheres to the maximum minting limit", async function () {
    await nftInstance.connect(mainAccount).mint(5);

    const overLimitMintAttempt = nftInstance.connect(mainAccount).mint(1);
    await assert.isRejected(overLimitMintAttempt, "You can not mint more than 5");

    assert.equal(await nftInstance.totalSupply(), 5);
    assert.equal(await nftInstance.balanceOf(mainAccount.address), 5);
  });
});
