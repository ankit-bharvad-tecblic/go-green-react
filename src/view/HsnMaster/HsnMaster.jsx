import React, { useEffect, useState } from "react";
import { Box, Flex, Switch, Text, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  useActiveDeActiveMutation,
  useGetHsnMasterMutation,
} from "../../features/master-api-slice";

import { BiEditAlt } from "react-icons/bi";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import { createColumnHelper } from "@tanstack/react-table";
import { setUpFilterFields } from "../../features/filter.slice";
import { API } from "../../constants/api.constants";
import { useNavigate } from "react-router-dom";
import { filterFields } from "./fields";

const HsnMaster = () => {
  const dispatch = useDispatch();
  const columnHelper = createColumnHelper();
  const navigate = useNavigate();
  const filterQuery = useSelector(
    (state) => state.dataTableFiltersReducer.filterQuery
  );
  console.log("Hsn Master", filterQuery);
  const [filter, setFilter] = useState({
    // filter: [],
    // search: null,
    page: 1,
    totalPage: 1,
    limit: 25,
    totalFilter: 0,
    total: 0,
    excelDownload: "HSN",
  });

  const [getHsnMaster, { isLoading: getHsnMasterApiIsLoading }] =
    useGetHsnMasterMutation();

  const [activeDeActive] = useActiveDeActiveMutation();

  const toast = useToast();

  const handleActiveDeActive = async (e, info) => {
    console.log("event --> ", e.target.checked, info);
    let obj = {
      id: info.row.original.id,
      active: e.target.checked,
      endPoint: API.DASHBOARD.EMPLOYEE_MASTER_ACTIVE,
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
  const editForm = (info) => {
    console.log("hsn Master info --->", info);
    const editedFormId = info.row.original.id;
    navigate(`/commodity-master/edit/hsn-master/${editedFormId}`, {
      state: { details: info.row.original },
    });
  };
  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "SR. NO",
    }),
    columnHelper.accessor("hsn_code", {
      cell: (info) => info.getValue(),
      header: "HSN CODE",
    }),
    columnHelper.accessor("igst_perc", {
      cell: (info) => info.getValue(),
      header: " IGST%",
    }),
    columnHelper.accessor("sgst_perc", {
      cell: (info) => info.getValue(),
      header: "SGST%",
    }),
    columnHelper.accessor("cgst_perc", {
      cell: (info) => info.getValue(),
      header: "CGST%",
    }),
    columnHelper.accessor("description", {
      cell: (info) => info.getValue(),
      header: "Description",
    }),
    columnHelper.accessor("created_at", {
      cell: (info) => info.getValue(),
      header: "Creation Date",
    }),
    columnHelper.accessor("updated_at", {
      cell: (info) => info.getValue(),
      header: " Last Updated Date",
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
  const [data, setData] = useState([]);

  let paramString = "";

  const addForm = () => {
    navigate(`/commodity-master/add/hsn-master`);
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
      const response = await getHsnMaster(query).unwrap();
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
        data={data || []}
        loading={getHsnMasterApiIsLoading}
        addForm={() => addForm()}
      />
    </div>
  );
};

export default HsnMaster;
