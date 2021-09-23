import { network, ethers} from 'hardhat';

// scripts/deploy.ts
async function main() {
   console.log('Deploying Demo...');

   const { provider } = ethers;
   const [operator] = await ethers.getSigners();
   console.log('deployer:', operator.address);

   const estimateGasPrice = await provider.getGasPrice();
   const gasPrice = estimateGasPrice.mul(3).div(2);
   console.log(`Gas Price: ${ethers.utils.formatUnits(gasPrice, 'gwei')} gwei`);
   const override = { gasPrice}; //, gasLimit : 5000000

   // We get the contract to deploy
   const Demo = await ethers.getContractFactory('Demo');
   // Instantiating a new Demo smart contract
   const demoInstance = await Demo.connect(operator).deploy(override);
   console.log('Demo deployed to:', demoInstance.address);
}

main()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });