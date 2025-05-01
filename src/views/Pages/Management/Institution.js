import { DownloadIcon } from "@chakra-ui/icons";
import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import InstitutionTable from "components/Tables/InstitutionTable";
import InistitutionData from "variables/inistitutionData.json";

function Institution() {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Flex direction="column" pt={{ base: "150px", lg: "75px" }}>
      <Card px="0px">
        <CardHeader px="22px">
          <Flex
            mb="10px"
            alignItems="center"
            justifyContent="space-between"
            pe="8px"
            px="24px"
          >
            <Text color={textColor} fontSize="lg" fontWeight="bold" mb="6px">
              Institution
            </Text>
            <Flex gap="12px" alignItems="center">
              <Button
                rightIcon={<DownloadIcon />}
                px="12px"
                fontSize="14px"
                colorScheme="blue"
                fontWeight="bold"
                minw="90px"
                h="40px"
              >
                Import
              </Button>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody px="22px">
          <InstitutionTable tableData={InistitutionData} />
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Institution;
