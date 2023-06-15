import React, { useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Flex,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Switch,
  Select,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  Checkbox,
} from "@chakra-ui/react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { BsArrowDown, BsArrowUp, BsPlusCircle, BsSearch } from "react-icons/bs";
import { useDebouncedCallback } from "use-debounce";
import { CSVLink } from "react-csv";

function FunctionalTable({ setFilter, filterFields, columns, data, loading }) {
  const [sorting, setSorting] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [csvHeaders, setCsvHeaders] = React.useState([]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      globalFilter,
    },
  });

  const handleFilterChange = (e, index) => {
    let isChecked = e.target.checked;
    const updatedFilterFields = [...filterFields];
    updatedFilterFields[index].isActiveFilter = isChecked;

    const activeFilterValues = updatedFilterFields
      .filter((field) => field.isActiveFilter) // Filter the objects where isActiveFilter is true
      .map((field) => Object.values(field)[0]); // Get the values of the filtered objects

    setFilter((prev) => ({
      ...prev,
      filter: activeFilterValues,
    }));
  };

  const debounced = useDebouncedCallback((value) => {
    console.log("value ===> ", value);
    //  setPagination((prev) => ({ ...prev, search: value }));
    setFilter((prev) => ({
      ...prev,
      search: value,
    }));
  }, 500);

  const onSearch = (e) => {
    debounced(e.target.value);
  };

  useEffect(() => {
    setCsvHeaders(() =>
      columns.map((col) => ({ label: col.header, key: col.accessorKey }))
    );
  }, []);

  return (
    <Box border="0px" p="30px" borderRadius="15px" background="white">
      <Flex
        // direction={{ base: "column", md: "column", lg: "column", xl: "row" }}
        wrap="wrap"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex
          gap="10px"
          mb={{ base: 2, xl: 0 }}
          maxWidth={["100%", "100%", "50%"]}
          alignItems="center"
        >
          <Select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            size="xs"
            borderRadius="8px"
            bg="#5E63661433"
            border="0px"
            color="#8B8D97"
            fontWeight="semibold"
          >
            {[1, 2, 3].map((pageSize) => (
              <option key={`page_size${pageSize}`} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </Select>
          <Text color="gray.600" fontSize="sm" flex="none">
            ITEM PER PAGE
          </Text>
        </Flex>
        <Flex gap="5px" alignItems="center">
          <Text fontSize="16px">Search:</Text>
          <Input
            value={globalFilter ?? ""}
            onChange={(e) => {
              console.log(e);
              setGlobalFilter(String(e.target.value));
            }}
            className="mx-1 p-2 font-lg shadow border border-block"
            placeholder="Search all columns..."
          />
        </Flex>
        <Flex
          gap="20px"
          // direction={{
          //   base: "column",
          //   sm: "row",
          //   md: "row",
          //   lg: "row",
          //   xl: "row",
          // }}
          wrap="wrap"
        >
          <Button
            leftIcon={<BsPlusCircle bg="gray.600" />}
            borderColor="border_light.100"
            variant="outline"
            p="0px 40px"
            height="43px"
            borderRadius="15px"
            color="gray.600"
          >
            Add Details
          </Button>

          <Button
            leftIcon={<BsPlusCircle bg="gray.600" />}
            borderColor="border_light.100"
            variant="outline"
            p="0px 40px"
            height="43px"
            borderRadius="15px"
            color="gray.600"
          >
            <CSVLink data={data} headers={csvHeaders} filename="data.csv">
              Export to CSV
            </CSVLink>
          </Button>

          <Popover autoFocus={false}>
            <PopoverTrigger>
              <Flex
                border="1px"
                borderColor="border_light.100"
                gap="5px"
                width="200px"
                alignItems="center"
                justifyContent="space-between"
                borderRadius="15px"
                padding="10px 10px"
                cursor="pointer"
              >
                <Text fontSize="14px" color="gray.600">
                  Employee id, Username{" "}
                </Text>
                <AiOutlineCloseCircle color="gray.600" />
              </Flex>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader fontSize="sm" pl="35px">
                Filter
              </PopoverHeader>
              <PopoverBody bg="primary.100">
                {filterFields.map((field, index) => {
                  const keyName = Object.keys(field)[0];
                  return (
                    <Flex
                      key={index}
                      justifyContent="space-between"
                      p="12px 0px"
                      alignItems="center"
                      bg="primary.100"
                    >
                      <Text fontSize="sm"> {keyName} </Text>
                      <Checkbox
                        size="md"
                        onChange={(e) => handleFilterChange(e, index)}
                        name={keyName}
                        outline={"red"}
                        isFocusable={false}
                        colorScheme="green"
                      />
                    </Flex>
                  );
                })}
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <InputGroup
            width="200px"
            borderRadius="15px"
            variant="custom"
            border="1px solid #E2E8F0"
          >
            <InputLeftElement pointerEvents="none">
              <BsSearch color="#A0AEC0" />
            </InputLeftElement>
            <Input
              type="search"
              onChange={(e) => onSearch(e)}
              placeholder="Type here...."
              _placeholder={{ color: "gray.600" }}
              fontWeight="600"
              color="#A0AEC0"
              borderRadius="15px"
            />
          </InputGroup>
        </Flex>
      </Flex>
      <Box maxWidth={"100%"} width={"calc(100% - 60px)"} overflowX={"auto"}>
        <Table mt="15px">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                  const meta = header.column.columnDef.meta;
                  return (
                    <Th
                      key={header.id}
                      // onClick={header.column.getToggleSortingHandler()}
                      isNumeric={meta?.isNumeric}
                      p="12px 0px"
                      textAlign="center"
                      fontSize="12px"
                      fontWeight="bold"
                      color="black"
                      cursor="pointer"
                    >
                      <Flex
                        gap="7px"
                        justifyContent="center"
                        alignContent="center"
                      >
                        <Text>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </Text>
                        <Box onClick={header.column.getToggleSortingHandler()}>
                          {header.id !== "UPDATE" ? (
                            header.column.getIsSorted() ? (
                              header.column.getIsSorted() === "desc" ? (
                                <Flex>
                                  <BsArrowDown color="black" fontSize="14px" />
                                  <Box ml="-7px">
                                    <BsArrowUp
                                      color="#B6B7BC"
                                      fontSize="14px"
                                    />
                                  </Box>
                                </Flex>
                              ) : (
                                // <TriangleDownIcon aria-label="sorted descending" />
                                <Flex>
                                  <BsArrowDown
                                    color="#B6B7BC"
                                    fontSize="14px"
                                  />
                                  <Box ml="-7px">
                                    <BsArrowUp color="black" fontSize="14px" />
                                  </Box>
                                </Flex>
                              )
                            ) : (
                              <Flex>
                                <BsArrowDown color="#B6B7BC" fontSize="14px" />
                                <Box ml="-7px">
                                  <BsArrowUp color="#B6B7BC" fontSize="14px" />
                                </Box>
                              </Flex>
                            )
                          ) : (
                            <></>
                          )}
                        </Box>
                      </Flex>
                      <Box
                        borderTop={"1px solid #E2E8F0"}
                        height={"40px"}
                        mt="10px"
                      >
                        {header.column.getCanFilter() ? (
                          <Box pt="10px" px="5px">
                            <Filter column={header.column} table={table} />
                          </Box>
                        ) : null}
                      </Box>
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {!loading && table?.getRowModel().rows?.length === 0 && (
              <Tr>
                <Td colSpan={columns.length}>
                  <Box width="full">
                    <Text textAlign="center" color="primary.700">
                      Not Found
                    </Text>
                  </Box>
                </Td>
              </Tr>
            )}

            {loading && (
              <Tr>
                <Td colSpan={columns.length}>
                  <Box width="full">
                    <Text textAlign="center" color="primary.700">
                      Loading...
                    </Text>
                  </Box>
                </Td>
              </Tr>
            )}

            {!loading &&
              table?.getRowModel().rows?.map((row) => (
                <Tr key={`'table_row_${row.id}`}>
                  {row.getVisibleCells().map((cell) => {
                    // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                    const meta = cell.column.columnDef.meta;
                    return (
                      <Td
                        key={`table_${cell.id}`}
                        isNumeric={meta?.isNumeric}
                        p="20px 0px"
                        textAlign="center"
                        fontSize="14px"
                        color="#718096"
                      >
                        {cell.column.id === "UPDATE" ? (
                          <Flex justifyContent="center">
                            <BiEditAlt
                              color="primary.700"
                              fontSize="26px"
                              cursor="pointer"
                            />
                          </Flex>
                        ) : cell.column.id === "active" ? (
                          <Switch
                            size="md"
                            colorScheme="whatsapp"
                            // isReadOnly
                            // isChecked={flexRender(
                            //   cell.column.columnDef.cell,
                            //   cell.getContext()
                            // )}
                          />
                        ) : (
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
      <Flex justifyContent="end" alignItems="center" mt="45px" gap="3px">
        <Button
          variant="ghost"
          p="5px"
          onClick={() => table.setPageIndex(0)}
          isDisabled={!table.getCanPreviousPage() || loading}
        >
          {"<<"}
        </Button>
        <Button
          variant="ghost"
          p="5px"
          onClick={() => table.previousPage()}
          isDisabled={!table.getCanPreviousPage() || loading}
        >
          {"<"}
        </Button>
        <Text fontSize="18px"> Page </Text>
        <Button
          p="5px"
          color="secondary.500"
          bg="secondary.100"
          borderRadius="4px"
        >
          {table.getState().pagination.pageIndex + 1}
        </Button>
        <Text fontSize="18px"> of {table.getPageCount()} </Text>
        <Button
          variant="ghost"
          onClick={() => table.nextPage()}
          isDisabled={!table.getCanNextPage() || loading}
        >
          {">"}
        </Button>
        <Button
          variant="ghost"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          isDisabled={!table.getCanNextPage() || loading}
        >
          {">>"}
        </Button>
        <Text fontSize="18px" borderLeft="1px" pl="10px">
          {" "}
          Go to page{" "}
        </Text>
        {/* <Input
          type="number"
          value={filter.page}
          onChange={(e) => {
            if (
              Number(e.target.value) <= filter.totalPage &&
              Number(e.target.value) > 0
            ) {
              setFilter((old) => ({ ...old, page: Number(e.target.value) }));
            }
          }}
          disabled={loading}
          width="70px"
          ml="10px"
        /> */}
        <Select
          disabled={loading}
          width="70px"
          ml="10px"
          value={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            table.setPageIndex(Number(e.target.value) - 1);
          }}
        >
          {Array.from(Array(table.getPageCount() || 2 - 1)).map(
            (item, index) => (
              <option value={index + 1}> {index + 1} </option>
            )
          )}
        </Select>
      </Flex>
    </Box>
  );
}

function Filter({ column, table }) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  // console.log(column);

  return column.id === "id" ||
    column.id === "state_tin_no" ||
    column.id === "state_gstn" ? (
    <Box height="30px" width="100px"></Box>
  ) : typeof firstValue === "number" ? (
    <Flex gap="3px">
      <Input
        height={"30px"}
        width={"55px"}
        type="number"
        value={columnFilterValue?.[0] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old) => [e.target.value, old?.[1]])
        }
        px={"5px"}
        placeholder={`Min`}
        className="border shadow rounded"
      />
      <Input
        height={"30px"}
        width="55px"
        type="number"
        value={columnFilterValue?.[1] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old) => [old?.[0], e.target.value])
        }
        px={"5px"}
        placeholder={`Max`}
        className="w-36 border shadow rounded"
      />
    </Flex>
  ) : (
    <Input
      height={"30px"}
      type="text"
      value={columnFilterValue ?? ""}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className="border shadow rounded"
    />
  );
}

export default FunctionalTable;
