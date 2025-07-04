import { Button, Card, Center, Heading } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Web3Context } from "../Web3ContextProvider";
import Web3, { type ContractMethod } from "web3";
import publicdata from "../files/publicdata.js";
import keys from "../files/keys.js";
import { useNavigate } from "react-router-dom";

const contInfo = keys.contractInformations;
const besu = keys.besu;
const host = besu.rpcnode.url;
const web3 = new Web3(host);
interface UserData {
  type: string;
  contAddress: string;
  node: string;
}

const Choose = () => {
  const navigate = useNavigate();
  const { trigger, setTrigger, account, connect } = useContext(Web3Context);

  const handleLogin = async () => {
    const connecdAccount = await connect();
    setTrigger((prev) => !prev);
    console.log(connecdAccount);
    if (connecdAccount) {
      const data = await check(connecdAccount);
      console.log("data: ", data);
      if (data.type === "moe") navigate("/admin-home");
      else if (data.type === "institute") navigate("/institution-home");
      else if (data.type === "student") navigate("/Student-home");
      else if (data.type === "rec") navigate("/rec-home");
    }
  };
  const check = async (account: string) => {
    const contractInstance = new web3.eth.Contract(
      publicdata.abi,
      contInfo.publicdata.contractAddress
    );

    try {
      const isMoe = await contractInstance.methods
        .ismoe()
        .call({ from: account });
      if (isMoe) {
        return { type: "moe", contAddress: "", node: "" };
      }
    } catch (err) {
      console.log("Not Moe");
    }

    try {
      const value2: string[] = await contractInstance.methods
        .getInstContractAddress(account)
        .call({ from: account });

      if (value2 && value2[0]) {
        return { type: "institute", contAddress: value2[0], node: value2[1] };
      }
    } catch (err) {
      console.log("Not Institute");
    }

    try {
      const value3: string[] = await contractInstance.methods
        .getStudContractAddress(account)
        .call({ from: account });

      if (value3 && value3[0]) {
        return { type: "student", contAddress: value3[0], node: value3[1] };
      }
    } catch (err) {
      console.log("Not Student");
    }

    console.log("Redirecting to REC, no other roles found, account: ");
    return { type: "rec", contAddress: "", node: "" };
  };

  return (
    <Center>
      <Card.Root width="500px">
        <Card.Body gap="2">
          <Card.Title mt="2" justifyContent={"center"}>
            Student Data Management System
          </Card.Title>
          <Card.Description></Card.Description>
        </Card.Body>
        <Card.Footer justifyContent={"center"} spaceX={2}>
          <RouterLink to="/register">
            <Button variant="outline">SignUp</Button>
          </RouterLink>
          <Button onClick={handleLogin}>Login</Button>
        </Card.Footer>
      </Card.Root>
    </Center>
  );
};
export default Choose;
