import { Button, Card, Center } from "@chakra-ui/react";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Web3Context } from "../Web3ContextProvider";
import { useNavigate } from "react-router-dom";

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
