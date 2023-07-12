import React, { useEffect, useState } from "react";
import { Box, Flex, Switch, Text, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  useActiveDeActiveMutation,
  useGetHiringProposalMasterMutation,
} from "../../features/master-api-slice";

import { BiEditAlt } from "react-icons/bi";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import { createColumnHelper } from "@tanstack/react-table";
import { setUpFilterFields } from "../../features/filter.slice";
import { API } from "../../constants/api.constants";
import { filterFields } from "./fields";
import { useNavigate } from "react-router-dom";

function HiringProposalMaster() {
  const dispatch = useDispatch();
  const columnHelper = createColumnHelper();
  const navigate = useNavigate();
  const filterQuery = useSelector(
    (state) => state.dataTableFiltersReducer.filterQuery
  );
  console.log("Hiring Proposal Master", filterQuery);
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
    getHiringProposalMaster,
    { isLoading: getHiringProposalMasterApiIsLoading },
  ] = useGetHiringProposalMasterMutation();

  const [activeDeActive] = useActiveDeActiveMutation();

  const toast = useToast();

  const handleActiveDeActive = async (e, info) => {
    console.log("event --> ", e.target.checked, info);
    let obj = {
      id: info.row.original.id,
      active: e.target.checked,
      endPoint: API.DASHBOARD.HIRING_PROPOSAL_MASTER_ACTIVE,
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

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "SR. NO",
    }),
    columnHelper.accessor("warehouse_type", {
      cell: (info) => info.getValue(),
      header: "WarehouseTypeID",
    }),
    columnHelper.accessor("warehouse_subtype", {
      cell: (info) => info.getValue(),
      header: "WarehouseSubTypeID",
    }),
    columnHelper.accessor("warehouse_name", {
      cell: (info) => info.getValue(),
      header: "Warehouse Name",
    }),
    columnHelper.accessor("region", {
      cell: (info) => info.getValue(),
      header: "RegionID",
    }),
    columnHelper.accessor("state", {
      cell: (info) => info.getValue(),
      header: "StateID",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "ZoneID",
    }),
    columnHelper.accessor("district", {
      cell: (info) => info.getValue(),
      header: "DistrictID",
    }),
    columnHelper.accessor("area", {
      cell: (info) => info.getValue(),
      header: "AreaID",
    }),
    columnHelper.accessor("warehouse_address", {
      cell: (info) => info.getValue(),
      header: "WarehouseAddress ",
    }),
    columnHelper.accessor("warehouse_pincode", {
      cell: (info) => info.getValue(),
      header: "WarehousePincode",
    }),
    columnHelper.accessor("no_of_chambers", {
      cell: (info) => info.getValue(),
      header: "NoOfChambers",
    }),
    columnHelper.accessor("is_factory_permise", {
      cell: (info) => info.getValue(),
      header: "IsFactoryPremise",
    }),
    columnHelper.accessor("standard_capacity", {
      cell: (info) => info.getValue(),
      header: "StandardCapacity",
    }),
    columnHelper.accessor("currrent_capacity", {
      cell: (info) => info.getValue(),
      header: "CurrentCapacity",
    }),
    columnHelper.accessor("currrent_utilised_capacity", {
      cell: (info) => info.getValue(),
      header: "CurrentUtilisedCapacity",
    }),
    columnHelper.accessor("no_of_warehouse_in_area", {
      cell: (info) => info.getValue(),
      header: "NoOfWarehouseInArea",
    }),
    columnHelper.accessor("lock_in_period", {
      cell: (info) => info.getValue(),
      header: "LockinPeriod",
    }),
    columnHelper.accessor("lock_in_period_month", {
      cell: (info) => info.getValue(),
      header: "LockinPeriodMonth",
    }),
    columnHelper.accessor("covered_area", {
      cell: (info) => info.getValue(),
      header: "CoveredArea",
    }),
    columnHelper.accessor("supervisor_day_shift", {
      cell: (info) => info.getValue(),
      header: "SupervisorDayShift",
    }),
    columnHelper.accessor("supervisor_night_shift", {
      cell: (info) => info.getValue(),
      header: "SupervisorNightShift ",
    }),
    columnHelper.accessor("security_guard_day_shift", {
      cell: (info) => info.getValue(),
      header: "SecurityGuardDayShift ",
    }),
    columnHelper.accessor("security_guard_night_shift", {
      cell: (info) => info.getValue(),
      header: "SecurityGuardNightShift ",
    }),
    columnHelper.accessor("expected_commodity", {
      cell: (info) => info.getValue(),
      header: "Expected Commodity ",
    }),
    columnHelper.accessor("commodity_inward_type", {
      cell: (info) => info.getValue(),
      header: "CommodityInwardType",
    }),
    columnHelper.accessor("prestack_commodity", {
      cell: (info) => info.getValue(),
      header: "PreStackCommodityID ",
    }),
    columnHelper.accessor("prestack_commodity_qty", {
      cell: (info) => info.getValue(),
      header: "PreStackCommodityQty",
    }),
    columnHelper.accessor("banker_id", {
      cell: (info) => info.getValue(),
      header: "CCBankerID ",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "FundingRequired ",
    }),
    columnHelper.accessor("rent", {
      cell: (info) => info.getValue(),
      header: "Rent",
    }),
    columnHelper.accessor("gg_revenue_ratio", {
      cell: (info) => info.getValue(),
      header: "GGRevenueSharingRatio",
    }),
    columnHelper.accessor("security_deposit_month", {
      cell: (info) => info.getValue(),
      header: "SecurityDepositeMonth",
    }),
    columnHelper.accessor("advance_rent", {
      cell: (info) => info.getValue(),
      header: "AdvanceRent",
    }),
    columnHelper.accessor("advance_rent_month", {
      cell: (info) => info.getValue(),
      header: "AdvanceRentMonth ",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "GST",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "CommencementDate",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "AgreementPeriodMonth ",
    }),
    columnHelper.accessor("notice_period_month", {
      cell: (info) => info.getValue(),
      header: "NoticePeriodMonth",
    }),
    columnHelper.accessor("projection_plan_file_path", {
      cell: (info) => info.getValue(),
      header: "ProjectionPlanFilePath",
    }),
    columnHelper.accessor("owner_intention_letter_file_path", {
      cell: (info) => info.getValue(),
      header: "OwnerIntentionLetterFilePath",
    }),

    columnHelper.accessor("remarks", {
      cell: (info) => info.getValue(),
      header: "Remarks ",
    }),
    columnHelper.accessor("cm_proposal_business_form_file_path", {
      cell: (info) => info.getValue(),
      header: "CMProposalBusinessFormFilePath ",
    }),
    columnHelper.accessor("l1_user", {
      cell: (info) => info.getValue(),
      header: "L1UserID",
    }),
    columnHelper.accessor("l2_user", {
      cell: (info) => info.getValue(),
      header: "L2UserID",
    }),

    columnHelper.accessor("is_funding_required", {
      cell: (info) => info.getValue(),
      header: "Is Funding Required ",
    }),
    columnHelper.accessor("bank_address", {
      cell: (info) => info.getValue(),
      header: "DocumentID",
    }),
    columnHelper.accessor("bank_address", {
      cell: (info) => info.getValue(),
      header: "InspectionAssignedTo",
    }),
    columnHelper.accessor("created_at", {
      cell: (info) => info.getValue(),
      header: "CreationDate",
    }),
    columnHelper.accessor("updated_at", {
      cell: (info) => info.getValue(),
      header: "LastUpdateDate",
    }),

    columnHelper.accessor("active", {
      // header: "ACTIVE",
      header: () => (
        <Text id="active_col" fontWeight="800">
          Active
        </Text>
      ),
      cell: (info) => (
        <Box id="active_row">
          <Switch
            size="md"
            colorScheme="whatsapp"
            // onChange={(e) => handleActiveDeActive(e, info)}
            isChecked={info.row.original.active}
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
      header: () => (
        <Text id="update_col" fontWeight="800">
          UPDATE
        </Text>
      ),
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
    navigate(`/add/hiring-proposal-master/`);
  };

  const editForm = (info) => {
    console.log("info --> ", info);
    let editedFormId = info.row.original.id;

    navigate(`/warehouse-proposal`, {
      state: {
        details: {
          id: info.row.original.id,
          type: { label: "PWH", value: "pwh" },
          // type: { label: "WMS", value: "wms" },
        },
      },
    });

    // navigate(`/edit/hiring-proposal-master/${editedFormId}`, {
    //   state: { details: info.row.original },
    // });
  };

  const getHiringProposal = async () => {
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

    console.log("paramString ---> ", paramString);

    try {
      const query = filterQuery ? `${paramString}&${filterQuery}` : paramString;
      const response = await getHiringProposalMaster(query).unwrap();
      console.log("Success:", response);
      setData(response?.results || []);
      setFilter((old) => ({
        ...old,
        totalPage: Math.ceil(response?.total / old.limit),
        total: response?.total_data,
        totalFilter: response?.total,
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    tableFilterSet();
    getHiringProposal();
  }, [filter.limit, filter.page, filterQuery]);

  return (
    <div>
      <FunctionalTable
        filter={filter}
        filterFields={filterFields}
        setFilter={setFilter}
        columns={columns}
        data={data || []}
        loading={getHiringProposalMasterApiIsLoading}
        addForm={() => addForm()}
      />
    </div>
  );
}

export default HiringProposalMaster;
