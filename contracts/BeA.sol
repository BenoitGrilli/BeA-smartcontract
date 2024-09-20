// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BeA {
    // Struct to hold hash details
    struct HashRecord {
        bytes32 hash;      // The stored hash
        uint256 timestamp; // Timestamp of when the hash was submitted
        address sender;    // Address of the sender who submitted the hash
    }

    // Mapping to store hash records with a global index
    mapping(uint256 => HashRecord) private hashRecords;
    
    // Mapping to check if a hash already exists (to prevent duplicates)
    mapping(bytes32 => bool) private existingHashes;

    // Mapping from hash to its index in hashRecords
    mapping(bytes32 => uint256) private hashToIndex;

    // Counter to track the total number of hash submissions
    uint256 private hashCount;

    // Event to log when a new hash is added
    event HashAdded(uint256 indexed id, bytes32 indexed hash, uint256 timestamp, address indexed sender);

    // Modifier to check if the hash exists
    modifier hashDoesNotExist(bytes32 hash) {
        require(!existingHashes[hash], "This hash has already been submitted.");
        _;
    }

    // Function to submit a new hash
    function submitHash(bytes32 hash) external hashDoesNotExist(hash) {
        // Record the current timestamp
        uint256 currentTimestamp = block.timestamp;

        // Store the new hash record along with the sender's address
        hashRecords[hashCount] = HashRecord(hash, currentTimestamp, msg.sender);

        // Map the hash to its index
        hashToIndex[hash] = hashCount;

        // Mark this hash as existing
        existingHashes[hash] = true;

        // Emit an event to log the new hash submission, including the sender's address
        emit HashAdded(hashCount, hash, currentTimestamp, msg.sender);

        // Increment the hash count
        hashCount++;
    }

    // Function to check if a hash has already been submitted
    function isHashSubmitted(bytes32 hash) external view returns (bool) {
        return existingHashes[hash];
    }

    // Function to retrieve the details of a hash submission by index
    function getHashDetails(uint256 id) external view returns (bytes32 hash, uint256 timestamp, address sender) {
        require(id < hashCount, "Invalid hash record ID.");
        HashRecord storage record = hashRecords[id];
        return (record.hash, record.timestamp, record.sender);
    }

    // Function to retrieve hash details using the hash as an argument
    function getHashDetailsByHash(bytes32 hash) external view returns (uint256 id, uint256 timestamp, address sender) {
        require(existingHashes[hash], "Hash not found.");
        
        // Retrieve the index of the hash
        uint256 index = hashToIndex[hash];
        
        HashRecord storage record = hashRecords[index];
        return (index, record.timestamp, record.sender);
    }

    // Function to get the total number of hashes submitted
    function getTotalHashes() external view returns (uint256) {
        return hashCount;
    }
}
