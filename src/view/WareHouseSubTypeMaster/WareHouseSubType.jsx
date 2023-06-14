import { createColumnHelper } from "@tanstack/react-table";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import React, { useEffect, useMemo, useState } from "react";
import { useGetWareHouseSubTypeMutation } from "../../features/master-api-slice";

const WareHouseSubType = () => {
  const columnHelper = createColumnHelper();
  const [filter, setFilter] = useState({
    filter: [],
    search: null,
    page: 1,
    totalPage: 1,
    limit: 10,
  });

  const [
    getWareHouseSubType,
    {
      error: getWareHouseSubTypeApiErr,
      isLoading: getWareHouseSubTypeApiIsLoading,
    },
  ] = useGetWareHouseSubTypeMutation();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "SR. NO",
    }),
    columnHelper.accessor("warehouse_subtype", {
      cell: (info) => info.getValue(),
      header: "Warehouse sub type",
    }),
    columnHelper.accessor("commodity_name", {
      cell: (info) => info.getValue(),
      header: "Warehouse type",
    }),
    columnHelper.accessor("description", {
      cell: (info) => info.getValue(),
      header: "Description",
    }),
    columnHelper.accessor("creation_date", {
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
      const response = await getWareHouseSubType(paramString).unwrap();

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
  return (
    <>
      <div>
        <FunctionalTable
          filter={filter}
          filterFields={filterFields}
          setFilter={setFilter}
          columns={columns}
          data={data}
          loading={getWareHouseSubTypeApiIsLoading}
        />
      </div>
    </>
  );
};

export default WareHouseSubType;
