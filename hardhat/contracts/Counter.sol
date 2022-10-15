// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.16;

contract Counter {
    uint public count;

    constructor() {
        count = 42;
    }

    // Function to get the current count
    function get() public view returns (uint) {
        return count;
    }

    // Function to increment count by 1
    function inc() public {
        count += 1;
    }

    // Function to decrement count by 1
    function dec() public {
        // This function will fail if count = 0
        count -= 1;
    }
}