import { createColumnHelper } from "@tanstack/react-table";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import React, { useEffect, useMemo, useState } from "react";

import { Box, Flex, Switch, Text } from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";
import { useGetWarehouseTypeMasterMutation } from "../../features/master-api-slice";
import { useDispatch, useSelector } from "react-redux";
import { setUpFilterFields } from "../../features/filter.slice";

const WarehouseTypeMaster = () => {
  const dispatch = useDispatch();

  const columnHelper = createColumnHelper();

  const filterQuery = useSelector(
    (state) => state.dataTableFiltersReducer.filterQuery
  );
  console.log("Warehouse Type Master", filterQuery);
  const [filter, setFilter] = useState({
    // filter: [],
    // search: null,
    page: 1,
    totalPage: 1,
    limit: 25,
  });

  const [
    getWarehouseTypeMaster,
    {
      error: getWarehouseTypeMasterApiErr,
      isLoading: getWarehouseTypeMasterApiIsLoading,
    },
  ] = useGetWarehouseTypeMasterMutation();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "SR. NO",
    }),
    columnHelper.accessor("warehouse_type_name", {
      cell: (info) => info.getValue(),
      header: "Warehouse Type Name",
    }),
    columnHelper.accessor("description", {
      cell: (info) => info.getValue(),
      header: "description",
    }),

    columnHelper.accessor("creation_date", {
      cell: (info) => info.getValue(),
      header: "Created date",
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
      "WAREHOUSE TYPE NAME": "warehouse_type_name",
      isActiveFilter: false,

      label: "WAREHOUSE TYPE NAME",
      name: "warehouse_type_name",
      placeholder: "WAREHOUSE TYPE NAME",
      type: "text",
    },
    {
      DESCRIPTION: "description",
      isActiveFilter: false,

      label: "DESCRIPTION",
      name: "description",
      placeholder: "DESCRIPTION",
      type: "text",
    },
    {
      "CREATION DATE": "created_at",
      isActiveFilter: false,

      label: "CREATION DATE",
      name: "created_at",
      placeholder: "CREATION DATE",
      type: "date",
    },
    {
      "LAST UPDATED DATE": "last_updated_date",
      isActiveFilter: false,

      label: "LAST UPDATED DATE",
      name: "last_updated_date",
      placeholder: "LAST UPDATED DATE",
      type: "date",
    },
    {
      "LAST UPDATED ACTIVE": "ACTIVE",
      isActiveFilter: false,

      label: "ACTIVE/DeActive",
      name: "active",
      placeholder: "Active/DeActive",
      type: "select",
      multi: false,
      options: [
        {
          label: "ACTIVE",
          value: "True",
        },
        {
          label: "DeActive",
          value: "False",
        },
      ],
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

  const tableFilterSet = () => {
    dispatch(setUpFilterFields({ fields: filterFields }));
  };
  const [data, setData] = useState([]);

  let paramString = "";

  const getData = async () => {
    //params filter
    //filter.filter.length || filter.search
    if (filterQuery) {
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
      let query = filterQuery ? `${paramString}&${filterQuery}` : paramString;
      const response = await getWarehouseTypeMaster(query).unwrap();

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
    tableFilterSet();
    getData();
  }, [filter.limit, filter.page]);

  useMemo(() => {
    if (filter.search !== null) {
      getData();
    }
  }, [filter.search]);

  useMemo(() => {
    console.log("filter query", filterQuery);
    if (filterQuery) {
      getData();
    }
  }, [filterQuery]);

  return (
    <>
      <div>
        <FunctionalTable
          filter={filter}
          filterFields={filterFields}
          setFilter={setFilter}
          columns={columns}
          data={data}
          loading={getWarehouseTypeMasterApiIsLoading}
        />
      </div>
    </>
  );
};

export default WarehouseTypeMaster;