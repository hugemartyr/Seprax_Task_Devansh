
// pragma solidity ^0.8.0;

// contract SimpleTransfer {
//     // Function to transfer Ether to a specific address
//     function transferEther(address payable recipient, uint256 amount) external payable {
//         uint256 a = amount 
//         require(amount > 0, "Amount must be greater than 0");
//         require(msg.value == amount, "Sent value must match the amount");
        
//         (bool success, ) = recipient.call{value: amount}("");
//         require(success, "Transfer failed");
//     }
// }

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleTransfer {
    // Function to transfer Ether to a specific address
    function transferEther(address payable recipient) external payable {
        uint256 amount = msg.value; // Amount is taken from msg.value
        
        require(amount > 0, "Amount must be greater than 0");
        
        (bool success, ) = recipient.call{value: amount}("");
        require(success, "Transfer failed");
    }
}
