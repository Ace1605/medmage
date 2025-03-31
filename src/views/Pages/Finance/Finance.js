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
import transactionData from "variables/transactionData";
import FinanceTable from "components/Tables/FinanceTable";

function Finance() {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Flex direction="column" pt={{ base: "150px", lg: "75px" }}>
        <SimpleGrid columns={{ sm: 1, md: 2, xl: 5 }} spacing="24px" mb="30px">
        <Card minH="125px">
          <Flex direction="column">
            <Flex
              flexDirection="row"
              align="center"
              justify="center"
              w="100%"
              mb="25px"
            >
              <Stat me="auto">
                <StatLabel
                  fontSize="xs"
                  color="gray.400"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  Pharmacy
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                    ₦3,000,000
                  </StatNumber>
                </Flex>
              </Stat>
            </Flex>
            <Text color="gray.400" fontSize="sm">
              <Text as="span" color="green.400" fontWeight="bold">
                +3.48%{" "}
              </Text>
              Since last month
            </Text>
          </Flex>
        </Card>
        <Card minH="125px">
          <Flex direction="column">
            <Flex
              flexDirection="row"
              align="center"
              justify="center"
              w="100%"
              mb="25px"
            >
              <Stat me="auto">
                <StatLabel
                  fontSize="xs"
                  color="gray.400"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  Surgeries
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                       ₦10,000,000
                  </StatNumber>
                </Flex>
              </Stat>
            </Flex>
            <Text color="gray.400" fontSize="sm">
              <Text as="span" color="green.400" fontWeight="bold">
                +5.2%{" "}
              </Text>
              Since last month
            </Text>
          </Flex>
        </Card>
        <Card minH="125px">
          <Flex direction="column">
            <Flex
              flexDirection="row"
              align="center"
              justify="center"
              w="100%"
              mb="25px"
            >
              <Stat me="auto">
                <StatLabel
                  fontSize="xs"
                  color="gray.400"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  Consultation
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                        ₦10,000,000
                  </StatNumber>
                </Flex>
              </Stat>
            </Flex>
            <Text color="gray.400" fontSize="sm">
              <Text as="span" color="red.500" fontWeight="bold">
                -2.82%{" "}
              </Text>
              Since last month
            </Text>
          </Flex>
        </Card>
        <Card minH="125px">
          <Flex direction="column">
            <Flex
              flexDirection="row"
              align="center"
              justify="center"
              w="100%"
              mb="25px"
            >
              <Stat me="auto">
                <StatLabel
                  fontSize="xs"
                  color="gray.400"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  Laboratory
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                    ₦1,000,000
                  </StatNumber>
                </Flex>
              </Stat>
            </Flex>
            <Text color="gray.400" fontSize="sm">
              <Text as="span" color="green.400" fontWeight="bold">
                +8.12%{" "}
              </Text>
              Since last month
            </Text>
          </Flex>
        </Card>
        <Card minH="125px">
          <Flex direction="column">
            <Flex
              flexDirection="row"
              align="center"
              justify="center"
              w="100%"
              mb="25px"
            >
              <Stat me="auto">
                <StatLabel
                  fontSize="xs"
                  color="gray.400"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  Maternity & Delivery
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                     ₦20,000,000
                  </StatNumber>
                </Flex>
              </Stat>
            </Flex>
            <Text color="gray.400" fontSize="sm">
              <Text as="span" color="green.400" fontWeight="bold">
                +5.12%{" "}
              </Text>
              Since last month
            </Text>
          </Flex>
        </Card>
      </SimpleGrid>
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
            Transactions
            </Text>
          </Flex>
        </CardHeader>
        <CardBody px="22px">
          <FinanceTable tableData={transactionData} />
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Finance;
