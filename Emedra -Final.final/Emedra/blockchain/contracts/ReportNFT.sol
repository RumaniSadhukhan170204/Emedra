pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ReportNFT is ERC721 {
    uint public tokenId;
    constructor() ERC721("MedicalReportNFT", "MRNFT") {}

    function mintReport(address to) public {
        _safeMint(to, tokenId);
        tokenId++;
    }
}
