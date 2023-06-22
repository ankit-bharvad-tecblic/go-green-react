const filterFields = [
  {
    "COMMODITY GRADE NAME": "commodity_grade",
    isActiveFilter: false,
    label: "COMMODITY GRADE NAME",
    name: "commodity_grade",
    placeholder: "COMMODITY GRADE NAME",
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
