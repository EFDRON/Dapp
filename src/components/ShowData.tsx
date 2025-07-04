import { Box, Card, HStack, Image, VStack, Text } from "@chakra-ui/react";
import user from "../assets/User.jpg";
interface Props {
  type: "Certificate" | "Work EXperiance" | "Skill";
}
const ShowData = ({ type }: Props) => (
  <Box minWidth={"500px"}>
    <Card.Root flexDirection="row" overflow="hidden" maxW="3xl">
      <Box>
        <Card.Body>
          <Card.Title mb="2"></Card.Title>
          <VStack align="start">
            <HStack>
              <Text fontWeight="bold">Name:</Text>
              <Text>John Doe</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">
                {type === "Certificate"
                  ? "Certificate Name:"
                  : type === "Skill"
                  ? "Skill: "
                  : "Role"}
              </Text>
              <Text>Programming</Text>
            </HStack>
            {(type === "Certificate" || type === "Work EXperiance") && (
              <VStack>
                <HStack alignItems={"left"}>
                  <Text fontWeight="bold">Institute Name:</Text>
                  <Text>AUS</Text>
                </HStack>
              </VStack>
            )}

            {type === "Work EXperiance" && (
              <VStack>
                <HStack>
                  <Text fontWeight="bold">Start Date:</Text>
                  <Text>Programming</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="bold">End Date:</Text>
                  <Text>Programming</Text>
                </HStack>
              </VStack>
            )}
          </VStack>
        </Card.Body>
        <Card.Footer></Card.Footer>
      </Box>
      {type !== "Skill" && (
        <Image objectFit="cover" maxW="200px" src={user} alt="Caffe Latte" />
      )}
    </Card.Root>
  </Box>
);

export default ShowData;
