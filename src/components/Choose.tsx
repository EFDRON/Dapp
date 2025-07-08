import { Button, Card, Center } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Web3Context } from "../Web3ContextProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Choose = () => {
  const navigate = useNavigate();
  const { setTrigger, connect, check } = useContext(Web3Context);

  const handleLogin = async () => {
    const connecdAccount = await connect();
    setTrigger((prev) => !prev);
    console.log(connecdAccount);

    if (connecdAccount) {
      console.log("Connected");
      const data = await check(connecdAccount);
      console.log("data: ", data);

      if (data.type === "moe") navigate("/admin-home");
      else if (data.type === "institute") navigate("/institution-home");
      else if (data.type === "student") navigate("/Student-home");
      else if (data.type === "rec") navigate("/rec-home");
    }
  };
  const [countinst, setcount] = useState<number>(0);
  useEffect(() => {
    axios.get("http://localhost:5000/getInstitutesCount").then((res) => {
      console.log(res.data);
      setcount(res.data);
    });
  }, []);

  return (
    <Center>
      <Card.Root width="500px">
        <Card.Body gap="2">
          <Card.Title mt="2" justifyContent={"center"}>
            Student Data Management System
          </Card.Title>
          <Card.Description>{countinst}</Card.Description>
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
