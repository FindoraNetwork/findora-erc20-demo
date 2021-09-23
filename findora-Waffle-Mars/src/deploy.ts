import { contract, deploy } from 'ethereum-mars'
import { Demo } from '../build/artifacts';
import * as fs from 'fs';

const mnemonic = fs.readFileSync('.secret').toString().trim();

const privateKey = mnemonic;

deploy({network: 'https://dev-evm.dev.findora.org:8545', privateKey},() => {
    contract('demo', Demo);
});