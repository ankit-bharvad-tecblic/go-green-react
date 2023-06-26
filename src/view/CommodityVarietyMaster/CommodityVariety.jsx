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
import { filterFields } from "./fields";
import { useNavigate } from "react-router-dom";

const CommodityVariety = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
              is_active: obj.active,
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

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "SR. NO",
    }),
    columnHelper.accessor("commodity_variety", {
      cell: (info) => info.getValue(),
      header: "Commodity variety",
    }),
    columnHelper.accessor("commodity_id", {
      cell: (info) => info.getValue(),
      header: "Commodity Id",
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
    columnHelper.accessor("is_block", {
      // cell: (info) => info.getValue(),
      header: "IS BLOCK",
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
    columnHelper.accessor("active", {
      // header: "ACTIVE",
      header: () => <Text id="active_col">Active</Text>,
      cell: (info) => (
        <Box id="active_row">
          <Switch
            size="md"
            colorScheme="whatsapp"
            onChange={(e) => handleActiveDeActive(e, info)}
            isChecked={info.row.original.is_active}
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
            onClick={() => editForm(info)}
          />
        </Flex>
      ),
      id: "update_col",
      accessorFn: (row) => row.update_col,
    }),
  ];

  const tableFilterSet = () => {
    dispatch(setUpFilterFields({ fields: filterFields }));
  };

  const [
    activeDeActive,
    { error: activeDeActiveApiErr, isLoading: activeDeActiveApiIsLoading },
  ] = useActiveDeActiveMutation();

  const toast = useToast();

  const [data, setData] = useState([]);

  let paramString = "";
  const addForm = () => {
    navigate(`/commodity-master/add/commodity-variety/`);
  };

  const editForm = (info) => {
    console.log("info --> ", info);
    let editedFormId = info.row.original.id;

    navigate(`/commodity-master/edit/commodity-variety/${editedFormId}`, {
      state: { details: info.row.original },
    });
  };

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
          addForm={() => addForm()}
        />
      </div>
    </>
  );
};

export default CommodityVariety;
