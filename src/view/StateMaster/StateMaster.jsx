import { createColumnHelper } from "@tanstack/react-table";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import React, { useEffect, useState } from "react";
import { useGetStateMasterMutation } from "../../features/master-api-slice";

const StateMaster = () => {
  const columnHelper = createColumnHelper();
  const [filter, setFilter] = useState({
    filter: [],
    search: "",
  });

  const [
    getStateMaster,
    { error: getStateMasterApiErr, isLoading: getStateMasterApiIsLoading },
  ] = useGetStateMasterMutation();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "SR. NO",
    }),
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "STATE ID",
    }),
    columnHelper.accessor("zone.zone_type", {
      cell: (info) => info.getValue(),
      header: "ZONE TYPE",
    }),
    columnHelper.accessor("state_name", {
      cell: (info) => info.getValue(),
      header: "STATE NAME",
    }),
    columnHelper.accessor("active", {
      header: "ACTIVE/DEACTIVE",
    }),
    columnHelper.accessor("", {
      header: "UPDATE",
    }),
  ];

  const filterFields = [
    {
      "ZONE TYPE": "zone__zone_type",
      isActiveFilter: false,
    },
  ];

  const [data, setData] = useState([]);

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

    try {
      const response = await getStateMaster(paramString).unwrap();
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

  return (
    <div>
      <FunctionalTable
        filterFields={filterFields}
        setFilter={setFilter}
        columns={columns}
        data={data}
        loading={getStateMasterApiIsLoading}
      />
    </div>
  );
};

export default StateMaster;
