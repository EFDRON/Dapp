import { Grid, GridItem, HStack, Image } from "@chakra-ui/react";
import ColorMode from "../../components/ColorMode";
import NavBar from "../../components/NavBar";
import logoWhite from "../../assets/LogoWhite.svg";
import logoBlack from "../../assets/LogoBlack.svg";
import StudentInfomation from "../../components/StudentInfomation";
import { useColorMode } from "../../components/ui/color-mode";
export const pages = [
  "Home",
  "Register Institution",
  "Add Skill",
  "Add Certificate",
  "Add Work Experience",
];

const StudentHome = () => {
  const colorMode = useColorMode().colorMode;
  return (
    <Grid templateAreas={{ base: `"nav" "main"` }}>
      <GridItem area="nav" justifyContent={"space-between"}>
        <HStack justifyContent="space-between" padding={2}>
          <Image src={colorMode === "dark" ? logoWhite : logoBlack} />
          <NavBar pages={pages} type="Student"></NavBar>
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
