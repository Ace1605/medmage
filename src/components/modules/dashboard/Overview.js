import {
  Box,
  Flex,
  Icon,
  SimpleGrid,
  Skeleton,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import IconBox from "components/Icons/IconBox";
import { useGetOverview } from "hooks/api/dashboard/useGetOverview";
import { FaUser } from "react-icons/fa6";
import { toast } from "sonner";

function Overview({ token }) {
  const textColor = useColorModeValue("gray.700", "white");
  const { data, error, isLoading } = useGetOverview(token);
  if (error) toast.error("Unable to get overview data, please refresh");

  return (
    <SimpleGrid columns={{ sm: 1, md: 2 }} spacing="24px" mb="30px">
      <Card minH="125px">
        {isLoading ? (
          <Box p={1}>
            <Skeleton
              borderRadius="md"
              height="125px"
              width="100%"
              isLoaded={!isLoading}
            />
          </Box>
        ) : (
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
                  Active Users
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                    {data?.activeUsers}
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox bg="#fff" w="50px" h="50px">
                <Icon as={FaUser} w="25px" h="25px" color="blue.900" />
              </IconBox>
            </Flex>
            <Text color="gray.400" fontSize="sm">
              <Text as="span" color="green.400" fontWeight="bold">
                +5.2%{" "}
              </Text>
              Since last month
            </Text>
          </Flex>
        )}
      </Card>
      <Card minH="125px">
        {isLoading ? (
          <Box p={1}>
            <Skeleton
              borderRadius="md"
              height="125px"
              width="100%"
              isLoaded={!isLoading}
            />
          </Box>
        ) : (
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
                  Patients
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                    {data?.patieceCount}
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox bg="#fff" w="50px" h="50px">
                <Icon as={FaUser} w="25px" h="25px" color="blue.900" />
              </IconBox>
            </Flex>
            <Text color="gray.400" fontSize="sm">
              <Text as="span" color="green.400" fontWeight="bold">
                +3.48%{" "}
              </Text>
              Since last month
            </Text>
          </Flex>
        )}
      </Card>
      {/* <Card minH="125px">
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
                Medical Institutions
              </StatLabel>
              <Flex>
                <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                  +2,503
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
      </Card> */}
      {/* <Card minH="125px">
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
                Patients
              </StatLabel>
              <Flex>
                <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                  17,000
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
      </Card> */}
      {/* <Card minH="125px">
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
                Medical Personnel
              </StatLabel>
              <Flex>
                <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                  3000
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
      </Card> */}
    </SimpleGrid>
  );
}
export default Overview;
