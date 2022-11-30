let provider = new ethers.providers.Web3Provider(window.web3.currentProvider);  
let signer;

const convertToEth = 1e18;
const abi = [{"inputs":[{"internalType":"address[]","name":"addresses","type":"address[]"}],"name":"transferETH","outputs":[],"stateMutability":"payable","type":"function"}];
const contractAddress = "0x8275e3b16C5301e1c26dCCD419Af07602830B6C1";
const myContract = new ethers.Contract(contractAddress, abi, provider);

// 1. Connect Metamask with Dapp
async function connectMetamask() {
    await provider.send("eth_requestAccounts", []);     
    signer = await provider.getSigner();
    myAddress = await signer.getAddress();
    document.getElementById("myAddress").innerHTML= "Your Address is: " + myAddress;
}

// 2. sendETH
async function sendETH() {
    let addressArray = [];
    let inputAddress = document.getElementsByName('array2[]');
    let amount = document.getElementById("ETHAmount");

    for (var i = 0; i <inputAddress.length; i++) {
	if (inputAddress[i].value != "") {
	    addressArray.push(inputAddress[i].value);
	}
    }

    document.getElementById("par").innerHTML = "Wallets to receive ETH: " + addressArray;
    const options = {value: ethers.utils.parseEther(amount.value)};
    await myContract.connect(signer).transferETH(addressArray, options);

}








