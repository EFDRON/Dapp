import { Grid, GridItem, HStack, Image } from "@chakra-ui/react";
import logo from "../../assets/react.svg";
import ColorMode from "../../components/ColorMode";

import TransferRegister from "../../components/TransferRegister";

const RecHome = () => {
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
          <TransferRegister type="fetch"></TransferRegister>
        </center>
      </GridItem>
    </Grid>
  );
};

export default RecHome;
