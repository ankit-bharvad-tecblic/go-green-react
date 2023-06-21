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

const SecurityGuardMaster = () => {
  const dispatch = useDispatch();
  const filterQuery = useSelector(
    (state) => state.dataTableFiltersReducer.filterQuery
  );
  console.log("SecurityGuradMaster", filterQuery);
  const columnHelper = createColumnHelper();
  const [filter, setFilter] = useState({
    // filter: [],
    // search: null,
    page: 1,
    totalPage: 1,
    limit: 25,
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
      NAME: "security_guard_name",
      isActiveFilter: false,

      label: "NAME",
      name: "security_guard_name",
      placeholder: "NAME",
      type: "text",
    },
    {
      "REGION NAME": "region__region_name",
      isActiveFilter: false,

      label: "REGION NAME",
      name: "region__region_name",
      placeholder: "REGION NAME",
      type: "text",
    },
    {
      "STATE NAME": "state__state_name",
      isActiveFilter: false,

      label: "STATE NAME",
      name: "state__state_name",
      placeholder: "STATE NAME",
      type: "text",
    },
    {
      "DISTRICT NAME": "district__district_name",
      isActiveFilter: false,

      label: "DISTRICT NAME",
      name: "district__district_name",
      placeholder: "DISTRICT NAME",
      type: "text",
    },
    {
      ADDRESS: "address_of_security_guard",
      isActiveFilter: false,

      label: "ADDRESS",
      name: "security_agency_id__security_agency_name",
      placeholder: "ADDRESS",
      type: "text",
    },
    {
      AADHAR: "aadhar_of_security_guard",
      isActiveFilter: false,

      label: "AADHAR",
      name: "aadhar_of_security_guard",
      placeholder: "AADHAR",
      type: "text",
    },
    {
      "BIRTH DATE": "dob_of_security_guard",
      isActiveFilter: false,

      label: "BIRTH DATE",
      name: "dob_of_security_guard",
      placeholder: "BIRTH DATE",
      type: "text",
    },
    {
      "CONTACT NUMBER": "contact_number",
      isActiveFilter: false,

      label: "CONTACT NUMBER",
      name: "contact_number",
      placeholder: "CONTACT NUMBER",
      type: "number",
    },
    {
      "ALTERNATE CONTACT NUMBER": "alternate_contact_number",
      isActiveFilter: false,

      label: "ALTERNATE CONTACT NUMBER",
      name: "alternate_contact_number",
      placeholder: "ALTERNATE CONTACT NUMBER",
      type: "number",
    },
    {
      "EXPERIENCE AS SECURITY GUARD": "experience_as_security_guard",
      isActiveFilter: false,

      label: "EXPERIENCE AS SECURITY GUARD",
      name: "experience_as_security_guard",
      placeholder: "EXPERIENCE AS SECURITY GUARD",
      type: "number",
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
    {
      DESCRIPTION: "description",
      isActiveFilter: false,
    },
  ];

  const tableFilterSet = () => {
    dispatch(setUpFilterFields({ fields: filterFields }));
  };

  const [data, setData] = useState([]);

  let paramString = "";

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
        />
      </div>
    </>
  );
};

export default SecurityGuardMaster;
