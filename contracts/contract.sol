// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IPFSReview {
    struct Review {
        uint likes;
        uint dislikes;
    }

    mapping(string => Review) public reviews;

    function like(string memory ipfsHash) public {
        reviews[ipfsHash].likes++;
    }

    function dislike(string memory ipfsHash) public {
        reviews[ipfsHash].dislikes++;
    }

    function getReview(string memory ipfsHash) public view returns (uint, uint) {
        Review storage review = reviews[ipfsHash];
        return (review.likes, review.dislikes);
    }
}
