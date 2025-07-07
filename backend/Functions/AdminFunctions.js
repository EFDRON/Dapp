const Web3 = require("web3");
const Web3Quorum = require("web3js-quorum");
const chainId = 1337;
const path = require("path");
const fs = require("fs-extra");
const contractJsonRegInstPath = path.resolve(
  __dirname,
  "../Files",
  "registerInst.json"
);
const contractJsonRegInst = JSON.parse(
  fs.readFileSync(contractJsonRegInstPath)
);
const contractAbiRegInst = contractJsonRegInst.abi;
const PendingInstituteCount = async (
  clientUrl,
  nodeName = "node",
  address,
  fromPrivateKey,
  fromPublicKey,
  toPublicKey
) => {
  const web3 = new Web3(clientUrl);
  const web3quorum = new Web3Quorum(web3, chainId);
  const contract = new web3quorum.eth.Contract(contractAbiRegInst);
  // eslint-disable-next-line no-underscore-dangle
  const functionAbi = contract._jsonInterface.find((e) => {
    return e.name === "getPendingInstitutesCount";
  });
  const functionParams = {
    to: address,
    data: functionAbi.signature,
    privateKey: fromPrivateKey,
    privateFrom: fromPublicKey,
    privateFor: [toPublicKey],
  };
  const transactionHash = await web3quorum.priv.generateAndSendRawTransaction(
    functionParams
  );
  // console.log(`Transaction hash: ${transactionHash}`);
  const result = await web3quorum.priv.waitForTransactionReceipt(
    transactionHash
  );

  return result.output;
};
const ListPendingInstitutes = async (
  clientUrl,
  nodeName = "node",
  address,
  fromPrivateKey,
  fromPublicKey,
  toPublicKey
) => {
  const web3 = new Web3(clientUrl);
  const web3quorum = new Web3Quorum(web3, chainId);
  const contract = new web3quorum.eth.Contract(contractAbiRegInst);
  // eslint-disable-next-line no-underscore-dangle
  const number = await PendingInstituteCount(
    clientUrl,
    nodeName,
    address,
    fromPrivateKey,
    fromPublicKey,
    toPublicKey
  );
  const functionAbi = contract._jsonInterface.find((e) => {
    return e.name === "getPendingInstituteByIndex";
  });
  const institutes = [];
  for (let i = 0; i < number; i++) {
    const functionArgs = web3quorum.eth.abi
      .encodeParameter(functionAbi.inputs[0], i)
      .slice(2);

    const functionParams = {
      to: address,
      data: functionAbi.signature + functionArgs,
      privateKey: fromPrivateKey,
      privateFrom: fromPublicKey,
      privateFor: [toPublicKey],
    };
    const transactionHash = await web3quorum.priv.generateAndSendRawTransaction(
      functionParams
    );
    // console.log(`Transaction hash: ${transactionHash}`);
    const result = await web3quorum.priv.waitForTransactionReceipt(
      transactionHash
    );

    const decoded = web3quorum.eth.abi.decodeParameters(
      ["string", "address", "string", "address"],
      result.output
    );
    console.log("decoded", decoded);
    institutes.push({
      name: decoded[0],
      address: decoded[1],
      id: decoded[2],
    });
    console.log(institutes);
  }
  return institutes;
};

module.exports = {
  ListPendingInstitutes,
};
