import { Grid, GridItem, HStack, Image, VStack } from "@chakra-ui/react";
import ColorMode from "../../components/ColorMode";
import NavBar from "../../components/NavBar";
import logo from "../../assets/react.svg";

import UploadCertificate from "../../components/UploadCertificate";
import ShowData from "../../components/ShowData";
import { pages } from "./StudentHome";
const AddWorkExp = () => {
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
          <VStack>
            <UploadCertificate type="workExperiance"></UploadCertificate>
            <ShowData type="Work EXperiance"></ShowData>
          </VStack>
        </center>
      </GridItem>
    </Grid>
  );
};

export default AddWorkExp;
