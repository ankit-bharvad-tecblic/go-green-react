/* eslint-disable react/no-array-index-key */
// Chakra imports
import {
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import TablesTableRow from "components/Tables/TablesTableRow";
import React from "react";

function Authors({ title, captions, data }) {
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p="6px 0px 22px 0px">
        <Text fontSize="xl" color={textColor} fontWeight="bold">
          {title}
        </Text>
      </CardHeader>
      <CardBody>
        <Table variant="simple" color={textColor}>
          <Thead>
            <Tr my=".8rem" pl="0px" color="gray.400">
              {captions.map((caption, idx) => (
                <Th color="gray.400" key={idx} ps={idx === 0 ? "0px" : null}>
                  {caption}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row) => (
              <TablesTableRow
                key={`${row.email}-${row.name}`}
                name={row.name}
                logo={row.logo}
                email={row.email}
                subdomain={row.subdomain}
                domain={row.domain}
                status={row.status}
                date={row.date}
              />
            ))}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
}

export default Authors;
