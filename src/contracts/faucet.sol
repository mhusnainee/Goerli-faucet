// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <=0.9.0;

contract faucet {
    address public owner;
    mapping(address => uint256) public balances;
    mapping(address => uint256) public requests;

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {
        balances[msg.sender] += msg.value;
    }

    fallback() external payable {
        balances[msg.sender] += msg.value;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function withdraw() public {
        require(msg.sender == owner, "You are not owner");
        payable(msg.sender).transfer(address(this).balance);
    }

    function fund() public payable {}

    function request() public {
        require(
            block.timestamp - requests[msg.sender] > 3600,
            "Try again after 1 hour"
        );
        payable(msg.sender).transfer(0.001 ether);
        requests[msg.sender] = block.timestamp;
    }
}
