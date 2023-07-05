import { createColumnHelper } from "@tanstack/react-table";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import React, { useEffect, useMemo, useState } from "react";
import {
  useActiveDeActiveMutation,
  useGetSecurityGuardMasterMutation,
} from "../../features/master-api-slice";
import { Box, Flex, Switch, Text, useToast } from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setUpFilterFields } from "../../features/filter.slice";
import { API } from "../../constants/api.constants";
import { filterFields } from "./fields";
import { useNavigate } from "react-router-dom";

const SecurityGuardMaster = () => {
  const dispatch = useDispatch();
  const filterQuery = useSelector(
    (state) => state.dataTableFiltersReducer.filterQuery
  );
  console.log("SecurityGuradMaster", filterQuery);

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
    getSecurityGuardMaster,
    {
      error: getSecurityGuardMasterApiErr,
      isLoading: getSecurityGuardMasterApiIsLoading,
    },
  ] = useGetSecurityGuardMasterMutation();
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
      endPoint: API.DASHBOARD.SECURITY_GUARD_ACTIVE,
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

    navigate(
      `/security-guard-master/edit/security-guard-master/${editedFormId}`,
      {
        state: { details: info.row.original },
      }
    );
  };

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "SR. NO",
    }),
    columnHelper.accessor("security_guard_name", {
      cell: (info) => info.getValue(),
      header: "NAME",
    }),
    columnHelper.accessor("security_agency_id.security_agency_name", {
      cell: (info) => info.getValue(),
      header: "AGENCY NAME",
    }),
    columnHelper.accessor("region.region_name", {
      cell: (info) => info.getValue(),
      header: "REGION NAME",
    }),
    columnHelper.accessor("state.state_name", {
      cell: (info) => info.getValue(),
      header: "STATE NAME",
    }),
    columnHelper.accessor("district.district_name", {
      cell: (info) => info.getValue(),
      header: "DISTRICT NAME",
    }),
    columnHelper.accessor("address_of_security_guard", {
      cell: (info) => info.getValue(),
      header: "ADDRESS",
    }),
    columnHelper.accessor("aadhar_of_security_guard", {
      cell: (info) => info.getValue(),
      header: "AADHAR",
    }),
    columnHelper.accessor("dob_of_security_guard", {
      cell: (info) => info.getValue(),
      header: "BIRTH DATE",
    }),
    columnHelper.accessor("contact_number", {
      cell: (info) => info.getValue(),
      header: "CONTACT NUMBER",
    }),
    columnHelper.accessor("alternate_contact_number", {
      cell: (info) => info.getValue(),
      header: "ALTERNATE CONTACT NUMBER",
    }),
    columnHelper.accessor("experience_as_security_guard", {
      cell: (info) => info.getValue(),
      header: "EXPERIENCE AS SECURITY GUARD",
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
  const addForm = () => {
    navigate(`/security-guard-master/add/security-guard-master/`);
  };

  const getData = async () => {
    //params filter
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
      const response = await getSecurityGuardMaster(query).unwrap();

      console.log("Success:", response);
      setData(response?.results || []);
      setFilter((old) => ({
        ...old,
        totalPage: Math.ceil(response?.total / old?.limit),
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
          loading={getSecurityGuardMasterApiIsLoading}
          addForm={() => addForm()}
        />
      </div>
    </>
  );
};

export default SecurityGuardMaster;
