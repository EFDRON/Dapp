const path = require("path");
const fs = require("fs-extra");
const Web3 = require("web3");
const Web3Quorum = require("web3js-quorum");

const chainId = 1337;

const contractJsonPath = path.resolve(__dirname, "./", "student.json");
const contractJson = JSON.parse(fs.readFileSync(contractJsonPath));
const contractBytecode = contractJson.evm.bytecode.object;

async function createContract(
  clientUrl,
  fromPrivateKey,
  fromPublicKey,
  toPublicKey,
  value
) {
  const web3 = new Web3(clientUrl);
  const web3quorum = new Web3Quorum(web3, chainId);
  // initialize the default constructor with a value `47 = 0x2F`; this value is appended to the bytecode
  const contractConstructorInit = web3.eth.abi
    .encodeParameters(
      ["string", "address", "string", "string", "address", "address"],
      value
    )
    //
    .slice(2);
  const txOptions = {
    data: "0x" + contractBytecode + contractConstructorInit,
    privateKey: fromPrivateKey,
    privateFrom: fromPublicKey,
    privateFor: [toPublicKey],
  };
  console.log("Creating contract...");
  // Generate and send the Raw transaction to the Besu node using the eea_sendRawTransaction(https://besu.hyperledger.org/en/latest/Reference/API-Methods/#eea_sendrawtransaction) JSON-RPC call
  const txHash = await web3quorum.priv.generateAndSendRawTransaction(txOptions);
  console.log("Getting contractAddress from txHash: ", txHash);
  const privateTxReceipt = await web3quorum.priv.waitForTransactionReceipt(
    txHash
  );
  console.log("Private Transaction Receipt: ", privateTxReceipt);
  return privateTxReceipt;
}

module.exports = exports = createContract;
