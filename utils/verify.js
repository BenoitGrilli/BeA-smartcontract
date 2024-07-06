const { run } = require("hardhat");

// Timeout function
const timeout = (ms) => new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error('Verification timed out')), ms));

const verify = async (contractAddress, args, timeoutDuration = 10000) => { // Default timeout set to 30 seconds
  console.log("Verifying contract...");
  try {
    // Race the verify promise against the timeout
    await Promise.race([
      run("verify:verify", {
        address: contractAddress,
        constructorArguments: args,
      }),
      timeout(timeoutDuration) // Pass the desired timeout duration in milliseconds
    ]);
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!");
    } else {
      console.error(e.message); // Log the error message, including timeout errors
    }
  }
};

module.exports = {
  verify,
};
