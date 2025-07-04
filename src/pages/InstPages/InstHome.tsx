import { Grid, GridItem, HStack, Image } from "@chakra-ui/react";
import ColorMode from "../../components/ColorMode";
import NavBar from "../../components/NavBar";
import logo from "../../assets/react.svg";
import StudentInfomation from "../../components/StudentInfomation";

const StudentHome = () => {
  return (
    <Grid templateAreas={{ base: `"nav" "main"` }}>
      <GridItem area="nav" justifyContent={"space-between"}>
        <HStack justifyContent="space-between" padding={2}>
          <Image src={logo} />
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
          <StudentInfomation></StudentInfomation>
        </center>
      </GridItem>
    </Grid>
  );
};

export default StudentHome;
