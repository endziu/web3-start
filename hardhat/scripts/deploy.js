// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

const path = require("path");

async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();
  await counter.deployed();

  console.log("Counter address:", counter.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(counter);
}

function saveFrontendFiles(counter) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "..", "nextjs", "artifacts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ Counter: counter.address }, undefined, 2)
  );

  const CounterArtifact = artifacts.readArtifactSync("Counter");

  fs.writeFileSync(
    path.join(contractsDir, "Counter.json"),
    JSON.stringify(CounterArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
