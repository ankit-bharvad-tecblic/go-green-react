import React, { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import { useEffect, useState } from "react";
import { useGetBankBranchMasterMutation } from "../../features/master-api-slice";
import { Box, Flex, Switch, Text } from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setUpFilterFields } from "../../features/filter.slice";

function BankBranchMaster() {
  const dispatch = useDispatch();
  const columnHelper = createColumnHelper();

  const filterQuery = useSelector(
    (state) => state.dataTableFiltersReducer.filterQuery
  );
  console.log("Bank Branch Master", filterQuery);
  const [filter, setFilter] = useState({
    // filter: [],
    // search: null,
    page: 1,
    totalPage: 1,
    limit: 25,
  });

  const [
    getBankBranchMaster,
    {
      error: getBankBranchMasterApiErr,
      isLoading: getBankBranchMasterApiIsLoading,
    },
  ] = useGetBankBranchMasterMutation();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "SR. NO",
    }),
    columnHelper.accessor("branch_name", {
      cell: (info) => info.getValue(),
      header: "BRANCH NAME",
    }),
    columnHelper.accessor("bank.bank_name", {
      cell: (info) => info.getValue(),
      header: "BANK NAME",
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
    columnHelper.accessor("branch_address", {
      cell: (info) => info.getValue(),
      header: "ADDRESS",
    }),
    columnHelper.accessor("pincode", {
      cell: (info) => info.getValue(),
      header: "PINCODE",
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
      "BRANCH NAME": "branch_name",
      isActiveFilter: false,

      label: "BRANCH NAME",
      name: "branch_name",
      placeholder: "BRANCH NAME",
      type: "text",
    },
    {
      "BANK NAME": "bank__bank_name",
      isActiveFilter: false,

      label: "BANK NAME",
      name: "bank__bank_name",
      placeholder: "BANK NAME",
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
      ADDRESS: "branch_address",
      isActiveFilter: false,

      label: "ADDRESS",
      name: "branch_address",
      placeholder: "ADDRESS",
      type: "text",
    },
    {
      PINCODE: "pincode",
      isActiveFilter: false,

      label: "PINCODE ",
      name: "pincode",
      placeholder: "PINCODE ",
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

    console.log("paramString ---> ", paramString);

    try {
      const query = filterQuery ? `${paramString}&${filterQuery}` : paramString;
      const response = await getBankBranchMaster(query).unwrap();
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
    <div>
      <FunctionalTable
        filter={filter}
        filterFields={filterFields}
        setFilter={setFilter}
        columns={columns}
        data={data}
        loading={getBankBranchMasterApiIsLoading}
      />
    </div>
  );
}

export default BankBranchMaster;
