// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BeA {
    // Double mapping pour stocker les hash des utilisateurs
    mapping(address => mapping(uint256 => bytes32)) private userHashes;

    // Event pour notifier l'ajout d'un hash
    event HashAdded(address indexed user, uint256 indexed index, bytes32 hash);

    // Fonction pour ajouter un hash
    function addHash(uint256 index, bytes32 hash) external {
        userHashes[msg.sender][index] = hash;
        emit HashAdded(msg.sender, index, hash);
    }

    // Fonction pour vérifier si un hash existe
    function checkHash(
        address user,
        uint256 index
    ) external view returns (bool) {
        return userHashes[user][index] != bytes32(0);
    }
}
