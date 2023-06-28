import React, { useEffect, useState } from "react";
import { Box, Flex, Switch, Text, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  useActiveDeActiveMutation,
  useGetEmployeeMasterMutation,
} from "../../features/master-api-slice";

import { BiEditAlt } from "react-icons/bi";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import { createColumnHelper } from "@tanstack/react-table";
import { setUpFilterFields } from "../../features/filter.slice";
import { API } from "../../constants/api.constants";

function EmployeeMaster() {
  const dispatch = useDispatch();
  const columnHelper = createColumnHelper();

  const filterQuery = useSelector(
    (state) => state.dataTableFiltersReducer.filterQuery
  );
  console.log("Employee Master", filterQuery);
  const [filter, setFilter] = useState({
    // filter: [],
    // search: null,
    page: 1,
    totalPage: 1,
    limit: 25,
  });

  const [getEmployeeMaster, { isLoading: getEmployeeMasterApiIsLoading }] =
    useGetEmployeeMasterMutation();

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

  const filterFields = [
    {
      "Employee Full Name": "employee_full_name",
      isActiveFilter: false,

      label: "Employee Full Name",
      name: "employee_full_name",
      placeholder: "Employee Full Name",
      type: "text",
    },
    {
      "Contact Number": "contact_number",
      isActiveFilter: false,

      label: "Contact Number",
      name: "contact_number",
      placeholder: "Contact Number",
      type: "number",
    },
    {
      "REGION ID": "region_id",
      isActiveFilter: false,

      label: "REGION ID",
      name: "region_id",
      placeholder: "REGION ID",
      type: "number",
    },
    {
      "STATE ID": "state_id",
      isActiveFilter: false,

      label: "STATE ID",
      name: "state_id",
      placeholder: "STATE ID",
      type: "number",
    },
    {
      "Zone ID": "zone_id",
      isActiveFilter: false,

      label: "Zone ID",
      name: "zone_id",
      placeholder: "Zone ID",
      type: "number",
    },
    {
      "District ID": "district_id",
      isActiveFilter: false,

      label: "District ID",
      name: "district_id",
      placeholder: "District ID",
      type: "number",
    },
    {
      ADDRESS: "address",
      isActiveFilter: false,

      label: "ADDRESS",
      name: "address",
      placeholder: "ADDRESS",
      type: "text",
    },

    {
      "Pin Code": "pin_code",
      isActiveFilter: false,

      label: "Pin Code",
      name: "pin_code",
      placeholder: "Pin Code",
      type: "number",
    },
    {
      "Email ID": "email_id",
      isActiveFilter: false,

      label: "Email ID",
      name: "email_id",
      placeholder: "Email ID",
      type: "text",
    },
    {
      "Department ID": "email_id",
      isActiveFilter: false,

      label: "Department ID",
      name: "email_id",
      placeholder: "Department ID",
      type: "text",
    },
    {
      "Job Title": "job_title",
      isActiveFilter: false,

      label: "Job Title",
      name: "job_title",
      placeholder: "Job Title",
      type: "text",
    },
    {
      "Reporting Manager ID": "reporting_manager_id",
      isActiveFilter: false,

      label: "Reporting Manager ID",
      name: "reporting_manager_id",
      placeholder: "Reporting Manager ID",
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
  ];
  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "SR. NO",
    }),
    columnHelper.accessor("employee_full_name", {
      cell: (info) => info.getValue(),
      header: "Employee Full Name",
    }),
    columnHelper.accessor("contact_number", {
      cell: (info) => info.getValue(),
      header: "Contact Number",
    }),
    columnHelper.accessor("region_id.id", {
      cell: (info) => info.getValue(),
      header: "Region ID",
    }),
    columnHelper.accessor("state_id.id", {
      cell: (info) => info.getValue(),
      header: "State ID",
    }),
    columnHelper.accessor("zone_id.id", {
      cell: (info) => info.getValue(),
      header: "Zone ID",
    }),
    columnHelper.accessor("district_id.id", {
      cell: (info) => info.getValue(),
      header: "District ID",
    }),
    columnHelper.accessor("address", {
      cell: (info) => info.getValue(),
      header: "ADDRESS",
    }),
    columnHelper.accessor("pin_code", {
      cell: (info) => info.getValue(),
      header: "Pin Code",
    }),
    columnHelper.accessor("email_id", {
      cell: (info) => info.getValue(),
      header: "Email ID",
    }),
    columnHelper.accessor("email_id", {
      cell: (info) => info.getValue(),
      header: "Department ID",
    }),
    columnHelper.accessor("job_title", {
      cell: (info) => info.getValue(),
      header: "Job Title",
    }),
    columnHelper.accessor("reporting_manager_id", {
      cell: (info) => info.getValue(),
      header: "Reporting Manager ID",
    }),
    columnHelper.accessor("created_at", {
      cell: (info) => info.getValue(),
      header: "Creation Date",
    }),
    columnHelper.accessor("updated_at", {
      cell: (info) => info.getValue(),
      header: "Last Updated Date",
    }),
    columnHelper.accessor("is_active", {
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
            // onClick={() => editForm(info)}
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

  const getEmployee = async () => {
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
      const response = await getEmployeeMaster(query).unwrap();
      console.log("Success:", response.results);
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
    getEmployee();
  }, [filter.limit, filter.page, filterQuery]);
  return (
    <div>
      <FunctionalTable
        filter={filter}
        filterFields={filterFields}
        setFilter={setFilter}
        columns={columns}
        data={data}
        loading={getEmployeeMasterApiIsLoading}
      />
    </div>
  );
}

export default EmployeeMaster;
