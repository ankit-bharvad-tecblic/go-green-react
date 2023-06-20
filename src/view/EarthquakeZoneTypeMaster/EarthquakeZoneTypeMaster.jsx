import React, { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import { useEffect, useState } from "react";
import { useGetEarthQuakeZoneTypeMasterMutation } from "../../features/master-api-slice";
import { Box, Flex, Switch, Text } from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setUpFilterFields } from "../../features/filter.slice";

function EarthquakeZoneTypeMaster() {
  const dispatch = useDispatch();
  const filterQuery = useSelector(
    (state) => state.dataTableFiltersReducer.filterQuery
  );
  console.log("EarthquakeZoneTypeMaster", filterQuery);
  const columnHelper = createColumnHelper();

  const [filter, setFilter] = useState({
    // filter: [],
    // search: null,
    page: 1,
    totalPage: 1,
    limit: 25,
  });

  const [
    getEarthquakeZoneTypeMaster,
    {
      error: getEarthquakeZoneTypeMasterApiErr,
      isLoading: getEarthquakeZoneTypeMasterApiIsLoading,
    },
  ] = useGetEarthQuakeZoneTypeMasterMutation();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "SR. NO",
    }),
    columnHelper.accessor("earthquake_zone_type", {
      cell: (info) => info.getValue(),
      header: "EARTH QUACK ZONE TYPE",
    }),
    columnHelper.accessor("creation_date", {
      cell: (info) => info.getValue(),
      header: "CREATION DATE",
    }),
    columnHelper.accessor("last_updated_date", {
      cell: (info) => info.getValue(),
      header: "LAST UPDATED DATE",
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
      "EARTH QUACK ZONE TYPE": "earthquake_zone_type",
      isActiveFilter: false,

      label: "EARTH QUACK ZONE TYPE",
      name: "earthquake_zone_type",
      placeholder: "EARTH QUACK ZONE TYPE",
      type: "text",
    },
    {
      "CREATION DATE": "creation_date",
      isActiveFilter: false,

      label: "CREATION DATE",
      name: "creation_date",
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

    console.log("paramString ---> ", paramString);

    try {
      let query = filterQuery ? `${paramString}&${filterQuery}` : paramString;
      const response = await getEarthquakeZoneTypeMaster(query).unwrap();
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
    <div>
      <FunctionalTable
        filter={filter}
        filterFields={filterFields}
        setFilter={setFilter}
        columns={columns}
        data={data}
        loading={getEarthquakeZoneTypeMasterApiIsLoading}
      />
    </div>
  );
}

export default EarthquakeZoneTypeMaster;
