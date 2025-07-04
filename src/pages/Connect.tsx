import { Grid, GridItem, HStack, Image } from "@chakra-ui/react";
import logo from "../assets/react.svg";
import ColorMode from "../components/ColorMode";
import Choose from "../components/Choose";

const Connect = () => {
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
          <Choose></Choose>
        </center>
      </GridItem>
    </Grid>
  );
};

export default Connect;
