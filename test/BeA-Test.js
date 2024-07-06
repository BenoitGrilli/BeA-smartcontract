const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BeA contract", function () {
  let BeA;
  let bea;
  let owner;
  let addr1;

  beforeEach(async function () {
    const BeA = await ethers.getContractFactory("BeA");
    [owner, addr1] = await ethers.getSigners();
    bea = await BeA.deploy();
  });

  describe("Hash Management", function () {
    it("Should allow any user to add a hash and emit an event", async function () {
      const index = 1;
      const hash = ethers.encodeBytes32String("testHash");

      console.log(`Hash to be added: ${hash}`);
      await expect(bea.connect(addr1).addHash(index, hash))
        .to.emit(bea, "HashAdded")
        .withArgs(addr1.address, index, hash);
    });

    it("Should correctly check if a hash exists", async function () {
      const index = 1;
      const hash = ethers.encodeBytes32String("testHash");
      await bea.connect(addr1).addHash(index, hash);
      expect(await bea.checkHash(addr1.address, index)).to.equal(true);
    });

    it("Should return false for a non-existent hash", async function () {
      const index = 1;
      expect(await bea.checkHash(addr1.address, index)).to.equal(false);
    });
  });
});