import { createColumnHelper } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useActiveDeActiveMutation,
  useGetWareHouseOwnerTypeMutation,
} from "../../features/master-api-slice";
import { BiEditAlt } from "react-icons/bi";
import { API } from "../../constants/api.constants";
import { Box, Flex, Switch, Text, useToast } from "@chakra-ui/react";
import { filterFields } from "./fields";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import { setUpFilterFields } from "../../features/filter.slice";

const WareHouseOwnerMaster = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columnHelper = createColumnHelper();

  const filterQuery = useSelector(
    (state) => state.dataTableFiltersReducer.filterQuery
  );
  console.log("Warehouse Owner Type Master", filterQuery);
  const [filter, setFilter] = useState({
    // filter: [],
    // search: null,
    page: 1,
    totalPage: 1,
    limit: 25,
    totalFilter: 0,
    total: 0,
  });

  const [
    getWareHouseOwnerType,
    { isLoading: getWareHouseOwnerTypeApiIsLoading },
  ] = useGetWareHouseOwnerTypeMutation();

  const [activeDeActive] = useActiveDeActiveMutation();

  const toast = useToast();

  const handleActiveDeActive = async (e, info) => {
    console.log("event --> ", e.target.checked, info);
    let obj = {
      id: info.row.original.id,
      active: e.target.checked,
      endPoint: API.DASHBOARD.WAREHOUSE_OWNER_MASTER,
    };

    try {
      const response = await activeDeActive(obj).unwrap();

      if (response.status === 201) {
        toast({
          title: `${response.message}`,
          status: "success",
          position: "top-right",
          isClosable: true,
          duration: 2000,
        });
        let table_data = data;
        console.log("table_data", data);

        const updatedData = table_data.map((item) => {
          if (item.id === obj.id) {
            return {
              ...item,
              active: obj.active,
            };
          } else {
            return item;
          }
        });

        console.log("updatedData", updatedData);

        setData(updatedData);
        // getData();
      }

      console.log("response --> ", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const editForm = (info) => {
    console.log("Warehouse owner master info --->", info);
    const editedFormId = info.row.original.id;
    navigate(`/warehouse-master/edit/warehouse-owner-master/${editedFormId}`, {
      state: { details: info.row.original },
    });
  };
  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "SR. NO",
    }),
    columnHelper.accessor("hiring_proposal_id.id", {
      cell: (info) => info.getValue(),
      header: "Hiring Proposal ID",
    }),
    columnHelper.accessor("warehouse_owner_name", {
      cell: (info) => info.getValue(),
      header: "Owner Name",
    }),
    columnHelper.accessor("warehouse_owner_contact_no", {
      cell: (info) => info.getValue(),
      header: " Owner ContactNo",
    }),

    columnHelper.accessor("warehouse_owner_address", {
      cell: (info) => info.getValue(),
      header: "Owner Address",
    }),

    columnHelper.accessor("rent_amount", {
      cell: (info) => info.getValue(),
      header: "Rent Amt ",
    }),

    columnHelper.accessor("revenue_sharing_ratio", {
      cell: (info) => info.getValue(),
      header: "Revenue Sharing Ratio ",
    }),
    // columnHelper.accessor("is_active", {
    //   // header: "ACTIVE",
    //   header: () => <Text id="active_col">Active</Text>,
    //   cell: (info) => (
    //     <Box id="active_row">
    //       <Switch
    //         size="md"
    //         colorScheme="whatsapp"
    //         // onChange={(e) => handleActiveDeActive(e, info)}
    //         isChecked={info.row.original.is_active}
    //         // id="active_row"
    //         // isReadOnly
    //         // isChecked={flexRender(
    //         //   cell.column.columnDef.cell,
    //         //   cell.getContext()
    //         // )}
    //       />
    //     </Box>
    //   ),
    //   id: "active",
    //   accessorFn: (row) => row.active,
    // }),
    columnHelper.accessor("update", {
      // header: "UPDATE",
      header: () => <Text id="update_col">UPDATE</Text>,
      cell: (info) => (
        <Flex justifyContent="center" color="primary.700" id="update_row">
          <BiEditAlt
            // color="#A6CE39"
            fontSize="26px"
            cursor="pointer"
            onClick={() => editForm(info)}
          />
        </Flex>
      ),
      id: "update_col",
      accessorFn: (row) => row.update_col,
    }),
  ];

  const tableFilterSet = () => {
    dispatch(setUpFilterFields({ fields: filterFields }));
  };
  const [data, setData] = useState([]);

  let paramString = "";
  const addForm = () => {
    navigate(`/warehouse-master/add/warehouse-owner-master`);
  };

  const getData = async () => {
    //params filter
    //filter.filter.length || filter.search
    // if (filterQuery) {
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
    // }

    try {
      let query = filterQuery ? `${paramString}&${filterQuery}` : paramString;
      const response = await getWareHouseOwnerType(query).unwrap();

      if (response.status === 200) {
        console.log("Success:", response);

        let arr = response?.results.map((item, i) => {
          return {
            ...item,
            hiring_proposal_id: {
              ...item.hiring_proposal_id,
              id: `HP${item.hiring_proposal_id.id}`,
            },
          };
        });
        setData(arr || []);
        setFilter((old) => ({
          ...old,
          totalPage: Math.ceil(response?.total / old.limit),
          total: response?.total_data,
          totalFilter: response?.total,
        }));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    tableFilterSet();
    getData();
  }, [filter.limit, filter.page, filterQuery]);

  // useMemo(() => {
  //   if (filter.search !== null) {
  //     getData();
  //   }
  // }, [filter.search]);

  // useMemo(() => {
  //   console.log("filter query", filterQuery);
  //   if (filterQuery) {
  //     getData();
  //   }
  // }, [filterQuery]);

  return (
    <>
      <div>
        <FunctionalTable
          filter={filter}
          filterFields={filterFields}
          setFilter={setFilter}
          columns={columns}
          data={data}
          loading={getWareHouseOwnerTypeApiIsLoading}
          addForm={() => addForm()}
        />
      </div>
    </>
  );
};

export default WareHouseOwnerMaster;
