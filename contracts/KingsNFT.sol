// SPDX-License-Identifier: MIT

// Solidity version declaration
pragma solidity 0.8.19;

// Import the ERC721A contract from an external source
import "erc721a/contracts/ERC721A.sol";

// KingsNFT contract definition, inheriting from ERC721A
contract KingsNFT is ERC721A {
    // Address of the contract owner
    address public owner;

    // Maximum quantity of tokens that can be minted
    uint256 public constant MAX_QUANTITY = 5;

    // Private variable to store the base URL for token metadata
    string private baseUrl;

    // Public variable to store the prompt name for the NFTs
    string public promptName;

    // Event to log when NFTs are minted
    event Minted(address indexed to, uint256 quantity);

    // Modifier to restrict functions to the contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    // Constructor function executed when the contract is deployed
    constructor() ERC721A("KingsNFT", "KNG") {
        // Set the contract owner to the deployer's address
        owner = msg.sender;

        // Set the base URL for token metadata
        baseUrl = "https://gateway.pinata.cloud/ipfs/QmcKBhCbyaedQQuM8oqKXJV3d1ZZx93vsnMP4HWi3vvJEo/";

        // Set the prompt name for the NFTs
        promptName = "Image about African culture";
    }

    // Function to mint NFTs, accessible only to the contract owner
    function mint(uint256 quantity) external onlyOwner {
        // Ensure that the total supply plus the requested quantity does not exceed the maximum
        require(totalSupply() + quantity <= MAX_QUANTITY, "Exceeds max mint quantity");

        // Mint the requested quantity of NFTs and assign them to the caller
        _mint(msg.sender, quantity);

        // Emit the Minted event to log the minting action
        emit Minted(msg.sender, quantity);
    }

    // Internal function to specify the base URI for token metadata
    function _baseURI() internal view override returns (string memory) {
        return baseUrl;
    }

    // External function to retrieve the prompt description for the NFTs
    function getPromptDescription() external pure returns (string memory) {
   return "Default description";}
}