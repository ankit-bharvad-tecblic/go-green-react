import { createColumnHelper } from "@tanstack/react-table";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import React, { useEffect, useMemo, useState } from "react";
import { useGetDistrictMasterMutation } from "../../features/master-api-slice";
import HandleError from "../../services/handleError";
import { Box, Flex, Switch, Text } from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";
import { setUpFilterFields } from "../../features/filter.slice";
import { useDispatch, useSelector } from "react-redux";

const DistrictMaster = () => {
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

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "SR. NO",
    }),
    columnHelper.accessor("district_name", {
      cell: (info) => info.getValue(),
      header: "DISTRICT NAME",
    }),
    columnHelper.accessor("state.zone.zone_name", {
      cell: (info) => info.getValue(),
      header: "ZONE NAME",
    }),
    columnHelper.accessor("created_at", {
      cell: (info) => info.getValue(),
      header: " Creation Date",
    }),
    columnHelper.accessor("updated_at", {
      cell: (info) => info.getValue(),
      header: " Last Updated Date",
    }),

    // columnHelper.accessor("state.state_code", {
    //   cell: (info) => info.getValue(),
    //   header: "STATE CODE",
    // }),
    // columnHelper.accessor("state.tin_no", {
    //   cell: (info) => info.getValue(),
    //   header: "TIN NO",
    // }),
    // columnHelper.accessor("state.gstn", {
    //   cell: (info) => info.getValue(),
    //   header: "GSTN",
    // }),
    // columnHelper.accessor("state.nav_code", {
    //   cell: (info) => info.getValue(),
    //   header: "NAV CODE",
    // }),
    // columnHelper.accessor("state.state_india_office_addr", {
    //   cell: (info) => info.getValue(),
    //   header: "OFFICE ADDRESS",
    // }),
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
      "DISTRICT NAME": "district_name",
      isActiveFilter: false,
      label: "DISTRICT NAME",
      name: "district_name",
      placeholder: "DISTRICT NAME",
      type: "text",
    },
    {
      "ZONE NAME": "state__zone__zone_name",
      isActiveFilter: false,
      label: "ZONE NAME",
      name: "state__zone__zone_name",
      placeholder: "ZONE NAME",
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

  const [
    getDistrictMaster,
    {
      error: getDistrictMasterApiErr,
      isLoading: getDistrictMasterApiIsLoading,
    },
  ] = useGetDistrictMasterMutation();

  const getData = async () => {
    //params filter
    // if (filter.filter.length || filter.search) {
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

      const response = await getDistrictMaster(query).unwrap();

      console.log("Success:", response);
      setData(response?.results || []);
      setFilter((old) => ({
        ...old,
        totalPage: Math.ceil(response?.total / old.limit),
      }));
    } catch (error) {
      console.error("Error:", error);
      HandleError({ msg: error?.data?.detail }, error.status);
    }
  };

  useEffect(() => {
    tableFilterSet();

    getData();
  }, [filter.limit, filter.page]);

  // useMemo(() => {
  //   if (filter.search !== null) {
  //     getData();
  //   }
  // }, [filter.search]);

  useMemo(() => {
    console.log("filter query", filterQuery);
    if (filterQuery) {
      getData();
    }
  }, [filterQuery]);

  return (
    <div>
      <FunctionalTable
        filter={filter}
        filterFields={filterFields}
        setFilter={setFilter}
        columns={columns}
        data={data}
        loading={getDistrictMasterApiIsLoading}
      />
    </div>
  );
};

export default DistrictMaster;
