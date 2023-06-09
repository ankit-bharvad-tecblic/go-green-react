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

function FunctionalTable({ setFilter, filterFields, columns, data }) {
  const [sorting, setSorting] = React.useState([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
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

  const onSearch = (e) => {
    setFilter((prev) => ({
      ...prev,
      search: e.target.value,
    }));
  };

  return (
    <Box border="0px" p="30px" borderRadius="15px" background="white">
      <Flex justifyContent="space-between" alignItems="center">
        <Flex gap="5px" alignItems="center">
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
            {[10, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </Select>
          <Text color="gray.600" fontSize="sm" flex="none">
            ITEM PER PAGE
          </Text>
        </Flex>
        <Flex gap="20px" flex="none">
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
              placeholder="type here...."
              color="#A0AEC0"
              fontWeight="600"
              borderRadius="15px"
            />
          </InputGroup>
        </Flex>
      </Flex>

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
                  >
                    <Flex
                      gap="7px"
                      justifyContent="center"
                      alignContent="center"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.id !== "UPDATE" ? (
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
                      )}
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
          {table?.getRowModel().rows?.length === 0 && (
            <Tr>
              <Td colSpan={6}>
                <Box width="full">
                  <Text textAlign="center" color="primary.700">
                    Not Found
                  </Text>
                </Box>
              </Td>
            </Tr>
          )}
          {table?.getRowModel().rows?.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                const meta = cell.column.columnDef.meta;
                return (
                  <Td
                    key={cell.id}
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
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Flex justifyContent="end" mt="45px" gap="3px">
        <Button
          variant="ghost"
          p="5px"
          onClick={() => table.previousPage()}
          isDisabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </Button>
        <Button
          p="5px"
          color="secondary.500"
          bg="secondary.100"
          borderRadius="4px"
        >
          1
        </Button>
        <Button isDisabled="true" p="5px" variant="ghost">
          2
        </Button>
        <Button isDisabled="true" p="5px" variant="ghost">
          3
        </Button>
        <Button isDisabled="true" p="5px" variant="ghost">
          4
        </Button>
        <Button isDisabled="true" p="5px" variant="ghost">
          5
        </Button>
        <Button
          variant="ghost"
          onClick={() => table.nextPage()}
          isDisabled={
            !table.getCanNextPage() ||
            table.getState().pagination.pageIndex + 1 === table.getPageCount()
          }
        >
          {">"}
        </Button>
      </Flex>
    </Box>
  );
}

export default FunctionalTable;
