import { Grid, GridItem, HStack, Image, VStack, Text } from "@chakra-ui/react";
import ColorMode from "../../components/ColorMode";
import NavBar from "../../components/NavBar";
import logoWhite from "../../assets/LogoWhite.svg";
import logoBlack from "../../assets/LogoBlack.svg";
import Pending from "../../components/Pending";
import { useColorMode } from "../../components/ui/color-mode";

const PendingStud = () => {
  const colorMode = useColorMode().colorMode;
  const pendings = [1, 2, 3, 4];
  const transfer = [5, 6, 7, 8];
  return (
    <Grid templateAreas={{ base: `"nav" "main"` }}>
      <GridItem area="nav" justifyContent={"space-between"}>
        <HStack justifyContent="space-between" padding={2}>
          <Image src={colorMode === "dark" ? logoWhite : logoBlack} />
          <NavBar
            pages={[
              "Home",
              "Pending Students",
              "Transfer Students",
              "Add Certificate",
            ]}
            type="Institution"
          ></NavBar>
          <ColorMode />
        </HStack>
      </GridItem>
      <GridItem area="main" padding={2}>
        <center>
          <HStack minWidth={"500px"} justifyContent={"center"}>
            <VStack marginEnd={"80px"}>
              <Text>Pending Students</Text>
              {pendings.map((pending) => (
                <Pending key={pending} data={pending}></Pending>
              ))}
            </VStack>
            <VStack>
              <Text>Transfer Students</Text>
              {transfer.map((transfer) => (
                <Pending key={transfer} data={transfer}></Pending>
              ))}
            </VStack>
          </HStack>
        </center>
      </GridItem>
    </Grid>
  );
};

export default PendingStud;
