import { use, expect } from 'chai';
import { Provider } from '@ethersproject/providers';
import { solidity } from 'ethereum-waffle';
import { ethers, Wallet } from 'ethers';
import { Demo, DemoFactory } from '../build/types';
import * as fs from 'fs';

const mnemonic = fs.readFileSync('.secret').toString().trim();

// Tell Chai to use Waffle's Solidity plugin
use(solidity);

describe ('Demo', () => {
  // Use custom provider to connect to Moonbase Alpha
  let provider: Provider = new ethers.providers.JsonRpcProvider('https://dev-evm.dev.findora.org:8545');
  let wallet: Wallet;
  let walletTo: Wallet;
  let contract: Demo;

  beforeEach(async () => {
    // Create a wallet instance using your private key & connect it to the provider
    wallet = new Wallet(mnemonic).connect(provider);
    console.log('deployer:', wallet.address)

    // Create a random account to transfer tokens to & connect it to the provider
    walletTo = Wallet.createRandom().connect(provider);

    // Use your wallet to deploy the MyToken contract
    contract = await new DemoFactory(wallet).deploy();

    let contractTransaction = await contract.addMinter(wallet.address);

    // Wait until the transaction is confirmed before running tests
    await contractTransaction.wait();
  });

  it('isMinter', async () => {
    expect(await contract.isMinter(wallet.address)).to.equal(true); // This should fail
  });
})