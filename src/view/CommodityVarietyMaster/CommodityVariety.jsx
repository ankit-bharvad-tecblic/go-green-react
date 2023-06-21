import { createColumnHelper } from "@tanstack/react-table";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import React, { useEffect, useMemo, useState } from "react";
import {
  useActiveDeActiveMutation,
  useGetCommodityVarietyMutation,
} from "../../features/master-api-slice";
import { Box, Flex, Switch, Text, useToast } from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setUpFilterFields } from "../../features/filter.slice";
import { API } from "../../constants/api.constants";

const CommodityVariety = () => {
  const dispatch = useDispatch();
  const filterQuery = useSelector(
    (state) => state.dataTableFiltersReducer.filterQuery
  );

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
      header: "Final expiry date",
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
            onChange={(e) => handleActiveDeActive(e, info)}
            isChecked={info.row.original.active}
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
      "COMMODITY VARIETY": "commodity_variety",
      isActiveFilter: false,
      label: "COMMODITY VARIETY",
      name: "commodity_variety",
      placeholder: "COMMODITY VARIETY",
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
      "HCN CODE": "hsn_code",
      isActiveFilter: false,
      label: "HCN CODE",
      name: "hsn_code",
      placeholder: "HCN CODE",
      type: "number",
    },
    {
      "FUMIGATION REQUIRED": "fumigation_required",
      isActiveFilter: false,
      label: "FUMIGATION REQUIRED",
      name: "fumigation_required",
      placeholder: "FUMIGATION REQUIRED",
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
      "FUMIGATION DAYS": "fumigation_day",
      isActiveFilter: false,
      label: "FUMIGATION DAYS",
      name: "fumigation_day",
      placeholder: "FUMIGATION DAYS",
      type: "number",
    },
    {
      "LAB TESTING REQUIRED": "lab_testing_required",
      isActiveFilter: false,
      label: "LAB TESTING REQUIRED",
      name: "active",
      placeholder: "LAB TESTING REQUIRED",
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
      "FINAL EXPIRY DATE": "fed",
      isActiveFilter: false,
      label: "FINAL EXPIRY DATE",
      name: "fed",
      placeholder: "FINAL EXPIRY DATE",
      type: "date",
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
      name: "created_at",
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

  const [
    activeDeActive,
    { error: activeDeActiveApiErr, isLoading: activeDeActiveApiIsLoading },
  ] = useActiveDeActiveMutation();

  const toast = useToast();

  const handleActiveDeActive = async (e, info) => {
    console.log("event --> ", e.target.checked, info);
    let obj = {
      id: info.row.original.id,
      active: e.target.checked,
      endPoint: API.DASHBOARD.COMMODITY_VARIETY_ACTIVE,
    };

    try {
      const response = await activeDeActive(obj).unwrap();

      if (response.status === 201) {
        toast({
          title: `${response.message}`,
          status: "success",
          position: "top-right",
          isClosable: true,
          duration: 2000,
        });
        let table_data = data;
        console.log("table_data", data);

        const updatedData = table_data.map((item) => {
          if (item.id === obj.id) {
            return {
              ...item,
              active: obj.active,
            };
          } else {
            return item;
          }
        });

        console.log("updatedData", updatedData);

        setData(updatedData);
        // getData();
      }

      console.log("response --> ", response);
    } catch (error) {
      console.error("Error:", error);
    }
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

      const response = await getCommodityVariety(query).unwrap();

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
