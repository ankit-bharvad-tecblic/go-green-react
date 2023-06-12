import { createColumnHelper } from "@tanstack/react-table";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import React, { useEffect, useMemo, useState } from "react";
import { useGetStateMasterMutation } from "../../features/master-api-slice";

const StateMaster = () => {
  const columnHelper = createColumnHelper();
  const [filter, setFilter] = useState({
    filter: [],
    search: null,
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

  useMemo(() => {
    if (filter.search !== null) {
      getData();
    }
  }, [filter.search]);

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
