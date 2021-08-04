const ERC20 = artifacts.require("ERC20FixedSupply.sol");

module.exports = async (deployer) => {
	await deployer.deploy(ERC20, "Tether USD", "USDT",
		'100000000000000000000000000', {gas: 5000000});
};
