import { createColumnHelper } from "@tanstack/react-table";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import React, { useEffect, useMemo, useState } from "react";
import { useGetAreaMasterMutation } from "../../features/master-api-slice";
import { Box, Flex, Switch, Text } from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";

const AreaMaster = () => {
  const columnHelper = createColumnHelper();
  const [filter, setFilter] = useState({
    filter: [],
    search: null,
    page: 1,
    totalPage: 1,
    limit: 10,
  });

  const [
    getAreaMaster,
    { error: getAreaMasterApiErr, isLoading: getAreaMasterApiIsLoading },
  ] = useGetAreaMasterMutation();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "SR. NO",
    }),
    columnHelper.accessor("cluster_name", {
      cell: (info) => info.getValue(),
      header: "AREA NAME",
    }),
    columnHelper.accessor("district.district_name", {
      cell: (info) => info.getValue(),
      header: "DISTRICT NAME",
    }),
    columnHelper.accessor("district.district_name", {
      cell: (info) => info.getValue(),
      header: "Earthquake zone Type  ID",
    }),
    columnHelper.accessor("district.district_name", {
      cell: (info) => info.getValue(),
      header: "Is Block",
    }),
    columnHelper.accessor("created_at", {
      cell: (info) => info.getValue(),
      header: "Creation Date",
    }),
    columnHelper.accessor("district.updated_at", {
      cell: (info) => info.getValue(),
      header: "Last Updated Date",
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
      "DISTRICT NAME": "district__district_name",
      isActiveFilter: false,
    },
    {
      "AREA NAME": "cluster_name",
      isActiveFilter: false,
    },
  ];

  const [data, setData] = useState([]);

  let paramString = "";

  const getData = async () => {
    //params filter
    if (filter.filter.length || filter.search || filter.limit) {
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
      const response = await getAreaMaster(paramString).unwrap();

      console.log("Success:", response);
      setData(response?.results || []);
      setFilter((old) => ({
        ...old,
        totalPage: Math.ceil(response?.total / old.limit),
      }));

      console.log(Math.ceil(response?.total / filter.limit), "length");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // test

  useEffect(() => {
    getData();
  }, [filter.limit, filter.page]);

  useMemo(() => {
    if (filter.search !== null) {
      getData();
    }
  }, [filter.search]);

  return (
    <div>
      <FunctionalTable
        filter={filter}
        filterFields={filterFields}
        setFilter={setFilter}
        columns={columns}
        data={data}
        loading={getAreaMasterApiIsLoading}
      />
    </div>
  );
};

export default AreaMaster;

// zone, state, disrct , area,
