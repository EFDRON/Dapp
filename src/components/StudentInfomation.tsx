import {
  Box,
  Card,
  HStack,
  Image,
  VStack,
  Text,
  Center,
} from "@chakra-ui/react";
import user from "../assets/User.jpg";

const StudentInfomation = () => {
  return (
    <Center>
      <Card.Root flexDirection="row" overflow="hidden" maxW="3xl">
        <Image objectFit="cover" maxW="200px" src={user} alt="Caffe Latte" />
        <Box>
          <Card.Body>
            <Card.Title mb="2"></Card.Title>
            <VStack align="start">
              <HStack>
                <Text fontWeight="bold">Name:</Text>
                <Text>John Doe</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold">Email:</Text>
                <Text>john.doe@example.com</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold">ID:</Text>
                <Text>123456789</Text>
              </HStack>
              <VStack alignItems={"left"}>
                <Text fontWeight="bold">Account Address:</Text>
                <Text>0x1234567890123456789012345678901234567890</Text>
              </VStack>
              <HStack>
                <Text fontWeight="bold">Institution:</Text>
                <Text>MIT</Text>
              </HStack>
            </VStack>
          </Card.Body>
          <Card.Footer></Card.Footer>
        </Box>
      </Card.Root>
    </Center>
  );
};
export default StudentInfomation;
