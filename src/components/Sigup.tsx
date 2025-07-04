import {
  Button,
  Card,
  Field,
  Fieldset,
  Input,
  NativeSelect,
} from "@chakra-ui/react";
import { useState } from "react";
const Signup = () => {
  const [role, setRole] = useState<string>("Student");
  return (
    <Card.Root maxW="sm">
      <Card.Header>
        <Card.Title>Sign up</Card.Title>
        <Card.Description>Fill in the form below to Register</Card.Description>
      </Card.Header>
      <Card.Body>
        <Fieldset.Root size="lg" maxW="md">
          <Fieldset.Content>
            <Field.Root>
              <Field.Label>User Type</Field.Label>
              <NativeSelect.Root>
                <NativeSelect.Field
                  name="country"
                  onChange={(e) => setRole(e.target.value)}
                >
                  {["Student", "Institution"].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Field.Root>

            <Field.Root>
              <Field.Label>
                {role === "Student" ? "Full Name" : "Institution Name"}
              </Field.Label>
              <Input name="name" />
            </Field.Root>

            <Field.Root display={role === "Student" ? "block" : "none"}>
              <Field.Label>Email address</Field.Label>
              <Input name="email" type="email" />
            </Field.Root>

            <Field.Root>
              <Field.Label>User ID</Field.Label>
              <Input name="id" type="text" />
            </Field.Root>
          </Fieldset.Content>

          <Button type="submit" alignSelf="flex-start">
            Submit
          </Button>
        </Fieldset.Root>
      </Card.Body>
      <Card.Footer justifyContent="flex-end"></Card.Footer>
    </Card.Root>
  );
};
export default Signup;
