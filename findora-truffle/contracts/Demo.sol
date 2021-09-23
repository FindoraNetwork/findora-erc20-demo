// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import "@openzeppelin/contracts/access/Ownable.sol";
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol';
import "@openzeppelin/contracts/utils/EnumerableSet.sol";

contract Demo is ERC20Burnable, Ownable{

    EnumerableSet.AddressSet private _minters;

    uint256 private constant maxSupply = 100000000 * 1e18;     // the total supply

    event NewMinter(address indexed _operator, address indexed _newMinter);

    /**
     * @notice Constructs the HERC-20 contract.
     */
    constructor() public ERC20('DEMO FINDORA', 'demo') {}

    function addMinter(address _addMinter) public onlyOwner returns (bool) {
        require(_addMinter != address(0), "Demo: _addMinter is the zero address");
        emit NewMinter(msg.sender, _addMinter);
        return EnumerableSet.add(_minters, _addMinter);
    }

    function delMinter(address _delMinter) public onlyOwner returns (bool) {
        require(_delMinter != address(0), "Demo: _delMinter is the zero address");
        return EnumerableSet.remove(_minters, _delMinter);
    }

    function getMinterLength() public view returns (uint256) {
        return EnumerableSet.length(_minters);
    }

    function getMinter(uint256 _index) public view onlyOwner returns (address){
        require(_index <= getMinterLength() - 1, "Demo: index out of bounds");
        return EnumerableSet.at(_minters, _index);
    }

    function isMinter(address account) public view returns (bool) {
        return EnumerableSet.contains(_minters, account);
    }
    
    function mint(address _to, uint256 _amount) public onlyMinter{
        require(totalSupply().add(_amount) <= maxSupply, "Demo: is greater than maxSupply");
        _mint(_to, _amount);
    }

    // modifier for mint function
    modifier onlyMinter() {
        require(isMinter(msg.sender), "Demo: caller is not the minter");
        _;
    }
}