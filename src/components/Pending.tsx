import { Card, VStack, Text, HStack, Button } from "@chakra-ui/react";
export interface data {
  name: string;
  address: string;
  id: string;
}
interface PendingProps {
  data: data[];
}
const Pending = ({ data }: PendingProps) => {
  return (
    <Card.Root>
      <Card.Body>
        {data.map((item, index) => (
          <VStack key={index}>
            <HStack>
              <Text>Name:</Text>
              <Text>{item.name}</Text>
            </HStack>
            <HStack>
              <Text>Address:</Text>
              <Text>{item.address}</Text>
            </HStack>
            <HStack>
              <Button>Accept</Button>
              <Button>Reject</Button>
            </HStack>
          </VStack>
        ))}
      </Card.Body>
    </Card.Root>
  );
};

export default Pending;
