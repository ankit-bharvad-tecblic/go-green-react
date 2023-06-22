const filterFields = [
  {
    "ZONE NAME": "zone_name",
    isActiveFilter: false,
    label: "ZONE NAME",
    name: "zone_name",
    placeholder: "ZONE NAME",
    type: "text",
  },
  // {
  //   "STATE NAME": "region_name",
  //   isActiveFilter: false,
  //   label: "STATE NAME",
  //   name: "region_name",
  //   placeholder: "STATE NAME",
  //   type: "text",
  // },
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
    name: "last_updated_date",
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
