import { createColumnHelper } from "@tanstack/react-table";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import React, { useEffect, useMemo, useState } from "react";
import {
  useActiveDeActiveMutation,
  useGetUserMasterMutation,
} from "../../features/master-api-slice";
import { Box, Flex, Switch, Text, useToast } from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setUpFilterFields } from "../../features/filter.slice";
import { API } from "../../constants/api.constants";

const UserMaster = () => {
  const dispatch = useDispatch();

  const columnHelper = createColumnHelper();

  const filterQuery = useSelector(
    (state) => state.dataTableFiltersReducer.filterQuery
  );
  console.log("User Master", filterQuery);

  const [filter, setFilter] = useState({
    // filter: [],
    // search: null,
    page: 1,
    totalPage: 1,
    limit: 25,
  });

  const [
    getStateMaster,
    { error: getUserMasterApiErr, isLoading: getUserMasterApiIsLoading },
  ] = useGetUserMasterMutation();

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
      endPoint: API.DASHBOARD.USER_MASTER_ACTIVE,
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
    columnHelper.accessor("email", {
      cell: (info) => info.getValue(),
      header: "USER NAME",
    }),
    columnHelper.accessor("first_name", {
      cell: (info) => info.getValue(),
      header: "FULL NAME",
    }),
    columnHelper.accessor("phone", {
      cell: (info) => info.getValue(),
      header: "CONTACT NO",
    }),
    columnHelper.accessor("user_role", {
      cell: (info) => info.getValue(),
      header: "ROLE",
    }),
    columnHelper.accessor("last_login", {
      cell: (info) => info.getValue(),
      header: "LAST LOGIN",
    }),
    columnHelper.accessor("created_at", {
      cell: (info) => info.getValue(),
      header: "CREATION DATE",
    }),
    columnHelper.accessor("updated_at", {
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
      "USER NAME": "email",
      isActiveFilter: false,

      label: "USER NAME",
      name: "email",
      placeholder: "USER NAME",
      type: "text",
    },
    {
      "FULL NAME": "first_name",
      isActiveFilter: false,

      label: "FULL NAME",
      name: "first_name",
      placeholder: "FULL NAME",
      type: "text",
    },
    {
      "CONTACT NO": "phone",
      isActiveFilter: false,

      label: "CONTACT NO",
      name: "phone",
      placeholder: "CONTACT NO",
      type: "number",
    },
    {
      ROLE: "user_role",
      isActiveFilter: false,

      label: "ROLE",
      name: "user_role",
      placeholder: "ROLE",
      type: "number",
    },
    {
      "LAST LOGIN": "last_login",
      isActiveFilter: false,

      label: "LAST LOGIN",
      name: "last_login",
      placeholder: "LAST LOGIN",
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
      "LAST UPDATED DATE": "updated_at",
      isActiveFilter: false,

      label: "LAST UPDATED DATE",
      name: "updated_at",
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

    try {
      const query = filterQuery ? `${paramString}&${filterQuery}` : paramString;
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
  }, [filter.limit, filter.page]);

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
        loading={getUserMasterApiIsLoading}
      />
    </div>
  );
};

export default UserMaster;
