async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const outputDiv = document.getElementById('output');

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('http://localhost:5001/api/v0/add', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        const ipfsHash = data.Hash;
        outputDiv.innerHTML = `File uploaded successfully. IPFS hash: ${ipfsHash}`;
    } catch (error) {
        console.error('Error uploading file to IPFS:', error);
        outputDiv.innerHTML = 'Error uploading file to IPFS.';
    }
}

// document.addEventListener("DOMContentLoaded", function () {
//     if (typeof window.ethereum !== 'undefined') {
//         window.web3 = new Web3(window.ethereum);
//         window.ethereum.enable().then(accounts => {
//             console.log('Connected account:', accounts[0]);
//             window.account = accounts[0];
//         }).catch(error => {
//             console.error("User denied account access", error);
//         });
//     } else {
//         console.log('No web3? You should consider trying MetaMask!');
//         window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
//     }

//     // HelloWorld contract ABI and address
//     const helloWorldABI = [
//         {
//             "inputs": [],
//             "name": "sayHelloWorld",
//             "outputs": [
//                 {
//                     "internalType": "string",
//                     "name": "",
//                     "type": "string"
//                 }
//             ],
//             "stateMutability": "pure",
//             "type": "function"
//         }
//     ];

//     const helloWorldAddress = '0x56fB8DE439d3B6D2904c222FFa944546c9584C0b'; // Replace with your HelloWorld contract's address

//     const helloWorldContract = new web3.eth.Contract(helloWorldABI, helloWorldAddress);

//     // Event listener for the HelloWorld button
//     document.getElementById('helloButton').addEventListener('click', () => {
//         helloWorldContract.methods.sayHelloWorld().call()
//             .then(result => {
//                 document.getElementById('helloOutput').innerText = result;
//             })
//             .catch(error => {
//                 console.error('Error calling the contract method', error);
//             });
//     });

//     // Function to upload file
//     window.uploadFile = async function () {
//         const fileInput = document.getElementById('fileInput');
//         const outputDiv = document.getElementById('output');
//         const file = fileInput.files[0];
//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             const response = await fetch('http://localhost:5001/api/v0/add', {
//                 method: 'POST',
//                 body: formData
//             });
//             const data = await response.json();
//             const ipfsHash = data.Hash;

//             outputDiv.innerHTML = `File uploaded successfully. IPFS hash: ${ipfsHash}`;
//         } catch (error) {
//             console.error('Error uploading file to IPFS or Ethereum blockchain:', error);
//             outputDiv.innerHTML = 'Error uploading file to IPFS or Ethereum blockchain.';
//         }
//     };
// });


// // Initialize Web3
// // const web3 = new Web3(Web3.givenProvider || "http://localhost:8545"); // Replace with your Ethereum node URL

// // // ABI and contract address of your deployed FileStorage contract
// // const contractABI = [
// //     {
// //       "inputs": [],
// //       "name": "fileCount",
// //       "outputs": [
// //         {
// //           "internalType": "uint256",
// //           "name": "",
// //           "type": "uint256"
// //         }
// //       ],
// //       "stateMutability": "view",
// //       "type": "function"
// //     },
// //     {
// //       "inputs": [
// //         {
// //           "internalType": "uint256",
// //           "name": "",
// //           "type": "uint256"
// //         }
// //       ],
// //       "name": "files",
// //       "outputs": [
// //         {
// //           "internalType": "bytes32",
// //           "name": "hash",
// //           "type": "bytes32"
// //         },
// //         {
// //           "internalType": "bytes32",
// //           "name": "name",
// //           "type": "bytes32"
// //         },
// //         {
// //           "internalType": "address",
// //           "name": "uploader",
// //           "type": "address"
// //         }
// //       ],
// //       "stateMutability": "view",
// //       "type": "function"
// //     },
// //     {
// //       "inputs": [
// //         {
// //           "internalType": "uint256",
// //           "name": "_fileId",
// //           "type": "uint256"
// //         }
// //       ],
// //       "name": "getFile",
// //       "outputs": [
// //         {
// //           "internalType": "bytes32",
// //           "name": "",
// //           "type": "bytes32"
// //         },
// //         {
// //           "internalType": "bytes32",
// //           "name": "",
// //           "type": "bytes32"
// //         },
// //         {
// //           "internalType": "address",
// //           "name": "",
// //           "type": "address"
// //         }
// //       ],
// //       "stateMutability": "view",
// //       "type": "function"
// //     },
// //     {
// //       "inputs": [
// //         {
// //           "internalType": "bytes32",
// //           "name": "_hash",
// //           "type": "bytes32"
// //         },
// //         {
// //           "internalType": "bytes32",
// //           "name": "_name",
// //           "type": "bytes32"
// //         }
// //       ],
// //       "name": "uploadFile",
// //       "outputs": [],
// //       "stateMutability": "nonpayable",
// //       "type": "function"
// //     }
// // ];
// // const contractAddress = '0xa2A8aF5045774701fDBF6Fb60c5cD75E7F3d8B1b'; // Replace with your contract's address

// // // Get contract instance
// // const contract = new web3.eth.Contract(contractABI, contractAddress);

// // async function uploadFile() {
// //     const fileInput = document.getElementById('fileInput');
// //     const outputDiv = document.getElementById('output');
// //     const file = fileInput.files[0];
// //     const formData = new FormData();
// //     formData.append('file', file);

// //     try {
// //         // Upload file to IPFS and get the hash
// //         const response = await fetch('http://localhost:5001/api/v0/add', {
// //                         method: 'POST',
// //                         body: formData
// //                     });
// //         const data = await response.json();
// //         const ipfsHash = data.Hash;
// //         const hashBytes32 = web3.utils.utf8ToHex(data.Hash);
// //         const nameBytes32 = web3.utils.utf8ToHex(file.name); 
// //         console.log(hashBytes32);
// //         // const gasEstimate = await contract.methods.uploadFile(ipfsHash, file.name).estimateGas({ from: '0x3F17E571f7115C322c62885bdA5C287fA8014752'});
// //         // const gasLimit = (gasEstimate * 1.2);
// //         // await contract.methods.uploadFile(ipfsHash, file.name).send({ from: '0x3F17E571f7115C322c62885bdA5C287fA8014752', gas: gasLimit });
// //         await contract.methods.uploadFile(hashBytes32, nameBytes32).send({ from: '0x3F17E571f7115C322c62885bdA5C287fA8014752' });


// //         outputDiv.innerHTML = `File uploaded successfully. IPFS hash: ${ipfsHash}`;
// //     } catch (error) {
// //         console.error('Error uploading file to IPFS or Ethereum blockchain:', error);
// //         outputDiv.innerHTML = 'Error uploading file to IPFS or Ethereum blockchain.';
// //     }
// // }

document.getElementById('fileInput').nextElementSibling.onclick = uploadFile;
