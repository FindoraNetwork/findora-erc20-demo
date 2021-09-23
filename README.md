# Findora ERC20 Demo
Note: Create a .secret file in the dem root directory you need, and fill in your private key。

## Installation 

### Requirements
- NodeJS v8.9.4 or later
- Windows, Linux or Mac OS X

### Install [Truffle](https://www.trufflesuite.com/docs/truffle/getting-started/installation)
```
npm install -g truffle
```

### Install Dependencies
```
npm install
```

### Truffle Deploy Contract
```
truffle migrate --network findora
```

### Hardhat Deploy Contract
```
npx hardhat run script/deploy.ts --network findora
```

### Waffle&Mars Deploy Contract
```
npm run deploy
```
