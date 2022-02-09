const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const { abi, evm } = require("./compile");

const provider = new HDWalletProvider(
  "MNEMONIC_CODE", // Insert your mnemonic here.
  "https://rinkeby.infura.io/v3/e3a32872e74f459a9c2b97b1bf619bcb"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ from: accounts[0], gas: "1000000" });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};

deploy();
