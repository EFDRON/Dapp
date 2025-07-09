const Web3 = require("web3");
const path = require("path");
const fs = require("fs-extra");
const Web3Quorum = require("web3js-quorum");
const chainId = 1337;
const { besu, tessera, contractInformations } = require("../Files/keys");
const createContract = require("../Files/main");

// Verify Stud contract
const contractJsonVerifyStudPath = path.resolve(
  __dirname,
  "../Files",
  "verifystud.json"
);
const contractJsonVerifyStud = JSON.parse(
  fs.readFileSync(contractJsonVerifyStudPath)
);
const contractAbiVerifyStud = contractJsonVerifyStud.abi;

// Verify Inst contract
const contractJsonVerifyInstPath = path.resolve(
  __dirname,
  "../Files",
  "verifyinst.json"
);
const contractJsonVerifyInst = JSON.parse(
  fs.readFileSync(contractJsonVerifyInstPath)
);
const contractAbiVerifyInst = contractJsonVerifyInst.abi;

const getInstitutesCount = async (functionName) => {
  const web3 = new Web3(besu.member1.url);
  const web3quorum = new Web3Quorum(web3, chainId);
  const contract = new web3.eth.Contract(contractAbiVerifyInst);

  // Dynamically find the ABI for the provided function name
  const functionAbi = contract._jsonInterface.find(
    (e) => e.name === functionName
  );

  if (!functionAbi) {
    throw new Error(`Function ${functionName} not found in ABI`);
  }

  const functionParams = {
    to: contractInformations.verifyInst.contractAddress,
    data: functionAbi.signature,
    privateKey: besu.member1.accountPrivateKey,
    privateFrom: tessera.member1.publicKey,
    privateFor: [tessera.member1.publicKey],
  };

  const transactionHash = await web3quorum.priv.generateAndSendRawTransaction(
    functionParams
  );
  const result = await web3quorum.priv.waitForTransactionReceipt(
    transactionHash
  );

  const decoded = web3quorum.eth.abi.decodeParameters(
    functionAbi.outputs,
    result.output
  );
  console.log(decoded[0]);
  return decoded[0];
};

const getStudentsCount = async (functionName) => {
  const web3 = new Web3(besu.member2.url);
  const web3quorum = new Web3Quorum(web3, chainId);
  const contract = new web3quorum.eth.Contract(contractAbiVerifyStud);

  // Dynamically find the ABI for the provided function name
  const functionAbi = contract._jsonInterface.find(
    (e) => e.name === functionName
  );

  if (!functionAbi) {
    throw new Error(`Function ${functionName} not found in ABI`);
  }
  console.log("functionAbiof thecount", functionAbi);
  const functionParams = {
    to: contractInformations.verifyStud.contractAddress,
    data: functionAbi.signature,
    privateKey: besu.member2.accountPrivateKey,
    privateFrom: tessera.member2.publicKey,
    privateFor: [tessera.member1.publicKey],
  };

  const transactionHash = await web3quorum.priv.generateAndSendRawTransaction(
    functionParams
  );
  const result = await web3quorum.priv.waitForTransactionReceipt(
    transactionHash
  );

  const decoded = web3quorum.eth.abi.decodeParameters(
    functionAbi.outputs,
    result.output
  );
  console.log(decoded[0]);
  return decoded[0];
};

const ListPendingStudents = async () => {
  const web3 = new Web3(besu.member2.url);
  const web3quorum = new Web3Quorum(web3, chainId);
  const contract = new web3quorum.eth.Contract(contractAbiVerifyStud);
  console.log("started listing");
  const functionAbi = contract._jsonInterface.find((e) => {
    return e.name === "getPendingStudentByindex";
  });
  const pendingStudentsCount = await getStudentsCount(
    "getPendingStudentsCount"
  );
  console.log("pendingStudentsCount", pendingStudentsCount);
  const students = [];

  for (let i = 0; i < pendingStudentsCount; i++) {
    const functionArgs = web3quorum.eth.abi
      .encodeParameter(functionAbi.inputs[0], i)
      .slice(2);
    console.log("functionArgs", functionArgs);
    const functionParams = {
      to: contractInformations.verifyStud.contractAddress,
      data: functionAbi.signature + functionArgs,
      privateKey: besu.member2.accountPrivateKey,
      privateFrom: tessera.member2.publicKey,
      privateFor: [tessera.member1.publicKey],
    };
    console.log("functionParams", functionParams);
    const transactionHash = await web3quorum.priv.generateAndSendRawTransaction(
      functionParams
    );
    const result = await web3quorum.priv.waitForTransactionReceipt(
      transactionHash
    );
    const decoded = web3quorum.eth.abi.decodeParameters(
      ["string", "address", "string", "string", "address"],
      result.output
    );
    console.log(decoded);
    const intermediate = {
      name: decoded[0],
      address: decoded[1],
      email: decoded[2],
      id: decoded[3],
      index: i,
    };
    students.push(intermediate);
  }
  console.log(students);
  return students;
};

const ListTransferStudents = async () => {
  const web3 = new Web3(besu.member2.url);
  const web3quorum = new Web3Quorum(web3, chainId);
  const contract = new web3quorum.eth.Contract(contractAbiVerifyStud);
  const transferStudentsCount = await getStudentsCount(
    "getTransferStudentsCount"
  );
  const functionAbi = contract._jsonInterface.find((e) => {
    return e.name === "getTransferStudentByindex";
  });
  const students = [];
  for (let i = 0; i < transferStudentsCount; i++) {
    const functionArgs = web3quorum.eth.abi
      .encodeParameter(functionAbi.inputs[0], i)
      .slice(2);
    const functionParams = {
      to: contractInformations.verifyStud.contractAddress,
      data: functionAbi.signature + functionArgs,
      privateKey: besu.member2.accountPrivateKey,
      privateFrom: tessera.member2.publicKey,
      privateFor: [tessera.member1.publicKey],
    };
    const transactionHash = await web3quorum.priv.generateAndSendRawTransaction(
      functionParams
    );
    const result = await web3quorum.priv.waitForTransactionReceipt(
      transactionHash
    );
    const decoded = web3quorum.eth.abi.decodeParameters(
      ["string", "address", "string", "string", "address"],
      result.output
    );
    console.log(decoded);
    const intermediate = {
      name: decoded[0],
      address: decoded[1],
      email: decoded[2],
      id: decoded[3],
      index: i,
    };
    students.push(intermediate);
  }
  return students;
};

const VerifyPendingStudent = async (index) => {
  console.log("started verifying", index);
  const web3 = new Web3(besu.member2.url);
  const web3quorum = new Web3Quorum(web3, chainId);
  const contract = new web3quorum.eth.Contract(contractAbiVerifyStud);
  const functionAbi = contract._jsonInterface.find((e) => {
    return e.name === "verifystudent";
  });
  const functionArgs = web3quorum.eth.abi
    .encodeParameter(functionAbi.inputs[0], index)
    .slice(2);
  console.log("functionArgs", functionArgs);
  const functionParams = {
    to: contractInformations.verifyStud.contractAddress,
    data: functionAbi.signature + functionArgs,
    privateKey: besu.member2.accountPrivateKey,
    privateFrom: tessera.member2.publicKey,
    privateFor: [tessera.member1.publicKey],
  };
  console.log("functionParams", functionParams);
  const transactionHash = await web3quorum.priv.generateAndSendRawTransaction(
    functionParams
  );
  const result = await web3quorum.priv.waitForTransactionReceipt(
    transactionHash
  );
  console.log("result", result);
  return result.output;
};
const VerifyTransferStudent = async (index) => {
  console.log("started verifying", index);
  const web3 = new Web3(besu.member2.url);
  const web3quorum = new Web3Quorum(web3, chainId);
  const contract = new web3quorum.eth.Contract(contractAbiVerifyStud);
  const functionAbi = contract._jsonInterface.find((e) => {
    return e.name === "verifyTransferstudent";
  });
  const functionArgs = web3quorum.eth.abi
    .encodeParameters(functionAbi.inputs, [index])
    .slice(2);
  console.log("functionArgs", functionArgs);
  const functionParams = {
    to: contractInformations.verifyStud.contractAddress,
    data: functionAbi.signature + functionArgs,
    privateKey: besu.member2.accountPrivateKey,
    privateFrom: tessera.member2.publicKey,
    privateFor: [tessera.member1.publicKey],
  };
  const transactionHash = await web3quorum.priv.generateAndSendRawTransaction(
    functionParams
  );
  const result = await web3quorum.priv.waitForTransactionReceipt(
    transactionHash
  );
  console.log("result", result);
  return result.output;
};

module.exports = {
  ListTransferStudents,
  ListPendingStudents,
  VerifyPendingStudent,
  VerifyTransferStudent,
  getInstitutesCount,
};
