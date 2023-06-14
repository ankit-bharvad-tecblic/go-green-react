import React, { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import { useEffect, useState } from "react";
import { useGetRegionMasterMutation } from "../../features/master-api-slice";
function RegionMaster() {
  const columnHelper = createColumnHelper();
  const [filter, setFilter] = useState({
    filter: [],
    search: null,
    page: 1,
    totalPage: 1,
    limit: 10,
  });

  const [
    getRegionMaster,
    { error: getRegionMasterApiErr, isLoading: getRegionMasterApiIsLoading },
  ] = useGetRegionMasterMutation();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "SR. NO",
    }),
    columnHelper.accessor("region_name", {
      cell: (info) => info.getValue(),
      header: "Region name",
    }),
    columnHelper.accessor("created_at", {
      cell: (info) => info.getValue(),
      header: "Creation date",
    }),

    columnHelper.accessor("active", {
      header: "ACTIVE",
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
      const response = await getRegionMaster(paramString).unwrap();
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
    getData();
  }, [filter.limit, filter.page]);

  useMemo(() => {
    if (filter.search !== null) {
      getData();
    }
  }, [filter.search]);

  const filterFields = [
    {
      "REGION NAME": "zone_type",
      isActiveFilter: false,
    },
  ];
  return (
    <div>
      <FunctionalTable
        filter={filter}
        filterFields={filterFields}
        setFilter={setFilter}
        columns={columns}
        data={data}
        loading={getRegionMasterApiIsLoading}
      />
    </div>
  );
}

export default RegionMaster;
