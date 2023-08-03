import { Table, TableContainer, Tbody, Td, Tr } from '@chakra-ui/react';
import React from 'react';

const PartialSpecification = () => (
  <TableContainer border="1px" borderColor="gray.100" rounded="5px">
    <Table variant="striped" colorScheme='yellow'>
      <Tbody>
        <Tr>
          <Td>Бүтээгдэхүүний нэр:</Td>
          <Td></Td>
        </Tr>
        <Tr>
          <Td>Бүтээгдэхүүний дугаар:</Td>
          <Td>Ear Hook</Td>
        </Tr>
        <Tr>
          <Td>Жагсаалт:</Td>
          <Td>Yes</Td>
        </Tr>
        <Tr>
          <Td>Хэв маяг:</Td>
          <Td> inches</Td>
        </Tr>
        <Tr>
          <Td>Биеийн жин:</Td>
          <Td>6.61 pounds</Td>
        </Tr>
        <Tr>
          <Td>Агуулахын карт:</Td>
          <Td>20 hours</Td>
        </Tr>
        <Tr>
          <Td>Загвар:</Td>
          <Td>Yes</Td>
        </Tr>
      </Tbody>
    </Table>
  </TableContainer>
);

export default PartialSpecification;
