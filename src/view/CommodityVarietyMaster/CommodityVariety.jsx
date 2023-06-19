import { createColumnHelper } from "@tanstack/react-table";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import React, { useEffect, useMemo, useState } from "react";
import { useGetCommodityVarietyMutation } from "../../features/master-api-slice";
import { Box, Flex, Switch, Text } from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";

const CommodityVariety = () => {
  const columnHelper = createColumnHelper();
  const [filter, setFilter] = useState({
    filter: [],
    search: null,
    page: 1,
    totalPage: 1,
    limit: 25,
  });

  const [
    getCommodityVariety,
    {
      error: getCommodityVarietyApiErr,
      isLoading: getCommodityVarietyApiIsLoading,
    },
  ] = useGetCommodityVarietyMutation();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "SR. NO",
    }),
    columnHelper.accessor("commodity_variety", {
      cell: (info) => info.getValue(),
      header: "Commodity variety",
    }),
    columnHelper.accessor("description", {
      cell: (info) => info.getValue(),
      header: "description",
    }),

    columnHelper.accessor("hsn_code", {
      cell: (info) => info.getValue(),
      header: "HSn code",
    }),

    columnHelper.accessor("fumigation_required", {
      header: "Fumigation required",
      cell: (info) => (
        <Box>
          <Switch
            size="md"
            colorScheme="whatsapp"
            isReadOnly
            isChecked={info.getValue()}
          />
        </Box>
      ),
    }),
    columnHelper.accessor("fumigation_day", {
      cell: (info) => info.getValue(),
      header: " Fumigation Days",
    }),
    columnHelper.accessor("lab_testing_required", {
      // cell: (info) => info.getValue(),
      header: "lab testing required",
      cell: (info) => (
        <Box>
          <Switch
            size="md"
            colorScheme="whatsapp"
            isReadOnly
            isChecked={info.getValue()}
          />
        </Box>
      ),
    }),
    columnHelper.accessor("fed", {
      cell: (info) => info.getValue(),
      header: "FED ",
    }),
    columnHelper.accessor("creation_date", {
      cell: (info) => info.getValue(),
      header: "Creation Date ",
    }),
    columnHelper.accessor("last_updated_date", {
      cell: (info) => info.getValue(),
      header: "Last Updated Date ",
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
      "COMMODITY NAME": "commodity_name",
      isActiveFilter: false,
    },
    {
      "MINIMUM BAG SIZE": "minimum_bag_size",
      isActiveFilter: false,
    },
    {
      "MAXIMUM BAG SIZE": "maximum_bag_size",
      isActiveFilter: false,
    },
    {
      "RENT ON BAG M/T": "rent_on_bag",
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
      const response = await getCommodityVariety(paramString).unwrap();

      console.log("Success:", response);
      setData(response?.results || []);
      setFilter((old) => ({
        ...old,
        totalPage: Math.ceil(response?.total / old.limit),
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
          loading={getCommodityVarietyApiIsLoading}
        />
      </div>
    </>
  );
};

export default CommodityVariety;
