import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Stat,
  StatLabel,
  SimpleGrid,
  StatNumber,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import activityData from "variables/activityData";
import ActivityLogTable from "components/Tables/ActivityLogTable";

function ActivityLog() {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Flex direction="column" pt={{ base: "150px", lg: "75px" }}>
      <Card px="0px">
        <CardHeader px="22px">
          <Flex
            mb="10px"
            alignItems="center"
            justifyContent="start"
            pe="8px"
            px="24px"
          >
            <Text color={textColor} fontSize="lg" fontWeight="bold" mb="6px">
              Activity Log
            </Text>
          </Flex>
        </CardHeader>
        <CardBody px="22px">
          <ActivityLogTable tableData={activityData} />
        </CardBody>
      </Card>
    </Flex>
  );
}

export default ActivityLog;
