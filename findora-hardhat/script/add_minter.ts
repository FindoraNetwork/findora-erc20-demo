import { network, ethers} from 'hardhat';

// scripts/deploy.ts
async function main() {
   console.log('Set minter ...');
   const [operator] = await ethers.getSigners();
   console.log('operator:', operator.address);

   let demoInstance = await ethers.getContractAt('Demo', '0xB2244e36BB4A183fF45B063D3C0dd7477Ccf8Cc7');
   let result = await demoInstance.connect(operator).addMinter(operator.address);

   console.log('addMinter tx is:', result.hash);
}

main()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });