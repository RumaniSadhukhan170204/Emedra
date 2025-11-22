// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Emedra {
    struct Report {
        address owner;
        string ipfsHash;
        string metadata;
    }

    mapping(uint => Report) public reports;
    mapping(uint => mapping(address => bool)) public permissions;
    uint public reportCount;

    event ReportUploaded(uint reportId, address indexed owner);
    event AccessGranted(uint reportId, address indexed to);

    function uploadReport(string memory ipfsHash, string memory metadata) public {
        reportCount++;
        reports[reportCount] = Report(msg.sender, ipfsHash, metadata);
        emit ReportUploaded(reportCount, msg.sender);
    }

    function grantAccess(uint reportId, address to) public {
        require(msg.sender == reports[reportId].owner, "Not owner");
        permissions[reportId][to] = true;
        emit AccessGranted(reportId, to);
    }
}
