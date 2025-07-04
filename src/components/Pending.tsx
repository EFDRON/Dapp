import { Card, VStack, Text, HStack, Button } from "@chakra-ui/react";

const Pending = () => {
  return (
    <Card.Root>
      <Card.Body>
        <VStack>
          <HStack>
            <Text>Name:</Text>
            <Text>John</Text>
          </HStack>
          <HStack>
            <Text>Address:</Text>
            <Text>0x00000</Text>
          </HStack>
          <HStack>
            <Button>Accept</Button>
            <Button>Reject</Button>
          </HStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};

export default Pending;
