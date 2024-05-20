const ipfs = window.IpfsHttpClient.create({ host: 'localhost', port: 5001, protocol: 'http' });
const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:8545'); // Connect to Ethereum network

const contractAddress = '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e';

const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			}
		],
		"name": "dislike",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			}
		],
		"name": "like",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			}
		],
		"name": "getReview",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "reviews",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "likes",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "dislikes",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const contract = new web3.eth.Contract(contractABI, contractAddress);

async function retrieveFileAndSubmitReview() {
    const hashInput = document.getElementById('hashInput');
    const outputDiv = document.getElementById('output');
    const ipfsHash = hashInput.value.trim();
    // const reviewText = "Your review text here";

    try {
        const stream = ipfs.cat(ipfsHash);
        const chunks = [];

        for await (const chunk of stream) {
            chunks.push(chunk);
        }

        const blob = new Blob(chunks, { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);

        if (blob.type.startsWith('image/')) {
            // Display image
            const img = document.createElement('img');
            img.src = url;
            outputDiv.innerHTML = '';
            outputDiv.appendChild(img);
        } else if (blob.type === 'application/pdf') {
            // Display PDF in an iframe
            const iframe = document.createElement('iframe');
            iframe.src = url;
            iframe.width = '100%';
            iframe.height = '500px';
            outputDiv.innerHTML = '';
            outputDiv.appendChild(iframe);
        } else if (blob.type.startsWith('text/')) {
            // Display text content in a <pre> element
            const reader = new FileReader();
            reader.onload = () => {
                const pre = document.createElement('pre');
                pre.textContent = reader.result;
                outputDiv.innerHTML = '';
                outputDiv.appendChild(pre);
            };
            reader.readAsText(blob);
        } else if (blob.type.startsWith('video/')) {
            // Display video
            const video = document.createElement('video');
            video.src = url;
            video.controls = true;
            outputDiv.innerHTML = '';
            outputDiv.appendChild(video);
        } else {
            // Unknown file type, display a download link
            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = 'file'; // You can set a better filename here
            downloadLink.textContent = 'Download File';
            outputDiv.innerHTML = '';
            outputDiv.appendChild(downloadLink);
        }
        // const txHash = await submitReview(ipfsHash, reviewText);
        console.log('Review submitted. Transaction Hash:');
    } catch (error) {
        console.error('Error retrieving file from IPFS:', error);
        outputDiv.innerHTML = 'Error retrieving file from IPFS.';
    }
}

function displayMessage(message) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = `<p>${message}</p>`;
}

async function like() {
    const ipfsHash = document.getElementById('hashInput').value.trim();
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
        console.error('No Ethereum accounts found. Please connect your MetaMask wallet.');
        return;
    }
    await contract.methods.like(ipfsHash).send({
        from: accounts[0],
        gas: 50000 // Adjust this value if necessary
    });
    displayMessage('Your vote has been recorded');
}

async function dislike() {
    const ipfsHash = document.getElementById('hashInput').value.trim();
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
        console.error('No Ethereum accounts found. Please connect your MetaMask wallet.');
        return;
    }
    await contract.methods.dislike(ipfsHash).send({
        from: accounts[0],
        gas: 50000 // Adjust this value if necessary
    });
    displayMessage('Your vote has been recorded');
}
window.retrieveFileAndSubmitReview = retrieveFileAndSubmitReview;
window.like = like;
window.dislike = dislike;
