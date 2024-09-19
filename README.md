# Blockchain-based Paper Review System

## Introduction

This project implements a novel blockchain-based paper review system that leverages smart contracts and the InterPlanetary File System (IPFS) to address the limitations of traditional academic paper review processes. By utilizing blockchain technology, specifically Hyperledger Fabric, along with decentralized applications (Dapps), this system aims to enhance transparency, efficiency, and fairness in the academic peer review process.

## Features

- Decentralized file storage using IPFS

- Smart contract implementation for paper management and review process

- User-friendly interface for paper submission and review

- Transparent and immutable record of paper reviews and feedback

- Integration with Remix IDE for smart contract development and deployment

## Architecture

### File Storage

- IPFS (InterPlanetary File System) for decentralized storage of papers and reviews

- Peers receive IPFS hashes upon file upload for easy retrieval

### Smart Contracts

- Developed using Remix IDE

- Functionalities include:

  - Paper upload management

  - Recording likes/dislikes from reviewers

  - Accessing paper data using IPFS hashes

### Peer Interaction

- File upload and IPFS hash retrieval

- Accessing paper statistics (likes/dislikes)

### Reviewer Interaction

- Paper download using IPFS hashes

- Providing feedback through likes/dislikes

## Implementation

### Front-end

- HTML and JavaScript for user interface

- Enables peer interaction with smart contracts via Remix IDE

### Back-end

- Hardhat framework for smart contract development

- Local Hardhat node for blockchain integration

- IPFS daemon for decentralized file storage

### Blockchain Integration

- Remix IDE connected to local Hardhat node

- Smart contracts manage paper reviews and feedback

## Setup and Installation

1. Clone the repository

   ```

   git clone < >
   cd < >

   ```

2. Install dependencies

   ```

   npm install

   ```

3. Start the Hardhat node

   ```

   npx hardhat node

   ```

4. Deploy smart contracts

   ```

   npx hardhat run scripts/deploy.js --network localhost

   ```

5. Start the IPFS daemon

   ```

   ipfs daemon

   ```

6. Launch the front-end application

   ```

   npm start

   ```

## Usage

1. Authors: Upload papers and receive IPFS hashes

2. Reviewers: Use IPFS hashes to download papers and provide feedback

3. Access paper statistics and review data through the user interface

