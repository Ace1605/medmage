import { Flex, Text, useColorModeValue, Icon, Spinner } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import ActivityLogTable from "components/Tables/ActivityLogTable";
import { useContext, useState } from "react";
import { AppContext } from "contexts/AppContext";
import { MdFolderOff } from "react-icons/md";
import { useGetActivityLog } from "hooks/api/activityLog/useGetActivityLog";

function ActivityLog() {
  const textColor = useColorModeValue("gray.700", "white");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const { token } = useContext(AppContext);
  const { data, isFetching, refetch, error, isLoading } = useGetActivityLog(
    token,
    page,
    size
  );

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
          {isLoading || isFetching ? (
            <Flex width="100% " height="30vh" align="center" justify="center">
              <Spinner w="40px" h="40px" color="#3182ce" />
            </Flex>
          ) : data?.data.length < 1 ? (
            <Flex
              width="100% "
              direction="column"
              height="30vh"
              align="center"
              justify="center"
              gap="20px"
            >
              <Icon as={MdFolderOff} w="60px" h="60px" color="#E2E8F0" />
              <Text color="#E2E8F0" fontSize="18px">
                No Data
              </Text>
            </Flex>
          ) : (
            <ActivityLogTable
              tableData={data}
              pageNo={page}
              size={size}
              setPageNo={setPage}
              setSize={setSize}
            />
          )}
        </CardBody>
      </Card>
    </Flex>
  );
}

export default ActivityLog;
