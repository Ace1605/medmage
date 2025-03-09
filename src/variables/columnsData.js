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

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, Icon, useColorModeValue } from "@chakra-ui/react";

export const Userscolumns = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "EMAIL",
    accessor: "email",
  },
  {
    Header: "ROLE",
    accessor: "role",
  },
  {
    Header: "CREATED",
    accessor: "dateCreated",
  },
  {
    Header: "CREATED BY",
    accessor: "createdBy",
  },
  {
    Header: "Action",
    accessor: "action",
    disableSortBy: true,
    sortType: false,
    Cell: ({ row }) => {
      const textColor = useColorModeValue("blue.600", "white");
      return (
        <Flex gap="16px" alignItems="center">
          <Icon
            as={EditIcon}
            w="18px"
            h="18px"
            color={textColor}
            cursor="pointer"
            onClick={() => handleEdit(row.original)}
          />
          <Icon
            as={DeleteIcon}
            w="18px"
            h="18px"
            color="red.400"
            cursor="pointer"
            onClick={() => handleDelete(row.original)}
          />
        </Flex>
      );
    },
  },
];

export const columnsData1 = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "POSITION",
    accessor: "position",
  },
  {
    Header: "OFFICE",
    accessor: "office",
  },
  {
    Header: "AGE",
    accessor: "age",
  },
  {
    Header: "START DATE",
    accessor: "date",
  },
  {
    Header: "SALARY",
    accessor: "salary",
  },
];

export const columnsData2 = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
  {
    Header: "STATUS",
    accessor: "status",
  },
  {
    Header: "CUSTOMER",
    accessor: "customer",
  },
  {
    Header: "PRODUCT",
    accessor: "product",
  },
  {
    Header: "REVENUE",
    accessor: "revenue",
  },
];
