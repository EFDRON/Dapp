const Web3 = require("web3");
const Web3Quorum = require("web3js-quorum");
const chainId = 1337;

const RegisterInstitutePrivateToPendi = async (
  clientUrl,
  address,
  value,
  contractAbi,
  fromPrivateKey,
  fromPublicKey,
  toPublicKey
) => {
  // Deploy Student COntract

  // At Register Stud Contract
  const web3 = new Web3(clientUrl);
  const web3quorum = new Web3Quorum(web3, chainId);
  const contract = new web3quorum.eth.Contract(contractAbi);
  // eslint-disable-next-line no-underscore-dangle
  const functionAbi = contract._jsonInterface.find((e) => {
    return e.name === "registerInstToPending";
  });

  const functionArgs = web3quorum.eth.abi
    .encodeParameters(functionAbi.inputs, [value[0], value[1], value[2]])
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
  const result = await web3quorum.priv.waitForTransactionReceipt(
    transactionHash
  );

  return result;
};
module.exports = RegisterInstitutePrivateToPendi;
