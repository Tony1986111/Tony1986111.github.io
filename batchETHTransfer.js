let provider = new ethers.providers.Web3Provider(window.web3.currentProvider);  
//写在最前面，先定义一个provider变量，表示从浏览器到区块链网络的连接。有点抽象。如果是连接以太主网，那就是window.ethereum。
let signer;
const convertToEth = 1e18;

// 1. Connect Metamask with Dapp
async function connectMetamask() {
    await provider.send("eth_requestAccounts", []);     
    // 区块链网络向MetaMask发出一个连接的请求。注意这里可以点选多个钱包来连接。
    signer = await provider.getSigner();
    //在ethers中，Signer签名者类是以太坊账户的抽象，可用于对消息和交易进行签名，并将签名的交易发送到以太坊网络，并更改区块链状态。Signer类是抽象类，不能直接实例化，我们需要使用它的子类：Wallet钱包类。  
    myAddress = await signer.getAddress();
    document.getElementById("myAddress").innerHTML= "Your Address is: " + myAddress;
}


const abi = [{"inputs":[{"internalType":"address[]","name":"addresses","type":"address[]"}],"name":"transferETH","outputs":[],"stateMutability":"payable","type":"function"}];
const contractAddress = "0x8275e3b16C5301e1c26dCCD419Af07602830B6C1";
const myContract = new ethers.Contract(contractAddress, abi, provider);

// 5. sendETH
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
	await myContract.connect(signer).transferETH(addressArray, options); //处理payable的函数，pay的数量参数放在最后，用固定的格式{value:};

}








