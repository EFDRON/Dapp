// Basic Express backend skeleton
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const fs = require("fs-extra");
const Web3 = require("web3");
const Web3Quorum = require("web3js-quorum");
const PORT = process.env.PORT || 5000;
const createContract = require("./Files/main.js");
const { tessera, besu, contractInformations } = require("./Files/keys.js");

const chainId = 1337;

const contractJsonRegStudPath = path.resolve(
  __dirname,
  "./Files",
  "registerStud.json"
);
const contractJsonRegStud = JSON.parse(
  fs.readFileSync(contractJsonRegStudPath)
);

const contractAbiRegStud = contractJsonRegStud.abi;

// Public Data
const contractJsonPublicDataPath = path.resolve(
  __dirname,
  "./",
  "Files",
  "publicdata.json"
);

const contractJsonPublicData = JSON.parse(
  fs.readFileSync(contractJsonPublicDataPath)
);

const contractAbiPublicData = contractJsonPublicData.abi;

async function RegisterStudentPrivate(
  clientUrl,
  address,
  value,
  contractAbi,
  fromPrivateKey,
  fromPublicKey,
  toPublicKey
) {
  // Deploy Student COntract
  console.log(
    besu.member3.url,
    besu.member3.accountPrivateKey,
    tessera.member3.publicKey,
    tessera.member1.publicKey
  );
  const StudentContract = await createContract(
    besu.member3.url,
    besu.member3.accountPrivateKey,
    tessera.member3.publicKey,
    tessera.member1.publicKey,
    value
  );
  console.log(
    "Student 11 Contract Address : ",
    StudentContract.contractAddress
  );
  // At Register Stud Contract
  const web3 = new Web3(clientUrl);
  const web3quorum = new Web3Quorum(web3, chainId);
  const contract = new web3quorum.eth.Contract(contractAbi);
  // eslint-disable-next-line no-underscore-dangle
  const functionAbi = contract._jsonInterface.find((e) => {
    return e.name === "registerStudents";
  });
  console.log([...value, StudentContract.contractAddress]);

  const functionArgs = web3quorum.eth.abi
    .encodeParameters(functionAbi.inputs, [
      value[0],
      value[1],
      value[2],
      value[3],
      StudentContract.contractAddress,
    ])
    .slice(2);
  const functionParams = {
    to: address,
    data: functionAbi.signature + functionArgs,
    privateKey: fromPrivateKey,
    privateFrom: fromPublicKey,
    privateFor: [toPublicKey],
  };
  console.log("Student 22 Contract Address : ", functionParams);
  const transactionHash = await web3quorum.priv.generateAndSendRawTransaction(
    functionParams
  );
  console.log(
    "Student 33 Contract Address : ",
    StudentContract.contractAddress
  );
  console.log(`Transaction hash: ${transactionHash}`);
  const result = await web3quorum.priv.waitForTransactionReceipt(
    transactionHash
  );

  return [result, StudentContract.contractAddress];
}

async function RegisterStudentPublic(contractAddress, contractAbi, value) {
  console.log("Registering Student Public");

  const host = besu.rpcnode.url;
  const web3 = new Web3(host);

  const account = web3.eth.accounts.privateKeyToAccount(
    besu.member3.accountPrivateKey
  );
  const fromAddress = account.address;

  const contractInstance = new web3.eth.Contract(contractAbi, contractAddress);

  // Encode function call
  const data = contractInstance.methods
    .registerStudent(value[0], value[1])
    .encodeABI();

  const tx = {
    to: contractAddress,
    data: data,
    gas: 150000, // or tune it
    gasPrice: "0x0", // for Besu/Quorum, no fees
    from: fromAddress,
  };

  const signed = await web3.eth.accounts.signTransaction(
    tx,
    besu.member3.accountPrivateKey
  );
  const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);

  console.log("Result from Register:", receipt);
  return receipt;
}

// Middleware
app.use(cors());
app.use(express.json());

// Example route
app.post("/registerStudent", async (req, res) => {
  const { name, student_address, email, id } = req.body;

  const [resultPrivate, contractAddress] = await RegisterStudentPrivate(
    besu.member3.url,
    contractInformations.registerStud.contractAddress,
    [
      name,
      student_address,
      email,
      id,
      contractInformations.verifyStud.contractAddress,
      contractInformations.verifyInst.contractAddress,
    ],
    contractAbiRegStud,
    besu.member3.accountPrivateKey,
    tessera.member3.publicKey,
    tessera.member1.publicKey
  );
  console.log(contractInformations.publicdata.contractAddress);
  console.log(resultPrivate);
  console.log(contractAddress);
  const resultPublic = await RegisterStudentPublic(
    contractInformations.publicdata.contractAddress,
    contractAbiPublicData,
    [student_address, contractAddress]
  );
  console.log("the Last", resultPublic);
  if (resultPrivate.status === "0x1" && resultPublic.status === true) {
    res.status(200).json({ message: "Student registered successfully" });
  } else {
    res.status(500).json({ message: "Failed to register student" });
  }
});

// Placeholder for your Quorum/Web3 logic
// app.post('/api/your-endpoint', async (req, res) => { ... });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
