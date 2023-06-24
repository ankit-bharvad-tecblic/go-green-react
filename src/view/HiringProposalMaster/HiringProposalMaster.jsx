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

function HiringProposalMaster() {
  const dispatch = useDispatch();
  const columnHelper = createColumnHelper();

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

  const filterFields = [
    {
      WarehouseTypeID: "bank_name",
      isActiveFilter: false,

      label: "WarehouseTypeID",
      name: "bank_name",
      placeholder: "WarehouseTypeID",
      type: "text",
    },
    {
      WarehouseSubTypeID: "bank_name",
      isActiveFilter: false,

      label: "WarehouseSubTypeID",
      name: "bank_name",
      placeholder: "WarehouseSubTypeID",
      type: "text",
    },
    {
      "Warehouse Name": "bank_name",
      isActiveFilter: false,

      label: "Warehouse Name",
      name: "bank_name",
      placeholder: "Warehouse Name",
      type: "text",
    },
    {
      RegionID: "bank_name",
      isActiveFilter: false,

      label: "RegionID",
      name: "bank_name",
      placeholder: "RegionID",
      type: "text",
    },
    {
      "StateID ": "bank_name",
      isActiveFilter: false,

      label: "StateID ",
      name: "bank_name",
      placeholder: "StateID ",
      type: "text",
    },
    {
      "ZoneID ": "bank_name",
      isActiveFilter: false,

      label: "ZoneID ",
      name: "bank_name",
      placeholder: "ZoneID ",
      type: "text",
    },
    {
      "DistrictID ": "bank_name",
      isActiveFilter: false,

      label: "DistrictID ",
      name: "bank_name",
      placeholder: "DistrictID ",
      type: "text",
    },
    {
      "AreaID ": "bank_name",
      isActiveFilter: false,

      label: "AreaID ",
      name: "bank_name",
      placeholder: "AreaID ",
      type: "text",
    },
    {
      "WarehouseAddress ": "bank_name",
      isActiveFilter: false,

      label: "WarehouseAddress ",
      name: "bank_name",
      placeholder: "WarehouseAddress ",
      type: "text",
    },
    {
      "WarehousePincode NAME": "bank_name",
      isActiveFilter: false,

      label: "WarehousePincode ",
      name: "bank_name",
      placeholder: "WarehousePincode ",
      type: "text",
    },
    {
      "NoOfChambers ": "bank_name",
      isActiveFilter: false,

      label: "NoOfChambers ",
      name: "bank_name",
      placeholder: "NoOfChambers ",
      type: "text",
    },
    {
      "IsFactoryPremise ": "bank_name",
      isActiveFilter: false,

      label: "IsFactoryPremise ",
      name: "bank_name",
      placeholder: "IsFactoryPremise ",
      type: "text",
    },
    {
      "StandardCapacity ": "bank_name",
      isActiveFilter: false,

      label: "StandardCapacity ",
      name: "bank_name",
      placeholder: "StandardCapacity",
      type: "text",
    },
    {
      "CurrentCapacity ": "bank_name",
      isActiveFilter: false,

      label: "CurrentCapacity ",
      name: "bank_name",
      placeholder: "CurrentCapacity ",
      type: "text",
    },
    {
      "CurrentUtilisedCapacity ": "bank_name",
      isActiveFilter: false,

      label: "CurrentUtilisedCapacity ",
      name: "bank_name",
      placeholder: "CurrentUtilisedCapacity ",
      type: "text",
    },
    {
      "NoOfWarehouseInArea ": "bank_name",
      isActiveFilter: false,

      label: "NoOfWarehouseInArea",
      name: "bank_name",
      placeholder: "NoOfWarehouseInArea",
      type: "text",
    },
    {
      "LockinPeriod ": "bank_name",
      isActiveFilter: false,

      label: "LockinPeriod ",
      name: "bank_name",
      placeholder: "LockinPeriod",
      type: "text",
    },
    {
      "CoveredArea ": "bank_name",
      isActiveFilter: false,

      label: "CoveredArea",
      name: "bank_name",
      placeholder: "CoveredArea",
      type: "text",
    },
    {
      "SupervisorIDDayShift ": "bank_name",
      isActiveFilter: false,

      label: "SupervisorIDDayShift ",
      name: "bank_name",
      placeholder: "SupervisorIDDayShift ",
      type: "text",
    },
    {
      "SupervisorIDNightShift ": "bank_name",
      isActiveFilter: false,

      label: "SupervisorIDNightShift ",
      name: "bank_name",
      placeholder: "SupervisorIDNightShift ",
      type: "text",
    },
    {
      "SecurityGuardIDDayShift ": "bank_name",
      isActiveFilter: false,

      label: "SecurityGuardIDDayShift ",
      name: "bank_name",
      placeholder: "SecurityGuardIDDayShift ",
      type: "text",
    },
    {
      "SecurityGuardIDNightShift ": "bank_name",
      isActiveFilter: false,

      label: "SecurityGuardIDNightShift ",
      name: "bank_name",
      placeholder: "SecurityGuardIDNightShift",
      type: "text",
    },
    {
      "Expected Commodity ": "bank_name",
      isActiveFilter: false,

      label: "Expected Commodity ",
      name: "bank_name",
      placeholder: "Expected Commodity ",
      type: "text",
    },
    {
      CommodityInwardType: "bank_name",
      isActiveFilter: false,

      label: "CommodityInwardType",
      name: "bank_name",
      placeholder: "CommodityInwardType",
      type: "text",
    },
    {
      PreStackCommodityID: "bank_name",
      isActiveFilter: false,

      label: "PreStackCommodityID",
      name: "bank_name",
      placeholder: "PreStackCommodityID",
      type: "text",
    },
    {
      CCBankerID: "bank_name",
      isActiveFilter: false,

      label: "CCBankerID",
      name: "bank_name",
      placeholder: "CCBankerID",
      type: "text",
    },
    {
      FundingRequired: "bank_name",
      isActiveFilter: false,

      label: "FundingRequired",
      name: "bank_name",
      placeholder: "FundingRequired",
      type: "text",
    },
    {
      "Rent ": "bank_name",
      isActiveFilter: false,

      label: "Rent ",
      name: "bank_name",
      placeholder: "Rent ",
      type: "text",
    },
    {
      GGRevenueSharingRatio: "bank_name",
      isActiveFilter: false,

      label: "GGRevenueSharingRatio",
      name: "bank_name",
      placeholder: "GGRevenueSharingRatio",
      type: "text",
    },
    {
      SecurityDepositeMonth: "bank_name",
      isActiveFilter: false,

      label: "SecurityDepositeMonth",
      name: "bank_name",
      placeholder: "SecurityDepositeMonth",
      type: "text",
    },
    {
      AdvanceRent: "bank_name",
      isActiveFilter: false,

      label: "AdvanceRent",
      name: "bank_name",
      placeholder: "AdvanceRent",
      type: "text",
    },
    {
      AdvanceRentMonth: "bank_name",
      isActiveFilter: false,

      label: "AdvanceRentMonth",
      name: "bank_name",
      placeholder: "AdvanceRentMonth",
      type: "text",
    },
    {
      "GST ": "bank_name",
      isActiveFilter: false,

      label: "GST ",
      name: "bank_name",
      placeholder: "GST ",
      type: "text",
    },
    {
      CommencementDate: "bank_name",
      isActiveFilter: false,

      label: "CommencementDate",
      name: "bank_name",
      placeholder: "CommencementDate",
      type: "text",
    },
    {
      "AgreementPeriodMonth ": "bank_name",
      isActiveFilter: false,

      label: "AgreementPeriodMonth",
      name: "bank_name",
      placeholder: "AgreementPeriodMonth",
      type: "text",
    },

    {
      "NoticePeriodMonth ": "bank_name",
      isActiveFilter: false,

      label: "NoticePeriodMonth ",
      name: "bank_name",
      placeholder: "NoticePeriodMonth ",
      type: "text",
    },
    {
      "ProjectionPlanFilePath ": "bank_name",
      isActiveFilter: false,

      label: "ProjectionPlanFilePath",
      name: "bank_name",
      placeholder: "ProjectionPlanFilePath",
      type: "text",
    },
    {
      OwnerIntentionLetterFilePath: "bank_name",
      isActiveFilter: false,

      label: "OwnerIntentionLetterFilePath",
      name: "bank_name",
      placeholder: "OwnerIntentionLetterFilePath",
      type: "text",
    },
    {
      Remarks: "bank_name",
      isActiveFilter: false,

      label: "Remarks",
      name: "bank_name",
      placeholder: "Remarks",
      type: "text",
    },
    {
      CMProposalBusinessFormFilePath: "bank_name",
      isActiveFilter: false,

      label: "CMProposalBusinessFormFilePath",
      name: "bank_name",
      placeholder: "CMProposalBusinessFormFilePath",
      type: "text",
    },
    {
      L1UserID: "bank_name",
      isActiveFilter: false,

      label: "L1UserID",
      name: "bank_name",
      placeholder: "L1UserID",
      type: "text",
    },
    {
      L2UserID: "bank_name",
      isActiveFilter: false,

      label: "L2UserID",
      name: "bank_name",
      placeholder: "L2UserID",
      type: "text",
    },
    {
      "DocumentID ": "bank_name",
      isActiveFilter: false,

      label: "DocumentID ",
      name: "bank_name",
      placeholder: "DocumentID ",
      type: "text",
    },
    {
      "InspectionAssignedTo ": "bank_name",
      isActiveFilter: false,

      label: "InspectionAssignedTo ",
      name: "bank_name",
      placeholder: "InspectionAssignedTo ",
      type: "text",
    },

    {
      "LAST UPDATED ACTIVE": "ACTIVE",
      isActiveFilter: false,

      label: "ACTIVE/DeActive",
      name: "active",
      placeholder: "Active/DeActive",
      type: "select",
      multi: false,
      options: [
        {
          label: "ACTIVE",
          value: "True",
        },
        {
          label: "DeActive",
          value: "False",
        },
      ],
    },
  ];
  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "SR. NO",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "WarehouseTypeID",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "WarehouseSubTypeID",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "Warehouse Name",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "RegionID",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "StateID",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "ZoneID",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "DistrictID",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "AreaID",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "WarehouseAddress ",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "WarehousePincode",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "NoOfChambers",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "IsFactoryPremise",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "StandardCapacity",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "CurrentCapacity",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "CurrentUtilisedCapacity",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "NoOfWarehouseInArea",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "LockinPeriod",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "LockinPeriodMonth",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "CoveredArea",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "SupervisorIDDayShift",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "SupervisorIDNightShift ",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "SecurityGuardIDDayShift ",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "SecurityGuardIDNightShift ",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "Expected Commodity ",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "CommodityInwardType",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "PreStackCommodityID ",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "PreStackCommodityQty",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "CCBankerID ",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "FundingRequired ",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "Rent",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "GGRevenueSharingRatio",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "SecurityDepositeMonth",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "AdvanceRent",
    }),
    columnHelper.accessor("bank_name", {
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
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "NoticePeriodMonth",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "ProjectionPlanFilePath",
    }),
    columnHelper.accessor("bank_name", {
      cell: (info) => info.getValue(),
      header: "OwnerIntentionLetterFilePath",
    }),

    columnHelper.accessor("region.region_name", {
      cell: (info) => info.getValue(),
      header: "Remarks ",
    }),
    columnHelper.accessor("state.state_name", {
      cell: (info) => info.getValue(),
      header: "CMProposalBusinessFormFilePath ",
    }),
    columnHelper.accessor("bank_address", {
      cell: (info) => info.getValue(),
      header: "L1UserID",
    }),
    columnHelper.accessor("bank_address", {
      cell: (info) => info.getValue(),
      header: "L2UserID",
    }),
    columnHelper.accessor("bank_address", {
      cell: (info) => info.getValue(),
      header: "DocumentID",
    }),
    columnHelper.accessor("bank_address", {
      cell: (info) => info.getValue(),
      header: "InspectionAssignedTo",
    }),
    columnHelper.accessor("bank_address", {
      cell: (info) => info.getValue(),
      header: "CreationDate",
    }),
    columnHelper.accessor("bank_address", {
      cell: (info) => info.getValue(),
      header: "LastUpdateDate",
    }),

    columnHelper.accessor("active", {
      // header: "ACTIVE",
      header: () => <Text id="active_col">Active</Text>,
      cell: (info) => (
        <Box id="active_row">
          <Switch
            size="md"
            colorScheme="whatsapp"
            onChange={(e) => handleActiveDeActive(e, info)}
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
      header: () => <Text id="update_col">UPDATE</Text>,
      cell: (info) => (
        <Flex justifyContent="center" color="primary.700" id="update_row">
          <BiEditAlt
            // color="#A6CE39"
            fontSize="26px"
            cursor="pointer"
            // onClick={() => editForm(info)}
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
      />
    </div>
  );
}

export default HiringProposalMaster;
