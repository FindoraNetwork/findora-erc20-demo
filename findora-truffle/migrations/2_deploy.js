const demo = artifacts.require('Demo');

// ++++++++++++++++  Main Migration ++++++++++++++++ 
const migration = async (deployer, network, accounts) => {
  await Promise.all([
      deploy(deployer, network, accounts)
  ]);
}

// ++++++++++++++++  Deploy Functions ++++++++++++++++ 
module.exports = migration;

async function deploy(deployer, network, accounts) { 
  console.log("[Demo] Start deploy on Network= " + network);

  //钱包地址，合约拥有者 
  let deployer_account = accounts[0];
  console.log('deployer:', deployer_account)

  await deployer.deploy(demo);
  
  console.log("[Demo] End");
}