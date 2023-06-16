import React from "react";
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
} from "@tanstack/react-table";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { BsArrowDown, BsArrowUp, BsPlusCircle, BsSearch } from "react-icons/bs";
import { useDebouncedCallback } from "use-debounce";
import Loader from "../Loader";
import moment from "moment";

function FunctionalTable({
  filter,
  setFilter,
  filterFields,
  columns,
  data,
  loading,
}) {
  const [sorting, setSorting] = React.useState([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    state: {
      sorting,
      columnPinning: true,
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
    // setFilter((prev) => ({
    //   ...prev,
    //   search: e.target.value,
    // }));
  };

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
            value={filter.limit}
            onChange={(e) => {
              setFilter((old) => ({
                ...old,
                limit: Number(e.target.value),
              }));
            }}
            size="xs"
            borderRadius="8px"
            bg="#5E63661433"
            border="0px"
            color="#8B8D97"
            fontWeight="semibold"
          >
            {[10, 20].map((pageSize) => (
              <option key={`page_size${pageSize}`} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </Select>
          <Text color="gray.600" fontSize="sm" flex="none">
            ITEM PER PAGE
          </Text>
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
      <Box position="relative" overflowX="auto">
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
                      onClick={header.column.getToggleSortingHandler()}
                      isNumeric={meta?.isNumeric}
                      p="12px 0px"
                      textAlign="center"
                      fontSize="12px"
                      fontWeight="bold"
                      color="black"
                      cursor="pointer"
                      minW={"150px"}
                    >
                      <Flex
                        gap="7px"
                        justifyContent="center"
                        alignContent="center"
                      >
                        <Text flex="none">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </Text>
                        {/* {header.id !== "UPDATE" ? (
                          header.column.getIsSorted() ? (
                            header.column.getIsSorted() === "desc" ? (
                              <Flex>
                                <BsArrowDown color="black" fontSize="14px" />
                                <Box ml="-7px">
                                  <BsArrowUp color="#B6B7BC" fontSize="14px" />
                                </Box>
                              </Flex>
                            ) : (
                              // <TriangleDownIcon aria-label="sorted descending" />
                              <Flex>
                                <BsArrowDown color="#B6B7BC" fontSize="14px" />
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
                        )} */}
                      </Flex>

                      {/* <chakra.span pl="4">
                      <BsArrowDownUp />
                     {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === "desc" ? (
                          <TriangleDownIcon aria-label="sorted descending" />
                        ) : (
                          <TriangleUpIcon aria-label="sorted ascending" />
                        )
                      ) : null}
                    </chakra.span> */}
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {!loading && table?.getRowModel().rows?.length === 0 && (
              <Tr>
                <Td colSpan={columns?.length}>
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
                <Td colSpan={columns?.length}>
                  <Box display={"flex"} justifyContent={"center"} width="full">
                    <Loader w="50px" h="50px" />
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
                          <Flex justifyContent="center" color="primary.700">
                            <BiEditAlt
                              // color="#A6CE39"
                              fontSize="26px"
                              cursor="pointer"
                            />
                          </Flex>
                        ) : cell.column.id === "active_test" ? (
                          <Switch
                            size="md"
                            colorScheme="whatsapp"
                            // isReadOnly
                            // isChecked={flexRender(
                            //   cell.column.columnDef.cell,
                            //   cell.getContext()
                            // )}
                          />
                        ) : cell.column.id === "first_name" ? (
                          <Text>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}{" "}
                            {cell.row.original.last_name}{" "}
                          </Text>
                        ) : cell.column.id === "created_at" ? (
                          <Text>
                            {moment(cell.row.original.created_at).format("LL")}
                          </Text>
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
          onClick={() => setFilter((old) => ({ ...old, page: 1 }))}
          isDisabled={filter.page === 1 || loading}
        >
          {"<<"}
        </Button>
        <Button
          variant="ghost"
          p="5px"
          onClick={() => setFilter((old) => ({ ...old, page: old.page - 1 }))}
          isDisabled={filter.page === 1 || loading}
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
          {filter.page}
        </Button>
        <Text fontSize="18px"> of {filter.totalPage} </Text>
        <Button
          variant="ghost"
          onClick={() => setFilter((old) => ({ ...old, page: old.page + 1 }))}
          isDisabled={filter.page === filter.totalPage || loading}
        >
          {">"}
        </Button>
        <Button
          variant="ghost"
          onClick={() => setFilter((old) => ({ ...old, page: old.totalPage }))}
          isDisabled={filter.page === filter.totalPage || loading}
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
          value={filter?.page}
          onChange={(e) => {
            if (
              Number(e.target.value) <= filter?.totalPage &&
              Number(e.target.value) > 0
            ) {
              setFilter((old) => ({ ...old, page: Number(e.target.value) }));
            }
          }}
        >
          {Array.from(Array(filter?.totalPage))?.map((item, index) => (
            <option value={index + 1}> {index + 1} </option>
          ))}
        </Select>
      </Flex>
    </Box>
  );
}

export default FunctionalTable;
