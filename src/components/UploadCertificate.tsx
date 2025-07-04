import {
  Box,
  Button,
  Card,
  Field,
  Fieldset,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import UploadFile from "./UploadFile";
type CertigicateType = "normal" | "skill" | "workExperiance";
interface Props {
  type: CertigicateType;
}

const UploadCertificate = ({ type }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  return (
    <Box minWidth={"500px"}>
      <Card.Root padding={2} maxW="3xl">
        <Card.Header>
          <Card.Title>
            {type === "workExperiance"
              ? "Add Work Experience"
              : type === "skill"
              ? "Add Skill"
              : "Upload Certificate"}
          </Card.Title>
          <Card.Description>
            Please provide your{" "}
            {type === "workExperiance"
              ? "work experience details"
              : type === "skill"
              ? "skill details"
              : "certificate details"}{" "}
            below.
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <Fieldset.Root size="lg">
            <Fieldset.Content>
              {/* Common Field: Certificate Name */}
              {type === "normal" && (
                <>
                  <Field.Root>
                    <Field.Label>Certificate Name</Field.Label>
                    <Input name="certificateName" />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Institute Address</Field.Label>
                    <Input name="instituteAddress" />
                  </Field.Root>
                </>
              )}

              {type === "skill" && (
                <>
                  <Field.Root>
                    <Field.Label>Skill Name</Field.Label>
                    <Input name="skillName" />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Experience</Field.Label>
                    <Input name="experience" />
                  </Field.Root>
                </>
              )}

              {type === "workExperiance" && (
                <>
                  <Field.Root>
                    <Field.Label>Company Name</Field.Label>
                    <Input name="companyName" />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Institute Address</Field.Label>
                    <Input name="instituteAddress" />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Job Title</Field.Label>
                    <Input name="jobTitle" />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Start Date</Field.Label>
                    <Input name="startDate" type="date" />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>End Date</Field.Label>
                    <Input name="endDate" type="date" />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Description</Field.Label>
                    <Textarea name="description" />
                  </Field.Root>
                </>
              )}

              {/* File Upload (for all types) */}
              <Field.Root>
                <Field.Label>Upload Certificate File</Field.Label>
                <UploadFile onChange={(files: File[]) => setFile(files[0])} />
              </Field.Root>

              {/* Certificate Hash (for all types) */}
              <Field.Root>
                <Field.Label>Certificate Hash</Field.Label>
                <Input name="certificateHash" />
              </Field.Root>
            </Fieldset.Content>

            <Button type="submit" alignSelf="flex-start" mt={4}>
              Submit
            </Button>
          </Fieldset.Root>
        </Card.Body>
      </Card.Root>
    </Box>
  );
};

export default UploadCertificate;
