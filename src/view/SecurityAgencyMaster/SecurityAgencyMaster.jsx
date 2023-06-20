import { createColumnHelper } from "@tanstack/react-table";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import React, { useEffect, useMemo, useState } from "react";
import { useGetSecurityAgencyMasterMutation } from "../../features/master-api-slice";
import { Box, Flex, Switch, Text } from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setUpFilterFields } from "../../features/filter.slice";

const SecurityAgencyMaster = () => {
  const dispatch = useDispatch();
  const filterQuery = useSelector(
    (state) => state.dataTableFiltersReducer.filterQuery
  );
  console.log("SecurityAgencyMaster", filterQuery);

  const columnHelper = createColumnHelper();
  const [filter, setFilter] = useState({
    // filter: [],
    // search: null,
    page: 1,
    totalPage: 1,
    limit: 25,
  });

  const [
    getSecurityAgencyMaster,
    {
      error: getSecurityAgencyMasterApiErr,
      isLoading: getSecurityAgencyMasterApiIsLoading,
    },
  ] = useGetSecurityAgencyMasterMutation();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "SR. NO",
    }),
    columnHelper.accessor("security_agency_name", {
      cell: (info) => info.getValue(),
      header: "NAME",
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
    columnHelper.accessor("area.area_name", {
      cell: (info) => info.getValue(),
      header: "AREA NAME",
    }),
    columnHelper.accessor("address", {
      cell: (info) => info.getValue(),
      header: "ADDRESS",
    }),
    columnHelper.accessor("pincode", {
      cell: (info) => info.getValue(),
      header: "PINCODE",
    }),
    columnHelper.accessor("contact_no", {
      cell: (info) => info.getValue(),
      header: "CONTACT NO.",
    }),
    columnHelper.accessor("agency_contract_start_date", {
      cell: (info) => info.getValue(),
      header: "CONTRACT START DATE ",
    }),
    columnHelper.accessor("agency_contract_duration", {
      cell: (info) => info.getValue(),
      header: "CONTRACT DURATION",
    }),
    columnHelper.accessor("service_cost", {
      cell: (info) => info.getValue(),
      header: "SERVICE COST",
    }),
    columnHelper.accessor("remarks", {
      cell: (info) => info.getValue(),
      header: "REMARKS",
    }),
    columnHelper.accessor("active", {
      // header: "ACTIVE",
      header: () => <Text id="active_col">Active</Text>,
      cell: (info) => (
        <Box id="active_row">
          <Switch
            size="md"
            colorScheme="whatsapp"
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
      NAME: "security_agency_name",
      isActiveFilter: false,

      label: "NAME",
      name: "security_agency_name",
      placeholder: "NAME",
      type: "text",
    },
    {
      NAME: "region__region_name",
      isActiveFilter: false,

      label: "REGION NAME",
      name: "region__region_name",
      placeholder: "REGION NAME",
      type: "text",
    },
    {
      NAME: "state__state_name",
      isActiveFilter: false,

      label: "STATE NAME",
      name: "state__state_name",
      placeholder: "STATE NAME",
      type: "text",
    },
    {
      NAME: "district__district_name",
      isActiveFilter: false,

      label: "DISTRICT NAME",
      name: "district__district_name",
      placeholder: "DISTRICT NAME",
      type: "text",
    },
    {
      NAME: "area__area_name",
      isActiveFilter: false,

      label: "AREA NAME",
      name: "area__area_name",
      placeholder: "AREA NAME",
      type: "text",
    },
    {
      NAME: "address",
      isActiveFilter: false,

      label: "ADDRESS",
      name: "address",
      placeholder: "ADDRESS",
      type: "text",
    },
    {
      NAME: "pincode",
      isActiveFilter: false,

      label: "PINCODE",
      name: "pincode",
      placeholder: "PINCODE",
      type: "number",
    },
    {
      NAME: "contact_no",
      isActiveFilter: false,

      label: "CONTACT NO.",
      name: "contact_no",
      placeholder: "CONTACT NO.",
      type: "number",
    },
    {
      NAME: "agency_contract_start_date",
      isActiveFilter: false,

      label: "CONTRACT START DATE",
      name: "agency_contract_start_date",
      placeholder: "CONTRACT START DATE",
      type: "date",
    },
    {
      NAME: "agency_contract_duration",
      isActiveFilter: false,

      label: "CONTRACT DURATION",
      name: "agency_contract_duration",
      placeholder: "CONTRACT DURATION",
      type: "text",
    },
    {
      NAME: "service_cost",
      isActiveFilter: false,

      label: "SERVICE COST",
      name: "service_cost",
      placeholder: "SERVICE COST",
      type: "number",
    },
    {
      NAME: "remarks",
      isActiveFilter: false,

      label: "REMARKS",
      name: "remarks",
      placeholder: "REMARKS",
      type: "text",
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
    if (filterQuery) {
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
    }

    try {
      let query = filterQuery ? `${paramString}&${filterQuery}` : paramString;
      const response = await getSecurityAgencyMaster(query).unwrap();

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
  }, [filter.limit, filter.page]);

  useMemo(() => {
    if (filter.search !== null) {
      getData();
    }
  }, [filter.search]);
  useMemo(() => {
    console.log("filter query", filterQuery);
    if (filterQuery) {
      getData();
    }
  }, [filterQuery]);

  return (
    <>
      <div>
        <FunctionalTable
          filter={filter}
          filterFields={filterFields}
          setFilter={setFilter}
          columns={columns}
          data={data}
          loading={getSecurityAgencyMasterApiIsLoading}
        />
      </div>
    </>
  );
};

export default SecurityAgencyMaster;
