const filterFields = [
  {
    "COMMODITY VARIETY": "commodity_variety",
    isActiveFilter: false,
    label: "COMMODITY VARIETY",
    name: "commodity_variety",
    placeholder: "COMMODITY VARIETY",
    type: "text",
  },
  {
    DESCRIPTION: "description",
    isActiveFilter: false,
    label: "DESCRIPTION",
    name: "description",
    placeholder: "DESCRIPTION",
    type: "text",
  },
  {
    "HCN CODE": "hsn_code",
    isActiveFilter: false,
    label: "HCN CODE",
    name: "hsn_code",
    placeholder: "HCN CODE",
    type: "number",
  },
  {
    "FUMIGATION REQUIRED": "fumigation_required",
    isActiveFilter: false,
    label: "FUMIGATION REQUIRED",
    name: "fumigation_required",
    placeholder: "FUMIGATION REQUIRED",
    type: "select",
    multi: false,
    options: [
      {
        label: "ACTIVE",
        value: "True",
      },
      {
        label: "DEACTIVE",
        value: "False",
      },
    ],
  },
  {
    "FUMIGATION DAYS": "fumigation_day",
    isActiveFilter: false,
    label: "FUMIGATION DAYS",
    name: "fumigation_day",
    placeholder: "FUMIGATION DAYS",
    type: "number",
  },
  {
    "LAB TESTING REQUIRED": "lab_testing_required",
    isActiveFilter: false,
    label: "LAB TESTING REQUIRED",
    name: "active",
    placeholder: "LAB TESTING REQUIRED",
    type: "select",
    multi: false,
    options: [
      {
        label: "ACTIVE",
        value: "True",
      },
      {
        label: "DEACTIVE",
        value: "False",
      },
    ],
  },
  {
    "FINAL EXPIRY DATE": "fed",
    isActiveFilter: false,
    label: "FINAL EXPIRY DATE",
    name: "fed",
    placeholder: "FINAL EXPIRY DATE",
    type: "date",
  },
  {
    "CREATION DATE": "created_at",
    isActiveFilter: false,
    label: "CREATION DATE",
    name: "created_at",
    placeholder: "CREATION DATE",
    type: "date",
  },
  {
    "LAST UPDATED DATE": "last_updated_date",
    isActiveFilter: false,
    label: "LAST UPDATED DATE",
    name: "created_at",
    placeholder: "LAST UPDATED DATE",
    type: "date",
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

export { filterFields };
