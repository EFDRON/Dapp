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

const {
  ListTransferStudents,
  ListPendingStudents,
  VerifyPendingStudent,
  VerifyTransferStudent,
} = require("./Functions/transferFunctions.js");
const { tessera, besu, contractInformations } = require("./Files/keys.js");
const {
  RegisterInstitutePrivateToPending,
  RegisterStudentPrivateTransfer,
} = require("./Functions/InstFunctions.js");
const {
  RegisterStudentPrivate,
  RegisterStudentPublic,
  RegisterStudentPrivateToPending,
} = require("./Functions/StudFunctions.js");
const { ListPendingInstitutes } = require("./Functions/AdminFunctions.js");
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
  "./Files",
  "publicdata.json"
);

const contractJsonPublicData = JSON.parse(
  fs.readFileSync(contractJsonPublicDataPath)
);

const contractAbiPublicData = contractJsonPublicData.abi;

const contractJsonRegInstPath = path.resolve(
  __dirname,
  "./Files",
  "registerInst.json"
);
const contractJsonRegInst = JSON.parse(
  fs.readFileSync(contractJsonRegInstPath)
);
const contractAbiRegInst = contractJsonRegInst.abi;

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
    besu.member3.accountPrivateKey,
    tessera.member3.publicKey,
    tessera.member1.publicKey
  );
  console.log(contractInformations.publicdata.contractAddress);
  console.log(resultPrivate);
  console.log(contractAddress);
  const resultPublic = await RegisterStudentPublic(
    contractInformations.publicdata.contractAddress,
    [student_address, contractAddress]
  );
  console.log("the Last", resultPublic);
  if (resultPrivate.status === "0x1" && resultPublic.status === true) {
    res.status(200).json({ message: "Student registered successfully" });
  } else {
    res.status(500).json({ message: "Failed to register student" });
  }
});

app.post("/registerInstituteToPending", async (req, res) => {
  const { name, institute_address, id } = req.body;

  const resultPrivate = await RegisterInstitutePrivateToPending(
    besu.member2.url,
    contractInformations.registerInst.contractAddress,
    [institute_address, name, id],
    contractAbiRegInst,
    besu.member2.accountPrivateKey,
    tessera.member2.publicKey,
    tessera.member1.publicKey
  );

  console.log(resultPrivate);
  if (resultPrivate.status === "0x1") {
    res.status(200).json({ message: "Institute registered successfully" });
  } else {
    res.status(500).json({ message: "Failed to register institute" });
  }
});

app.get("/listPendingInstitutes", async (req, res) => {
  const institutes = await ListPendingInstitutes(
    besu.member2.url,
    "node",
    contractInformations.registerInst.contractAddress,
    besu.member2.accountPrivateKey,
    tessera.member2.publicKey,
    tessera.member1.publicKey
  );
  console.log(institutes);
  res.status(200).json(institutes);
});
// Placeholder for your Quorum/Web3 logic
// app.post('/api/your-endpoint', async (req, res) => { ... });

app.post("/regStudToInstPending", async (req, res) => {
  const { student_address, institute_address } = req.body;

  const resultPrivate = await RegisterStudentPrivateToPending(
    besu.member3.url, // The clientUrl must match the sender's identity (member3)
    [student_address, institute_address],
    besu.member3.accountPrivateKey,
    tessera.member3.publicKey,
    tessera.member1.publicKey
  );
  console.log(resultPrivate);
  if (resultPrivate.status === "0x1") {
    res.status(200).json({ message: "Student added to pending successfully" });
  } else {
    res.status(500).json({ message: "Failed to add student to pending" });
  }
});
app.post("/regStudToInstTransfer", async (req, res) => {
  const { student_address, current_institute_address, new_institute_address } =
    req.body;

  const resultPrivate = await RegisterStudentPrivateTransfer(
    besu.member2.url,
    [student_address, current_institute_address, new_institute_address],
    besu.member2.accountPrivateKey,
    tessera.member2.publicKey,
    tessera.member1.publicKey
  );
  console.log(resultPrivate);
  if (resultPrivate.status === "0x1") {
    res.status(200).json({ message: "Institution transfer Pending" });
  } else {
    res.status(500).json({ message: "Failed to transfer institution" });
  }
});

app.get("/listPendingStudents", async (req, res) => {
  const PendingStudents = await ListPendingStudents(
    besu.member2.url,
    "node",
    contractInformations.registerInst.contractAddress,
    besu.member2.accountPrivateKey,
    tessera.member2.publicKey,
    tessera.member1.publicKey
  );
  console.log(PendingStudents);
  res.status(200).json(PendingStudents);
});
app.get("/listTransferStudents", async (req, res) => {
  const TransferStudents = await ListTransferStudents(
    besu.member2.url,
    "node",
    contractInformations.registerInst.contractAddress,
    besu.member2.accountPrivateKey,
    tessera.member2.publicKey,
    tessera.member1.publicKey
  );
  console.log(TransferStudents);
  res.status(200).json(TransferStudents);
});
app.post("/acceptPendingStudent", async (req, res) => {
  const { index } = req.body;
  const result = await VerifyPendingStudent(index);
  if (result.status === "0x1") {
    res.status(200).json({ message: "Student accepted successfully" });
  } else {
    res.status(500).json({ message: "Failed to accept student" });
  }
});
app.post("/acceptTransferStudent", async (req, res) => {
  const { index } = req.body;
  const result = await VerifyTransferStudent(index);
  if (result.status === "0x1") {
    res.status(200).json({ message: "Student accepted successfully" });
  } else {
    res.status(500).json({ message: "Failed to accept student" });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
