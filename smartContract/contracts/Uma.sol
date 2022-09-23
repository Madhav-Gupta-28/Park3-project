// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.7;

import "@uma/core/contracts/oracle/interfaces/OptimisticOracleV2Interface.sol";
import "hardhat/console.sol";
// *************************************
// *   Minimum Viable OO Intergration  *
// *************************************

// This contract shows how to get up and running as quickly as posible with UMA's Optimistic Oracle.
// We make a simple price request to the OO and return it to the user.

contract Uma {

    address public immutable owner;
    uint256 nextProposal;

    constructor(){
        owner = msg.sender;
        nextProposal = 1;

    }

    // Create an Optimistic oracle instance at the deployed address on Görli.
    OptimisticOracleV2Interface oo = OptimisticOracleV2Interface(0xA5B9d8a0B0Fa04Ba71BDD68069661ED5C0848884);

    // Use the yes no idetifier to ask arbitary questions, such as the weather on a particular day.
    bytes32 identifier = bytes32("YES_OR_NO_QUERY");

    mapping (address => uint256[]) contentIds; // address of the video/picture uploader
    mapping (uint256 => address) contentIdToAddress;
    mapping (uint256 => bytes) contentIdToAncillaryData;

    mapping(uint256 => uint256) contentIdToStartingTime;
    mapping(uint256 => uint256) contentIdToExpirationTime;


// gonna to use that proposal struct : Pending
    struct Proposal{
        uint256 proposalId;
        uint contendId;
        bytes AncillaryData;
        uint256 StartingTime;
        uint256 ExpirationTime;
        bool passed;
    }   



    // this is proposal array which stores each proposal created with key as proposalId : Pending
    mapping(uint256 => Proposal ) public Proposals;



    modifier correctUploader (address user, uint contentId) {
        require(contentIdToAddress[contentId] == user);
        _;
    }

    //for debug purposes
    function registerContentId (uint contentId) public {
        require(contentIdToAddress[contentId] == address(0));
        contentIds[msg.sender].push(contentId);
        contentIdToAddress[contentId] = msg.sender;
    }

    function setAncillaryData(string memory data, uint contentId) public correctUploader(msg.sender, contentId) {
        //TODO: Check for malicious data
        //ancillaryData = bytes(data);
        contentIdToAncillaryData[contentId] = bytes(data);

    }

    // Submit a data request to the Optimistic oracle.
    function requestData(uint contentId) public {
        contentIdToStartingTime[contentId] = block.timestamp; // Set the request time to the current block time.
        IERC20 bondCurrency = IERC20(0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6); // Use Görli WETH as the bond currency.
        uint256 reward = 0; // Set the reward to 0 (so we dont have to fund it from this contract).
        bytes memory ad = contentIdToAncillaryData[contentId];

        // Now, make the price request to the Optimistic oracle and set the liveness to 30 so it will settle quickly.
        oo.requestPrice(identifier, contentIdToStartingTime[contentId], ad, bondCurrency, reward);
        oo.setEventBased(identifier, contentIdToExpirationTime[contentId], ad);
        oo.setCustomLiveness(identifier, contentIdToStartingTime[contentId], ad, 100);
        //return current time
    }

    // Settle the request once it's gone through the liveness period of 30 seconds. This acts the finalize the voted on price.
    // In a real world use of the Optimistic Oracle this should be longer to give time to disputers to catch bat price proposals.

    //Alain: The request in UMA is being hashed which means there will be no problems even if the same address uploads multiple pictures/videos: https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/oracle/interfaces/OptimisticOracleV2Interface.sol
    function settleRequest(uint contentId) public {
        bytes memory ad = contentIdToAncillaryData[contentId];
        uint256 requestTime = contentIdToStartingTime[contentId];

        oo.settle(address(this), identifier, requestTime, ad);
    }

    // Fetch the resolved price from the Optimistic Oracle that was settled.
    function getSettledData(uint contentId) public view returns (int256) {
        bytes memory ad = contentIdToAncillaryData[contentId];
        uint256 requestTime = contentIdToStartingTime[contentId];
        return oo.getRequest(address(this), identifier, requestTime, ad).resolvedPrice;
    }

    function getCids() public view returns (uint[] memory) {
        return contentIds[msg.sender];
    }

    function getData (uint contentId) public view returns (bytes memory) {
        bytes memory ad = contentIdToAncillaryData[contentId];
        return ad;
    }

    function getStartingTime(uint256 contentId) public view returns (uint256) {
        return contentIdToStartingTime[contentId];
    }

    function getExpirationTime(uint contentId) public view returns (uint256) {
        address requester = contentIdToAddress[contentId];
        console.log(requester);
        uint256 startingTime = getStartingTime(contentId);
        console.log(startingTime);
        bytes memory ancillaryData = contentIdToAncillaryData[contentId];
        return oo.getRequest(address(this), identifier, startingTime, ancillaryData).expirationTime;
    }
}