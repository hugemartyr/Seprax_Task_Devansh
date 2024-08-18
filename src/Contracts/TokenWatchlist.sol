// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TokenWatchlist {
    struct Watchlist {
        address[] tokens;
        uint256 limit; // Optional: Maximum number of tokens per watchlist
    }

    mapping(address => Watchlist) private userWatchlists;

    event TokenAdded(address indexed user, address token);
    event TokenRemoved(address indexed user, address token);

    function addTokenToWatchlist(address token) external {
        // Token validation can be added here
        require(token != address(0), "Invalid token address");

        Watchlist storage watchlist = userWatchlists[msg.sender];
        // Check for duplicates and limit can be added here

        watchlist.tokens.push(token);

        emit TokenAdded(msg.sender, token);
    }

    function removeTokenFromWatchlist(address token) external {
    Watchlist storage watchlist = userWatchlists[msg.sender];
    uint256 index = watchlist.tokens.length;

    // Find the index of the token
    while (index > 0) {
        index--; // Decrement first since array is 0-indexed
        if (watchlist.tokens[index] == token) {
            break;
        }
    }

    require(index < watchlist.tokens.length, "Token not found in watchlist");

    // Efficiently remove the token from the array
    watchlist.tokens[index] = watchlist.tokens[watchlist.tokens.length - 1];
    watchlist.tokens.pop();

    emit TokenRemoved(msg.sender, token);
}

    

    function getWatchlist() external view returns (address[] memory) {
        return userWatchlists[msg.sender].tokens;
    }
}