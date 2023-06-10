import React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import { useEffect, useState } from "react";
import { useGetBankBranchMasterMutation } from "../../features/master-api-slice";

function BankBranchMaster() {
  const columnHelper = createColumnHelper();
  const [filter, setFilter] = useState({
    filter: [],
    search: "",
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
    columnHelper.accessor("active", {
      header: "ACTIVE/DEACTIVE",
    }),

    columnHelper.accessor("", {
      header: "UPDATE",
    }),
  ];

  const [data, setData] = useState([]);

  const params = {
    filter: [],
    search: "",
  };

  let paramString = "";

  const getData = async () => {
    //params filter
    if (filter.filter.length || filter.search) {
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
      const response = await getBankBranchMaster(paramString).unwrap();
      console.log("Success:", response);
      setData(response?.results || []);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log("filter =-==> ", filter);

    handleSearch();
  }, [filter.search]);

  let timeoutId;

  const handleSearch = () => {
    clearTimeout(timeoutId);
    // Set a new timeout to call the API after 0.5 seconds
    timeoutId = setTimeout(() => {
      getData();
    }, 800);
  };

  const filterFields = [
    {
      "REGION NAME": "zone_type",
      isActiveFilter: false,
    },
  ];
  return (
    <div>
      <FunctionalTable
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