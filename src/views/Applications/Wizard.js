/*!

=========================================================
* Argon Dashboard Chakra PRO - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-chakra-pro
* Copyright 2022 Creative Tim (https://www.creative-tim.com/)

* Designed and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Icon,
  Input,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import avatar4 from 'assets/img/avatars/avatar4.png';
// Custom components
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import IconBox from 'components/Icons/IconBox';
import { RocketIcon } from 'components/Icons/Icons';
import React, { useRef, useState } from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { BsCircleFill } from 'react-icons/bs';
import { FaCube } from 'react-icons/fa';
import { MdModeEdit } from 'react-icons/md';

function Wizard() {
  const textColor = useColorModeValue('gray.700', 'white');
  const bgPrevButton = useColorModeValue('gray.100', 'gray.100');
  const iconColor = useColorModeValue('gray.300', 'gray.700');
  const [activeBullets, setActiveBullets] = useState({
    about: true,
    account: false,
    address: false,
  });

  const [checkboxes, setCheckboxes] = useState({
    design: false,
    code: false,
    develop: false,
  });

  const aboutTab = useRef();
  const accountTab = useRef();
  const addressTab = useRef();

  return (
    <Flex
      direction='column'
      minH='100vh'
      align='center'
      pt={{ sm: '125px', lg: '75px' }}
    >
      <Flex
        direction='column'
        textAlign='center'
        mb={{ sm: '25px', md: '45px' }}
      >
        <Text
          color={textColor}
          fontSize={{ sm: '2xl', md: '3xl', lg: '4xl' }}
          fontWeight='bold'
          mb='8px'
        >
          Build your profile
        </Text>
        <Text
          color='gray.400'
          fontWeight='normal'
          fontSize={{ sm: 'sm', md: 'lg' }}
        >
          This information will let us know more about you.
        </Text>
      </Flex>
      <Tabs variant='unstyled' mt='24px' display='flex' flexDirection='column'>
        <TabList
          display='flex'
          align='center'
          alignSelf='center'
          justifySelf='center'
        >
          <Tab
            ref={aboutTab}
            _focus={{}}
            w={{ sm: '120px', md: '250px', lg: '300px' }}
            onClick={() =>
              setActiveBullets({
                about: true,
                account: false,
                address: false,
              })
            }
          >
            <Flex
              direction='column'
              justify='center'
              align='center'
              position='relative'
              _before={{
                content: "''",
                width: { sm: '120px', md: '250px', lg: '300px' },
                height: '3px',
                bg: activeBullets.account ? 'white' : 'blue.300',
                left: { sm: '12px', md: '30px' },
                top: {
                  sm: activeBullets.about ? '6px' : '4px',
                  md: null,
                },
                position: 'absolute',
                bottom: activeBullets.about ? '40px' : '38px',

                transition: 'all .3s ease',
              }}
            >
              <Icon
                zIndex='1'
                as={BsCircleFill}
                color={activeBullets.about ? 'white' : 'blue.300'}
                w={activeBullets.about ? '16px' : '12px'}
                h={activeBullets.about ? '16px' : '12px'}
                mb='8px'
              />
              <Text
                color={activeBullets.about ? 'white' : 'gray.300'}
                fontWeight={activeBullets.about ? 'bold' : 'normal'}
                display={{ sm: 'none', md: 'block' }}
              >
                About
              </Text>
            </Flex>
          </Tab>
          <Tab
            ref={accountTab}
            _focus={{}}
            w={{ sm: '120px', md: '250px', lg: '300px' }}
            onClick={() =>
              setActiveBullets({
                about: true,
                account: true,
                address: false,
              })
            }
          >
            <Flex
              direction='column'
              justify='center'
              align='center'
              position='relative'
              _before={{
                content: "''",
                width: { sm: '120px', md: '250px', lg: '300px' },
                height: '3px',
                bg: activeBullets.address ? 'white' : 'blue.300',
                left: { sm: '12px', md: '32px' },
                top: {
                  sm: activeBullets.account ? '6px' : '4px',
                  md: null,
                },
                position: 'absolute',
                bottom: activeBullets.account ? '40px' : '38px',

                transition: 'all .3s ease',
              }}
            >
              <Icon
                zIndex='1'
                as={BsCircleFill}
                color={activeBullets.account ? 'white' : 'blue.300'}
                w={activeBullets.account ? '16px' : '12px'}
                h={activeBullets.account ? '16px' : '12px'}
                mb='8px'
              />
              <Text
                color={activeBullets.account ? 'white' : 'gray.300'}
                fontWeight={activeBullets.account ? 'bold' : 'normal'}
                display={{ sm: 'none', md: 'block' }}
              >
                Account
              </Text>
            </Flex>
          </Tab>
          <Tab
            ref={addressTab}
            _focus={{}}
            w={{ sm: '120px', md: '250px', lg: '300px' }}
            onClick={() =>
              setActiveBullets({
                about: true,
                account: true,
                address: true,
              })
            }
          >
            <Flex
              direction='column'
              justify='center'
              align='center'
              position='relative'
            >
              <Icon
                zIndex='1'
                as={BsCircleFill}
                color={activeBullets.address ? 'white' : 'blue.300'}
                w={activeBullets.address ? '16px' : '12px'}
                h={activeBullets.address ? '16px' : '12px'}
                mb='8px'
              />
              <Text
                color={activeBullets.address ? 'white' : 'gray.300'}
                fontWeight={activeBullets.address ? 'bold' : 'normal'}
                display={{ sm: 'none', md: 'block' }}
              >
                Address
              </Text>
            </Flex>
          </Tab>
        </TabList>
        <TabPanels mt='24px' maxW={{ md: '90%', lg: '100%' }} mx='auto'>
          <TabPanel w={{ sm: '330px', md: '700px', lg: '850px' }} mx='auto'>
            <Card>
              <CardHeader mb='40px'>
                <Flex
                  direction='column'
                  align='center'
                  justify='center'
                  textAlign='center'
                  w='80%'
                  mx='auto'
                >
                  <Text
                    color={textColor}
                    fontSize='lg'
                    fontWeight='bold'
                    mb='4px'
                  >
                    Let's start with the basic information
                  </Text>
                  <Text color='gray.400' fontWeight='normal' fontSize='sm'>
                    Let us know your name and email address. Use an address you
                    don't mind other users contacting you at
                  </Text>
                </Flex>
              </CardHeader>
              <CardBody>
                <Flex direction='column' w='100%'>
                  <Flex
                    direction={{ sm: 'column', md: 'row' }}
                    w='100%'
                    mb='24px'
                  >
                    <Box
                      position='relative'
                      minW={{ sm: '110px', xl: '150px' }}
                      h={{ sm: '110px', xl: '150px' }}
                      mx={{ sm: 'auto', md: '40px', xl: '85px' }}
                      mb={{ sm: '25px' }}
                    >
                      <Avatar
                        src={avatar4}
                        w='100%'
                        h='100%'
                        borderRadius='12px'
                      />
                      <IconBox
                        bg='#fff'
                        h='35px'
                        w='35px'
                        boxShadow='0px 3.5px 5.5px rgba(0, 0, 0, 0.06)'
                        position='absolute'
                        right='-10px'
                        bottom='-10px'
                        cursor='pointer'
                      >
                        <Icon as={MdModeEdit} w='15px' h='15px' color='#333' />
                      </IconBox>
                    </Box>
                    <Stack direction='column' spacing='20px' w='100%'>
                      <FormControl>
                        <FormLabel
                          color={textColor}
                          fontSize='xs'
                          fontWeight='bold'
                        >
                          First Name
                        </FormLabel>
                        <Input
                          variant='main'
                          placeholder='eg. Michael'
                          fontSize='xs'
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel
                          color={textColor}
                          fontSize='xs'
                          fontWeight='bold'
                        >
                          Last Name
                        </FormLabel>
                        <Input
                          variant='main'
                          placeholder='eg. Jackson'
                          fontSize='xs'
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel
                          color={textColor}
                          fontSize='xs'
                          fontWeight='bold'
                        >
                          Email Address
                        </FormLabel>
                        <Input
                          variant='main'
                          placeholder='eg. example@address.com'
                          fontSize='xs'
                        />
                      </FormControl>
                    </Stack>
                  </Flex>
                  <Button
                    variant='dark'
                    alignSelf='flex-end'
                    mt='24px'
                    w={{ sm: '75px', lg: '100px' }}
                    h='35px'
                    onClick={() => accountTab.current.click()}
                  >
                    <Text fontSize='xs' color='#fff' fontWeight='bold'>
                      NEXT
                    </Text>
                  </Button>
                </Flex>
              </CardBody>
            </Card>
          </TabPanel>
          <TabPanel w={{ sm: '330px', md: '700px', lg: '850px' }} mx='auto'>
            <Card>
              <CardHeader mb='40px'>
                <Flex
                  direction='column'
                  align='center'
                  justify='center'
                  textAlign='center'
                  w='80%'
                  mx='auto'
                >
                  <Text
                    color={textColor}
                    fontSize='lg'
                    fontWeight='bold'
                    mb='4px'
                  >
                    What are you doing? (checkboxes)
                  </Text>
                  <Text color='gray.400' fontWeight='normal' fontSize='sm'>
                    Give us more details about you. What do you enjoy doing in
                    your spare time?
                  </Text>
                </Flex>
              </CardHeader>
              <CardBody>
                <Flex direction='column' w='100%'>
                  <Stack
                    direction={{ sm: 'column', md: 'row' }}
                    spacing={{ sm: '20px', lg: '35px' }}
                    alignSelf='center'
                    justifySelf='center'
                    mb='24px'
                  >
                    <Flex direction='column' align='center'>
                      <FormLabel w='150px' h='150px' cursor='pointer' mb='16px'>
                        <Flex
                          w='100%'
                          h='100%'
                          borderRadius='8px'
                          justify='center'
                          transition='.5s all ease'
                          border={
                            checkboxes.design ? 'none' : '1px solid lightgray'
                          }
                          align='center'
                          bg={checkboxes.design ? 'blue.500' : '#fff'}
                          _hover={{ opacity: '0.8' }}
                        >
                          <Checkbox
                            onChange={() =>
                              setCheckboxes((prevCheckboxes) => {
                                return {
                                  ...prevCheckboxes,
                                  design: !prevCheckboxes.design,
                                };
                              })
                            }
                            display='none'
                          />
                          <Icon
                            as={AiFillSetting}
                            w='54px'
                            h='54px'
                            color={checkboxes.design ? '#fff' : iconColor}
                          />
                        </Flex>
                      </FormLabel>
                      <Text color={textColor} fontWeight='bold' fontSize='md'>
                        Design
                      </Text>
                    </Flex>
                    <Flex direction='column' align='center'>
                      <FormLabel w='150px' h='150px' cursor='pointer' mb='16px'>
                        <Flex
                          w='100%'
                          h='100%'
                          borderRadius='8px'
                          justify='center'
                          transition='.5s all ease'
                          border={
                            checkboxes.code ? 'none' : '1px solid lightgray'
                          }
                          align='center'
                          bg={checkboxes.code ? 'blue.500' : '#fff'}
                          _hover={{ opacity: '0.8' }}
                        >
                          <Checkbox
                            onChange={() =>
                              setCheckboxes((prevCheckboxes) => {
                                return {
                                  ...prevCheckboxes,
                                  code: !prevCheckboxes.code,
                                };
                              })
                            }
                            display='none'
                          />
                          <Icon
                            as={FaCube}
                            w='54px'
                            h='54px'
                            color={checkboxes.code ? '#fff' : iconColor}
                          />
                        </Flex>
                      </FormLabel>
                      <Text color={textColor} fontWeight='bold' fontSize='md'>
                        Code
                      </Text>
                    </Flex>
                    <Flex direction='column' align='center'>
                      <FormLabel w='150px' h='150px' cursor='pointer' mb='16px'>
                        <Flex
                          w='100%'
                          h='100%'
                          borderRadius='8px'
                          justify='center'
                          transition='.5s all ease'
                          border={
                            checkboxes.develop ? 'none' : '1px solid lightgray'
                          }
                          align='center'
                          bg={checkboxes.develop ? 'blue.500' : '#fff'}
                          _hover={{ opacity: '0.8' }}
                        >
                          <Checkbox
                            onChange={() =>
                              setCheckboxes((prevCheckboxes) => {
                                return {
                                  ...prevCheckboxes,
                                  develop: !prevCheckboxes.develop,
                                };
                              })
                            }
                            display='none'
                          />
                          <Icon
                            as={RocketIcon}
                            w='54px'
                            h='54px'
                            color={checkboxes.develop ? '#fff' : iconColor}
                          />
                        </Flex>
                      </FormLabel>
                      <Text color={textColor} fontWeight='bold' fontSize='md'>
                        Develop
                      </Text>
                    </Flex>
                  </Stack>

                  <Flex justify='space-between'>
                    <Button
                      variant='no-effects'
                      bg={bgPrevButton}
                      alignSelf='flex-end'
                      mt='24px'
                      w={{ sm: '75px', lg: '100px' }}
                      h='35px'
                      onClick={() => aboutTab.current.click()}
                    >
                      <Text fontSize='xs' color='gray.700' fontWeight='bold'>
                        PREV
                      </Text>
                    </Button>
                    <Button
                      variant='dark'
                      alignSelf='flex-end'
                      mt='24px'
                      w={{ sm: '75px', lg: '100px' }}
                      h='35px'
                      onClick={() => addressTab.current.click()}
                    >
                      <Text fontSize='xs' color='#fff' fontWeight='bold'>
                        NEXT
                      </Text>
                    </Button>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          </TabPanel>
          <TabPanel w={{ sm: '330px', md: '700px', lg: '850px' }} mx='auto'>
            <Card>
              <CardHeader mb='40px'>
                <Flex
                  direction='column'
                  align='center'
                  justify='center'
                  textAlign='center'
                  w='80%'
                  mx='auto'
                >
                  <Text
                    color={textColor}
                    fontSize='lg'
                    fontWeight='bold'
                    mb='4px'
                  >
                    Are you living in a nice area?
                  </Text>
                  <Text color='gray.400' fontWeight='normal' fontSize='sm'>
                    One thing I love about the later sunsets is the chance to go
                    for a walk through the neighborhood woods before dinner
                  </Text>
                </Flex>
              </CardHeader>
              <CardBody>
                <Flex direction='column' w='100%'>
                  <Stack direction='column' spacing='20px'>
                    <FormControl>
                      <FormLabel
                        color={textColor}
                        fontWeight='bold'
                        fontSize='xs'
                      >
                        Address 1
                      </FormLabel>
                      <Input
                        variant='main'
                        placeholder='eg. Street 120'
                        fontSize='xs'
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel
                        color={textColor}
                        fontWeight='bold'
                        fontSize='xs'
                      >
                        Address 2
                      </FormLabel>
                      <Input
                        variant='main'
                        placeholder='eg. Street 220'
                        fontSize='xs'
                      />
                    </FormControl>
                    <Grid
                      templateColumns={{ sm: '1fr 1fr', lg: '2fr 1fr 1fr' }}
                      gap='30px'
                    >
                      <FormControl gridColumn={{ sm: '1 / 3', lg: 'auto' }}>
                        <FormLabel
                          color={textColor}
                          fontWeight='bold'
                          fontSize='xs'
                        >
                          City
                        </FormLabel>
                        <Input
                          variant='main'
                          placeholder='eg. Tokyo'
                          fontSize='xs'
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel
                          color={textColor}
                          fontWeight='bold'
                          fontSize='xs'
                        >
                          State
                        </FormLabel>
                        <Input variant='main' placeholder='...' fontSize='xs' />
                      </FormControl>
                      <FormControl>
                        <FormLabel
                          color={textColor}
                          fontWeight='bold'
                          fontSize='xs'
                        >
                          ZIP
                        </FormLabel>
                        <Input
                          variant='main'
                          placeholder='7 letters'
                          fontSize='xs'
                        />
                      </FormControl>
                    </Grid>
                  </Stack>
                  <Flex justify='space-between'>
                    <Button
                      variant='no-effects'
                      bg={bgPrevButton}
                      alignSelf='flex-end'
                      mt='24px'
                      w={{ sm: '75px', lg: '100px' }}
                      h='35px'
                      onClick={() => accountTab.current.click()}
                    >
                      <Text fontSize='xs' color='gray.700' fontWeight='bold'>
                        PREV
                      </Text>
                    </Button>
                    <Button
                      variant='dark'
                      alignSelf='flex-end'
                      mt='24px'
                      w={{ sm: '75px', lg: '100px' }}
                      h='35px'
                    >
                      <Text fontSize='xs' color='#fff' fontWeight='bold'>
                        SEND
                      </Text>
                    </Button>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default Wizard;
