import { createColumnHelper } from "@tanstack/react-table";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import React, { useEffect, useMemo, useState } from "react";
import {
  useActiveDeActiveMutation,
  useGetDistrictMasterMutation,
} from "../../features/master-api-slice";
import HandleError from "../../services/handleError";
import { Box, Flex, Switch, Text, useToast } from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";
import { setUpFilterFields } from "../../features/filter.slice";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../constants/api.constants";
import { useNavigate } from "react-router";
import { filterFields } from "./fields";

const DistrictMaster = () => {
  const dispatch = useDispatch();
  const filterQuery = useSelector(
    (state) => state.dataTableFiltersReducer.filterQuery
  );
  const navigate = useNavigate();

  const columnHelper = createColumnHelper();
  const [filter, setFilter] = useState({
    // filter: [],
    // search: null,
    page: 1,
    totalPage: 1,
    limit: 25, totalFilter:0 , total:0
  });

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
      endPoint: API.DASHBOARD.DISTRICT_ACTIVE,
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

  const addForm = () => {
    navigate(`/manage-location/add/district-master`);
  };

  const editForm = (info) => {
    console.log("info --> ", info);
    let editedFormId = info.row.original.id;

    navigate(`/manage-location/edit/district-master/${editedFormId}`, {
      state: { details: info.row.original },
    });
  };

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "SR. NO",
    }),
    columnHelper.accessor("district_name", {
      cell: (info) => info.getValue(),
      header: "DISTRICT NAME",
    }),
    columnHelper.accessor("zone.zone_name", {
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
            // onChange={(e) => handleActiveDeActive(e, info)}
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

      const response = await getDistrictMaster(query).unwrap();

      console.log("Success:", response);
      setData(response?.results || []);
      setFilter((old) => ({
        ...old,
        totalPage: Math.ceil(response?.total / old.limit),
total: response?.total_data,
totalFilter: response?.total
      }));
    } catch (error) {
      console.error("Error:", error);
      HandleError({ msg: error?.data?.detail }, error.status);
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
        loading={getDistrictMasterApiIsLoading}
        addForm={() => addForm()}
      />
    </div>
  );
};

export default DistrictMaster;
