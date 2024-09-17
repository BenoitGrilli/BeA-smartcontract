// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BeA {
    // Double mapping pour stocker les hash des utilisateurs
    mapping(address => mapping(uint256 => bytes32)) private userHashes;
    
    // Mapping pour suivre l'index courant de chaque utilisateur
    mapping(address => uint256) private userIndex;

    // Event pour notifier l'ajout d'un hash
    event HashAdded(address indexed user, uint256 indexed index, bytes32 hash);

    // Fonction pour ajouter un hash
    function addHash(bytes32 hash) external {
        uint256 currentIndex = userIndex[msg.sender];
        userHashes[msg.sender][currentIndex] = hash;
        emit HashAdded(msg.sender, currentIndex, hash);
        userIndex[msg.sender] += 1;
    }

    // Fonction pour vérifier si un hash existe
    function checkHash(
        address user,
        uint256 index
    ) external view returns (bool) {
        return userHashes[user][index] != bytes32(0);
    }
    
    // Fonction pour obtenir le prochain index pour un utilisateur
    function getNextIndex(address user) external view returns (uint256) {
        return userIndex[user];
    }
}
