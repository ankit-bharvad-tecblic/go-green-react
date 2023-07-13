import { createColumnHelper } from "@tanstack/react-table";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import React, { useEffect, useState } from "react";
import {
  useActiveDeActiveMutation,
  useGetUserMasterMutation,
} from "../../features/master-api-slice";
import { Box, Flex, Switch, Text, useToast } from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setUpFilterFields } from "../../features/filter.slice";
import { API } from "../../constants/api.constants";
import { filterFields } from "./fields";
import { useNavigate } from "react-router-dom";

const UserMaster = () => {
  const dispatch = useDispatch();
  const columnHelper = createColumnHelper();
  const navigate = useNavigate();
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
    totalFilter: 0,
    total: 0,
    excelDownload: "User",
  });

  const [getUserMaster, { isLoading: getUserMasterApiIsLoading }] =
    useGetUserMasterMutation();

  const [activeDeActive] = useActiveDeActiveMutation();

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
    columnHelper.accessor("employee_name", {
      cell: (info) => info.getValue(),
      header: "FULL NAME",
    }),
    columnHelper.accessor("email", {
      cell: (info) => info.getValue(),
      header: "USER NAME (EMAIL)",
    }),
    columnHelper.accessor("address", {
      cell: (info) => info.getValue(),
      header: "Address ",
    }),
    columnHelper.accessor("pin_code", {
      cell: (info) => info.getValue(),
      header: " Pin Code ",
    }),
    columnHelper.accessor("phone", {
      cell: (info) => info.getValue(),
      header: "CONTACT NO",
    }),

    // columnHelper.accessor("region_id.region_name", {
    //   cell: (info) => info.getValue(),
    //   header: "Region",
    // }),
    // columnHelper.accessor("state_id.state_name", {
    //   cell: (info) => info.getValue(),
    //   header: "State ",
    // }),
    // columnHelper.accessor("zone_id.zone_name", {
    //   cell: (info) => info.getValue(),
    //   header: "Zone ",
    // }),
    // columnHelper.accessor("district_id.district_name", {
    //   cell: (info) => info.getValue(),
    //   header: "District ",
    // }),
    // columnHelper.accessor("area.area_name", {
    //   cell: (info) => info.getValue(),
    //   header: "Area ",
    // }),

    columnHelper.accessor("user_role", {
      header: "ROLE",
      cell: (info) => {
        const userRoles = info.row.original.user_role;

        if (userRoles && userRoles.length > 0) {
          const roleNames = userRoles.map((role) => role.role_name);
          console.log(roleNames.join(", "), "here");
          return roleNames.join(", ");
        }
        return "N/A";
      },
    }),
    columnHelper.accessor("reporting_manager.employee_name", {
      cell: (info) => info.getValue(),
      header: "Reporting Manager",
    }),

    // columnHelper.accessor("last_login", {
    //   cell: (info) => info.getValue(),
    //   header: "LAST LOGIN",
    // }),
    columnHelper.accessor("created_at", {
      cell: (info) => info.getValue(),
      header: "CREATION DATE",
    }),
    columnHelper.accessor("updated_at", {
      cell: (info) => info.getValue(),
      header: "LAST UPDATED DATE",
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

  const params = {
    filter: [],
    search: "",
  };

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
      const response = await getUserMaster(query).unwrap();
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

  const addForm = () => {
    navigate(`/manage-users/add/user-master/`);
  };

  const editForm = (info) => {
    console.log("User info --->", info);
    const editedFormId = info.row.original.id;
    navigate(`/manage-users/edit/user-master/${editedFormId}`, {
      state: { details: info.row.original },
    });
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
        loading={getUserMasterApiIsLoading}
        addForm={() => addForm()}
      />
    </div>
  );
};

export default UserMaster;
