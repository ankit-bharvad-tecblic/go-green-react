import { createColumnHelper } from "@tanstack/react-table";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import React, { useEffect, useMemo, useState } from "react";
import { useGetStateMasterMutation, useGetUserMasterMutation } from "../../features/master-api-slice";

const UserMaster = () => {
  const columnHelper = createColumnHelper();
  const [filter, setFilter] = useState({
    filter: [],
    search: null,
    page: 1,
    totalPage: 1,
    limit: 10,
  });

  const [
    getStateMaster,
    { error: getUserMasterApiErr, isLoading: getUserMasterApiIsLoading },
  ] = useGetUserMasterMutation();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "SR. NO",
    }),
    columnHelper.accessor("email", {
      cell: (info) => info.getValue(),
      header: "USER NAME",
    }),
    columnHelper.accessor("first_name", {
      cell: (info) => info.getValue(),
      header: "FULL NAME",
    }),
    columnHelper.accessor("phone", {
      cell: (info) => info.getValue(),
      header: "CONTACT NO",
    }),
    columnHelper.accessor("user_role", {
      cell: (info) => info.getValue(),
      header: "ROLE",
    }),
    columnHelper.accessor("created_at", {
      cell: (info) => info.getValue(),
      header: "CREATION DATE",
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
    <div>
      <FunctionalTable
        filter={filter}
        filterFields={filterFields}
        setFilter={setFilter}
        columns={columns}
        data={data}
        loading={getUserMasterApiIsLoading}
      />
    </div>
  );
};

export default UserMaster;
