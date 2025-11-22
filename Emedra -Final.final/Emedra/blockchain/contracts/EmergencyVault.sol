pragma solidity ^0.8.0;

contract EmergencyVault {
    mapping(address => bool) public emergencyProviders;
    address public patient;
    bool public unlocked;

    constructor(address _patient) {
        patient = _patient;
    }

    function authorizeProvider(address provider) public {
        require(msg.sender == patient, "Only patient");
        emergencyProviders[provider] = true;
    }

    function unlockAccess(address provider) public {
        require(emergencyProviders[provider], "Not authorized");
        unlocked = true;
    }
}
