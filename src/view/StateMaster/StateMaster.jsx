import { createColumnHelper } from "@tanstack/react-table";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import React, { useEffect, useMemo, useState } from "react";
import { useGetStateMasterMutation } from "../../features/master-api-slice";
import { Box, Flex, Switch, Text } from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";
import { setUpFilterFields } from "../../features/filter.slice";
import { useDispatch, useSelector } from "react-redux";

const StateMaster = () => {
  const dispatch = useDispatch();
  const filterQuery = useSelector(
    (state) => state.dataTableFiltersReducer.filterQuery
  );

  const columnHelper = createColumnHelper();
  const [filter, setFilter] = useState({
    // filter: [],
    // search: null,
    page: 1,
    totalPage: 1,
    limit: 25,
  });

  const [
    getStateMaster,
    { error: getStateMasterApiErr, isLoading: getStateMasterApiIsLoading },
  ] = useGetStateMasterMutation();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "SR. NO",
    }),
    columnHelper.accessor("state_name", {
      cell: (info) => info.getValue(),
      header: "STATE NAME",
    }),
    // columnHelper.accessor("state_name", {
    //   cell: (info) => info.getValue(),
    //   header: "REGION NAME",
    // }),
    columnHelper.accessor("state_code", {
      cell: (info) => info.getValue(),
      header: "STATE CODE",
    }),
    columnHelper.accessor("tin_no", {
      cell: (info) => info.getValue(),
      header: "TIN NO",
    }),
    columnHelper.accessor("gstn", {
      cell: (info) => info.getValue(),
      header: "GSTN",
    }),
    columnHelper.accessor("nav_code", {
      cell: (info) => info.getValue(),
      header: "NAV CODE",
    }),
    columnHelper.accessor("state_india_office_addr", {
      cell: (info) => info.getValue(),
      header: "Office Address",
    }),
    columnHelper.accessor("created_at", {
      cell: (info) => info.getValue(),
      header: "Creation Date",
    }),
    columnHelper.accessor("updated_at", {
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
      "STATE NAME": "state_name",
      isActiveFilter: false,
      label: "STATE NAME",
      name: "state_name",
      placeholder: "STATE NAME",
      type: "text",
    },
    // {
    //   "REGION NAME": "state_name",
    //   isActiveFilter: false,
    //   label: "REGION NAME",
    //   name: "state_name",
    //   placeholder: "REGION NAME",
    //   type: "text",
    // },
    {
      "STATE CODE": "state_code",
      isActiveFilter: false,
      label: "STATE CODE",
      name: "state_code",
      placeholder: "STATE CODE",
      type: "number",
    },
    {
      "TIN NO": "tin_no",
      isActiveFilter: false,
      label: "TIN NO",
      name: "tin_no",
      placeholder: "TIN NO",
      type: "number",
    },
    {
      GSTN: "gstn",
      isActiveFilter: false,
      label: "GSTN",
      name: "gstn",
      placeholder: "GSTN",
      type: "number",
    },
    {
      "NAV CODE": "nav_code",
      isActiveFilter: false,
      label: "NAV CODE",
      name: "nav_code",
      placeholder: "NAV CODE",
      type: "number",
    },
    {
      "OFFICE ADDRESS": "state_india_office_addr",
      isActiveFilter: false,
      label: "OFFICE ADDRESS",
      name: "state_india_office_addr",
      placeholder: "OFFICE ADDRESS",
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
  ];

  const tableFilterSet = () => {
    dispatch(setUpFilterFields({ fields: filterFields }));
  };

  const [data, setData] = useState([]);

  let paramString = "";

  const getData = async () => {
    //params filter
    // if (filter.filter.length || filter.search) {
    // if (filterQuery) {

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
    // }

    try {
      let query = filterQuery ? `${paramString}&${filterQuery}` : paramString;

      const response = await getStateMaster(query).unwrap();
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
  }, [filter.limit, filter.page, filterQuery]);

  // useMemo(() => {
  //   if (filter.search !== null) {
  //     getData();
  //   }
  // }, [filter.search]);

  // useMemo(() => {
  //   console.log("filter query", filterQuery);
  //   if (filterQuery) {
  //     getData();
  //   }
  // }, [filterQuery]);

  return (
    <div>
      <FunctionalTable
        filter={filter}
        filterFields={filterFields}
        setFilter={setFilter}
        columns={columns}
        data={data}
        loading={getStateMasterApiIsLoading}
      />
    </div>
  );
};

export default StateMaster;
