import { Grid, GridItem, HStack, Image } from "@chakra-ui/react";
import logo from "../../assets/react.svg";
import NavBar from "../../components/NavBar";
import ColorMode from "../../components/ColorMode";
import TransferRegister from "../../components/TransferRegister";
import { pages } from "./StudentHome";

const RegisterToInst = () => {
  return (
    <Grid templateAreas={{ base: `"nav" "main"` }}>
      <GridItem area="nav" justifyContent={"space-between"}>
        <HStack justifyContent="space-between" padding={2}>
          <Image src={logo} />
          <NavBar pages={pages} type="Student"></NavBar>
          <ColorMode />
        </HStack>
      </GridItem>
      <GridItem area="main" padding={2}>
        <center>
          <TransferRegister type="register"></TransferRegister>
        </center>
      </GridItem>
    </Grid>
  );
};

export default RegisterToInst;
