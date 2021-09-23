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

  let demoInstance = await new web3.eth.Contract(demo.abi, '0xa1bA91Bb6226C3e4387B6eA5185843CC41DD1EcB');
  let result = await demoInstance.methods.addMinter(deployer_account).send({from:deployer_account});
  console.log('addMinter tx is:', result.transactionHash);
  
  console.log("[Demo] End");
}