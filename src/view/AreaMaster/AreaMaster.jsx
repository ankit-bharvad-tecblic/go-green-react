import { createColumnHelper } from "@tanstack/react-table";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import React, { useEffect, useMemo, useState } from "react";
import { useGetAreaMasterMutation } from "../../features/master-api-slice";
import { Box, Flex, Switch, Text } from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setUpFilterFields } from "../../features/filter.slice";

const AreaMaster = () => {
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
    getAreaMaster,
    { error: getAreaMasterApiErr, isLoading: getAreaMasterApiIsLoading },
  ] = useGetAreaMasterMutation();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "SR. NO",
    }),
    columnHelper.accessor("area_name", {
      cell: (info) => info.getValue(),
      header: "AREA NAME",
    }),
    columnHelper.accessor("district.district_name", {
      cell: (info) => info.getValue(),
      header: "DISTRICT NAME",
    }),
    columnHelper.accessor("earthquake_zone_type_id", {
      cell: (info) => info.getValue(),
      header: "Earthquake zone Type  ID",
    }),
    columnHelper.accessor("is_block", {
      // cell: (info) => info.getValue(),
      header: "Is Block",
      cell: (info) => (
        <Box id="active_row">
          <Switch
            size="md"
            colorScheme="whatsapp"
            isReadOnly
            isChecked={info.getValue()}
          />
        </Box>
      ),
    }),
    columnHelper.accessor("created_at", {
      cell: (info) => info.getValue(),
      header: "Creation Date",
    }),
    columnHelper.accessor("last_updated_date", {
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
      "AREA NAME": "area_name",
      isActiveFilter: false,
      label: "AREA NAME",
      name: "area_name",
      placeholder: "AREA NAME",
      type: "text",
    },
    {
      "DISTRICT NAME": "district__district_name",
      isActiveFilter: false,
      label: "DISTRICT NAME",
      name: "district__district_name",
      placeholder: "DISTRICT NAME",
      type: "text",
    },
    {
      "EARTHQUAKE ZONE TYPE ID": "earthquake_zone_type_id",
      isActiveFilter: false,
      label: "EARTHQUAKE ZONE TYPE ID",
      name: "earthquake_zone_type_id",
      placeholder: "EARTHQUAKE ZONE TYPE ID",
      type: "number",
    },
    {
      "IS BLOCK": "is_block",
      isActiveFilter: false,
      label: "IS BLOCK",
      name: "is_block",
      placeholder: "IS BLOCK",
      type: "select",
      multi: false,
      options: [
        {
          label: "ACTIVE",
          value: "True",
        },
        {
          label: "DEACTIVE",
          value: "False",
        },
      ],
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

      const response = await getAreaMaster(query).unwrap();

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
        loading={getAreaMasterApiIsLoading}
      />
    </div>
  );
};

export default AreaMaster;

// zone, state, disrct , area,
