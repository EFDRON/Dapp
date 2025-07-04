import { Grid, GridItem, HStack, Image } from "@chakra-ui/react";
import ColorMode from "../components/ColorMode";
import Signup from "../components/Sigup";
import logo from "../assets/react.svg";

const Register = () => {
  return (
    <Grid templateAreas={{ base: `"nav" "main"` }}>
      <GridItem area="nav" justifyContent={"space-between"}>
        <HStack justifyContent="space-between" padding={2}>
          <Image src={logo} />
          <ColorMode />
        </HStack>
      </GridItem>
      <GridItem area="main" padding={2}>
        <center>
          <Signup></Signup>
        </center>
      </GridItem>
    </Grid>
  );
};

export default Register;
