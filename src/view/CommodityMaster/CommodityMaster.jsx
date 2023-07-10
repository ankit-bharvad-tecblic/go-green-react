import { createColumnHelper } from "@tanstack/react-table";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import React, { useEffect, useState } from "react";
import {
  useActiveDeActiveMutation,
  useGetCommodityMasterMutation,
} from "../../features/master-api-slice";
import { Box, Flex, Switch, Text, useToast } from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setUpFilterFields } from "../../features/filter.slice";
import { API } from "../../constants/api.constants"; 
import { useNavigate } from "react-router-dom";
import { filterFields } from "./fields";

const CommodityMaster = () => {
  const dispatch = useDispatch();
  const filterQuery = useSelector(
    (state) => state.dataTableFiltersReducer.filterQuery
  );
  console.log("CommodityMaster", filterQuery);

  const navigate = useNavigate();

  const columnHelper = createColumnHelper();
  const [filter, setFilter] = useState({
    // filter: [],
    // search: null,
    page: 1,
    totalPage: 1,
    limit: 25,
    totalFilter: 0,
    total: 0,
    excelDownload: "Commodity",
  });

  const [
    getCommodityMaster,
    {
      error: getCommodityMasterApiErr,
      isLoading: getCommodityMasterApiIsLoading,
    },
  ] = useGetCommodityMasterMutation();

  const [
    activeDeActive,
    { error: activeDeActiveApiErr, isLoading: activeDeActiveApiIsLoading },
  ] = useActiveDeActiveMutation();

  const toast = useToast();

  const handleActiveDeActive = async (e, info) => {
    console.log("event --> ", e.target.checked, info);
    let obj = {
      id: info.row.original.id,
      is_active: e.target.checked,
      endPoint: API.DASHBOARD.COMMODITY_ACTIVE,
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
    console.log("info --> ", info);
    let editedFormId = info.row.original.id;

    navigate(`/commodity-master/edit/commodity-master/${editedFormId}`, {
      state: { details: info.row.original },
    });
  };

  const addForm = () => {
    navigate(`/commodity-master/add/commodity-master/`);
  };

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "SR. NO",
    }),

    columnHelper.accessor("commodity_name", {
      cell: (info) => info.getValue(),
      header: "COMMODITY name",
    }),
    columnHelper.accessor("commodity_type.commodity_type", {
      cell: (info) => info.getValue(),
      header: "Commodity Type",
    }),
    // columnHelper.accessor("minimum_bag_size", {
    //   cell: (info) => info.getValue(),
    //   header: "Minimum bag size",
    // }),
    // columnHelper.accessor("maximum_bag_size", {
    //   cell: (info) => info.getValue(),
    //   header: "MAXIMUM BAG SIZE",
    // }),

    // columnHelper.accessor("rent_on_bag", {
    //   cell: (info) => info.getValue(),
    //   header: "Rent on bag M/T",
    // }),
    columnHelper.accessor("created_at", {
      cell: (info) => info.getValue(),
      header: "Creation Date",
    }),

    columnHelper.accessor("last_updated_date", {
      cell: (info) => info.getValue(),
      header: "LAST UPDATED DATE",
    }),
    columnHelper.accessor("is_active", {
      // header: "ACTIVE",
      header: () => <Text id="active_col" fontWeight="800">Active</Text>,
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
      header: () => <Text id="update_col" fontWeight="800">UPDATE</Text>,
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

  const getData = async () => {
    //params filter
    // filter.filter.length ||
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
      const response = await getCommodityMaster(query).unwrap();

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
          loading={getCommodityMasterApiIsLoading}
          addForm={() => addForm()}
        />
      </div>
    </>
  );
};

export default CommodityMaster;
