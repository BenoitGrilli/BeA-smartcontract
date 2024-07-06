console.log("Début du script de déploiement...");
const { network, ethers } = require("hardhat");
const {
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

const fs = require('fs');

module.exports = async (hre) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const waitBlockConfirmations = developmentChains.includes(network.name)
    ? 1
    : VERIFICATION_BLOCK_CONFIRMATIONS;

  log("---------------------------------");
  log(`Deploying BeA with deployer: ${deployer}`);
  const bea = await deploy("BeA", {
    from: deployer,
    args: [], // Ajoutez ici les arguments du constructeur de BeA si nécessaire
    log: true,
    waitConfirmations: waitBlockConfirmations,
  });

  // Sauvegarder l'adresse dans un fichier txt
  fs.writeFileSync('BeAAddress.txt', bea.address);

  if (
    !developmentChains.includes(network.name) &&
    process.env.SEPOLIA_EXPLORER_URL
  ) {
    log("Verifying...");
    await verify(bea.address, []); // Ajoutez ici les arguments du constructeur de BeA si nécessaire pour la vérification
  }
  log("----------------------------------------------------");
};

module.exports.tags = ["all", "bea"];