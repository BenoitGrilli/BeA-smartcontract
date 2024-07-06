const networkConfig = {
  default: {
    name: "hardhat",
  },
  31337: {
    name: "localhost",
  },
  11155111: { // ID de chaîne pour Sepolia
    name: "sepolia",
    rpcUrl: process.env.BCF_RPC_URL, // Utilisez la variable d'environnement pour l'URL RPC
    explorerUrl: process.env.SEPOLIA_EXPLORER_URL, // Utilisez la variable d'environnement pour l'URL de l'explorateur
    apiKey: process.env.ALCHEMY_API_KEY, // Utilisez la variable d'environnement pour la clé API Alchemy
  },
};

const developmentChains = ["hardhat", "localhost"];
const VERIFICATION_BLOCK_CONFIRMATIONS = 6;

module.exports = {
  networkConfig,
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
};