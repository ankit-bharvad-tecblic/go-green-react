import { createColumnHelper } from "@tanstack/react-table";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import React, { useEffect, useMemo, useState } from "react";
import { useGetCommodityMasterMutation } from "../../features/master-api-slice";

const CommodityMaster = () => {
  const columnHelper = createColumnHelper();
  const [filter, setFilter] = useState({
    filter: [],
    search: null,
  });

  const [
    getCommodityMaster,
    {
      error: getCommodityMasterApiErr,
      isLoading: getCommodityMasterApiIsLoading,
    },
  ] = useGetCommodityMasterMutation();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "SR. NO",
    }),
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "Commodity id",
    }),
    columnHelper.accessor("commodity_name", {
      cell: (info) => info.getValue(),
      header: "Commodity name",
    }),
    columnHelper.accessor("commodity_type.id", {
      cell: (info) => info.getValue(),
      header: "Commodity type id",
    }),
    columnHelper.accessor("maximum_bag_size", {
      cell: (info) => info.getValue(),
      header: "MAXIMUM BAG SIZE",
    }),
    columnHelper.accessor("minimum_bag_size", {
      cell: (info) => info.getValue(),
      header: "Minimum bag size",
    }),
    columnHelper.accessor("rent_on_bag", {
      cell: (info) => info.getValue(),
      header: "Rent on bag M/T",
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
      "COMMODITY NAME": "commodity_name",
      isActiveFilter: false,
    },
    {
      "MINIMUM BAG SIZE": "minimum_bag_size",
      isActiveFilter: false,
    },
    {
      "MAXIMUM BAG SIZE": "maximum_bag_size",
      isActiveFilter: false,
    },
    {
      "RENT ON BAG M/T": "rent_on_bag",
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
      const response = await getCommodityMaster(paramString).unwrap();

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
          loading={getCommodityMasterApiIsLoading}
        />
      </div>
    </>
  );
};

export default CommodityMaster;
