import React, { useEffect, useState } from "react";
import { Box, Flex, Switch, Text, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  useActiveDeActiveMutation,
  useGetCommodityBagMasterMutation,
} from "../../features/master-api-slice";

import { BiEditAlt } from "react-icons/bi";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import { createColumnHelper } from "@tanstack/react-table";
import { setUpFilterFields } from "../../features/filter.slice";
import { API } from "../../constants/api.constants";
import { useNavigate } from "react-router-dom";
import { filterFields } from "./fields";

const CommodityBagMaster = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filterQuery = useSelector(
    (state) => state.dataTableFiltersReducer.filterQuery
  );
  const columnHelper = createColumnHelper();
  console.log("Commodity Bag Master", filterQuery);
  const [filter, setFilter] = useState({
    // filter: [],
    // search: null,
    page: 1,
    totalPage: 1,
    limit: 25,
    totalFilter: 0,
    total: 0,
    excelDownload: "CommodityBag",
  });

  const [
    getCommodityBagMaster,
    { isLoading: getCommodityBagMasterApiIsLoading },
  ] = useGetCommodityBagMasterMutation();

  const [activeDeActive] = useActiveDeActiveMutation();

  const handleActiveDeActive = async (e, info) => {
    console.log("event --> ", e.target.checked, info);
    let obj = {
      id: info.row.original.id,
      active: e.target.checked,
      endPoint: API.DASHBOARD.COMMODITY_BAG_MASTER,
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

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "SR. NO",
    }),
    columnHelper.accessor("commodity_id.commodity_type", {
      cell: (info) => info.getValue(),
      header: "Commodity Type",
    }),
    columnHelper.accessor("commodity_id.commodity_name", {
      cell: (info) => info.getValue(),
      header: "Commodity Name",
    }),
    columnHelper.accessor("bag_size", {
      cell: (info) => info.getValue(),
      header: "Bag Size",
    }),
    columnHelper.accessor("tolerance_level ", {
      cell: (info) => info.getValue(),
      header: "Tolerance Size",
    }),
    columnHelper.accessor("space ", {
      cell: (info) => info.getValue(),
      header: "Space / bag / sq. ft",
    }),

    columnHelper.accessor("stack_height ", {
      cell: (info) => info.getValue(),
      header: "Stack height",
    }),

    columnHelper.accessor("created_at", {
      cell: (info) => info.getValue(),
      header: "Creation Date",
    }),
    columnHelper.accessor("last_updated_date", {
      cell: (info) => info.getValue(),
      header: "Last Updated Date",
    }),
    columnHelper.accessor("is_active", {
      // header: "ACTIVE",
      header: () => (
        <Text id="active_col" fontWeight="800">
          Active
        </Text>
      ),
      cell: (info) => (
        <Box id="active_row">
          <Switch
            size="md"
            colorScheme="whatsapp"
            // onChange={(e) => handleActiveDeActive(e, info)}
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
      header: () => (
        <Text id="update_col" fontWeight="800">
          UPDATE
        </Text>
      ),
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

  const toast = useToast();
  const [data, setData] = useState([]);

  let paramString = "";
  const addForm = () => {
    navigate(`/commodity-master/add/commodity-bag-master/`);
  };

  const editForm = (info) => {
    console.log("info --> ", info);
    let editedFormId = info.row.original.id;

    navigate(`/commodity-master/edit/commodity-bag-master/${editedFormId}`, {
      state: { details: info.row.original },
    });
  };
  const getData = async () => {
    //params filter
    //filter.filter.length || filter.search
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

    console.log("paramString ---> ", paramString);

    try {
      const query = filterQuery ? `${paramString}&${filterQuery}` : paramString;
      const response = await getCommodityBagMaster(query).unwrap();
      console.log("Success:", response);
      setData(response?.results || []);
      setFilter((old) => ({
        ...old,
        totalPage: Math.ceil(response?.total / old.limit),
        total: response?.total_data,
        totalFilter: response?.total,
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    tableFilterSet();
    getData();
  }, [filter.limit, filter.page, filterQuery]);
  return (
    <div>
      <FunctionalTable
        filter={filter}
        filterFields={filterFields}
        setFilter={setFilter}
        columns={columns}
        data={data}
        loading={getCommodityBagMasterApiIsLoading}
        addForm={() => addForm()}
      />
    </div>
  );
};

export default CommodityBagMaster;
