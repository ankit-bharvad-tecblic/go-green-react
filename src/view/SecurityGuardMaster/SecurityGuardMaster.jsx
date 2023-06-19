import { createColumnHelper } from "@tanstack/react-table";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import React, { useEffect, useMemo, useState } from "react";
import { useGetSecurityGuardMasterMutation } from "../../features/master-api-slice";
import { Box, Flex, Switch, Text } from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";

const SecurityGuardMaster = () => {
  const columnHelper = createColumnHelper();
  const [filter, setFilter] = useState({
    filter: [],
    search: null,
    page: 1,
    totalPage: 1,
    limit: 10,
  });

  const [
    getSecurityGuardMaster,
    {
      error: getSecurityGuardMasterApiErr,
      isLoading: getSecurityGuardMasterApiIsLoading,
    },
  ] = useGetSecurityGuardMasterMutation();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "SR. NO",
    }),
    columnHelper.accessor("security_guard_name", {
      cell: (info) => info.getValue(),
      header: "SECURITY GUARD NAME",
    }),
    columnHelper.accessor("aadhar_of_security_guard", {
      cell: (info) => info.getValue(),
      header: "AADHAR OF SECURITY GUARD",
    }),
    columnHelper.accessor("address_of_security_guard", {
      cell: (info) => info.getValue(),
      header: "ADDRESS OF SECURITY GUARD",
    }),
    columnHelper.accessor("contact_number", {
      cell: (info) => info.getValue(),
      header: "CONTACT NUMBER",
    }),

    columnHelper.accessor("experience_as_security_guard", {
      cell: (info) => info.getValue(),
      header: "EXPERIENCE AS SECURITY GUARD",
    }),

    columnHelper.accessor("security_agency_id", {
      cell: (info) => info.getValue(),
      header: "SECURITY AGENCY ID ",
    }),

    columnHelper.accessor("active", {
      // header: "ACTIVE",
      header: () => <Text id="active_col">Active</Text>,
      cell: (info) => (
        <Box id="active_row">
          <Switch
            size="md"
            colorScheme="whatsapp"
            // id="active_row"
            // isReadOnly
            // isChecked={flexRender(
            //   cell.column.columnDef.cell,
            //   cell.getContext()
            // )}
          />
        </Box>
      ),
      id: "active",
      accessorFn: (row) => row.active,
    }),
    columnHelper.accessor("update", {
      // header: "UPDATE",
      header: () => <Text id="update_col">UPDATE</Text>,
      cell: (info) => (
        <Flex justifyContent="center" color="primary.700" id="update_row">
          <BiEditAlt
            // color="#A6CE39"
            fontSize="26px"
            cursor="pointer"
          />
        </Flex>
      ),
      id: "update_col",
      accessorFn: (row) => row.update_col,
    }),
  ];

  const filterFields = [
    {
      "COMMODITY TYPE NAME": "commodity_type",
      isActiveFilter: false,
    },
    {
      DESCRIPTION: "description",
      isActiveFilter: false,
    },
  ];

  const [data, setData] = useState([]);

  let paramString = "";

  const getData = async () => {
    //params filter
    if (filter.filter.length || filter.search) {
      paramString = Object.entries(filter)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return value
              .map((item) => `${key}=${encodeURIComponent(item)}`)
              .join("&");
          }
          return `${key}=${encodeURIComponent(value)}`;
        })
        .join("&");
    }

    try {
      const response = await getSecurityGuardMaster(paramString).unwrap();

      console.log("Success:", response);
      setData(response?.results || []);
      setFilter((old) => ({
        ...old,
        totalPage: Math.ceil(response?.total / old?.limit),
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [filter.limit, filter.page]);

  useMemo(() => {
    if (filter.search !== null) {
      getData();
    }
  }, [filter.search]);

  return (
    <>
      <div>
        <FunctionalTable
          filter={filter}
          filterFields={filterFields}
          setFilter={setFilter}
          columns={columns}
          data={data}
          loading={getSecurityGuardMasterApiIsLoading}
        />
      </div>
    </>
  );
};

export default SecurityGuardMaster;
