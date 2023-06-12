import { createColumnHelper } from "@tanstack/react-table";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import React, { useEffect, useMemo, useState } from "react";
import { useGetCommodityGradeMutation } from "../../features/master-api-slice";

const CommodityGrade = () => {
  const columnHelper = createColumnHelper();
  const [filter, setFilter] = useState({
    filter: [],
    search: null,
  });

  const [
    getCommodityGrade,
    {
      error: getCommodityGradeApiErr,
      isLoading: getCommodityGradeApiIsLoading,
    },
  ] = useGetCommodityGradeMutation();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "SR. NO",
    }),
    columnHelper.accessor("commodity_grade", {
      cell: (info) => info.getValue(),
      header: " COMMODITY GRADE NAME",
    }),
    columnHelper.accessor("description", {
      cell: (info) => info.getValue(),
      header: "DESCRIPTION",
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
      "COMMODITY GRADE NAME": "commodity_grade",
      isActiveFilter: false,
    },
    {
      DESCRIPTION: "description",
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
      const response = await getCommodityGrade(paramString).unwrap();

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
    <>
      <div>
        <FunctionalTable
          filterFields={filterFields}
          setFilter={setFilter}
          columns={columns}
          data={data}
          loading={getCommodityGradeApiIsLoading}
        />
      </div>
    </>
  );
};

export default CommodityGrade;
