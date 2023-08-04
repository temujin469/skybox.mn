import { Box, StackDivider, Table, TableContainer, Tbody, Td, Tr, VStack } from '@chakra-ui/react';
import React from 'react';

const PartialSpecification = () => (
  // <TableContainer border="1px" borderColor="gray.100" rounded="5px">
  //   <Table __css={{ 'table-layout': 'fixed', width: 'full' }} variant="striped" colorScheme='yellow'>
  //     <Tbody columnGap={2}>
  //       <Tr>
  //         <Td maxW={300}>Бүтээгдэхүүний нэр:</Td>
  //         <Td></Td>
  //       </Tr>
  //       <Tr>
  //         <Td maxW="300px">Бүтээгдэхүүний дугаар:</Td>
  //         <Td>Ear Hook</Td>
  //       </Tr>
  //       <Tr>
  //         <Td maxW="300px">Жагсаалт:</Td>
  //         <Td>Yes</Td>
  //       </Tr>
  //       <Tr>
  //         <Td maxW="300px">Хэв маяг:</Td>
  //         <Td> inches</Td>
  //       </Tr>
  //       <Tr>
  //         <Td maxW="300px">Биеийн жин:</Td>
  //         <Td>6.61 pounds</Td>
  //       </Tr>
  //       <Tr>
  //         <Td maxW="300px">Агуулахын карт:</Td>
  //         <Td>20 hours</Td>
  //       </Tr>
  //       <Tr>
  //         <Td maxW="300px">Загвар:</Td>
  //         <Td>Yes</Td>
  //       </Tr>
  //     </Tbody>
  //   </Table>
  // </TableContainer>
  <VStack border="1px" borderColor="gray.200" rounded="5px" overflow="hidden" divider={<StackDivider borderColor='gray.200' />}>
    <Box display="flex" px={[4,6]} pt="7px" alignItems={"center"} w="100%" h='50px'>
      <Box maxW="270px" w="full">Бүтээгдэхүүний нэр:</Box>
      <Box>Бүтээгдэхүүн</Box>
    </Box>
    <Box display="flex" px={[4, 6]} alignItems={"center"} w="100%" h='40px'>
      <Box maxW="270px" w="full">Бүтээгдэхүүний дугаар:</Box>
      <Box>Бүтээгдэхүүн</Box>
    </Box>
    <Box display="flex" px={[4, 6]} alignItems={"center"} w="100%" h='40px'>
      <Box maxW="270px" w="full">Бүтээгдэхүүний нэр:</Box>
      <Box>Бүтээгдэхүүн</Box>
    </Box>
    <Box display="flex" px={[4, 6]} alignItems={"center"} w="100%" h='40px'>
      <Box maxW="270px" w="full">Жагсаалт:</Box>
      <Box>Бүтээгдэхүүн</Box>
    </Box>
    <Box display="flex" px={[4, 6]} alignItems={"center"} w="100%" h='40px'>
      <Box maxW="270px" w="full">Хэв маяг:</Box>
      <Box>Бүтээгдэхүүн</Box>
    </Box>
    <Box display="flex" px={[4, 6]} alignItems={"center"} w="100%" h='40px'>
      <Box maxW="270px" w="full">Загвар:</Box>
      <Box>Бүтээгдэхүүн</Box>
    </Box>
    <Box display="flex" px={[4, 6]} alignItems={"center"} w="100%" h='40px'>
      <Box maxW="270px" w="full">Биеийн жин:</Box>
      <Box>Бүтээгдэхүүн</Box>
    </Box>
    <Box display="flex" px={[4, 6]} alignItems={"center"} pb="7px" w="100%" h='50px'>
      <Box maxW="270px" w="full">Агуулахын карт:</Box>
      <Box>Бүтээгдэхүүн</Box>
    </Box>
  </VStack>
);

export default PartialSpecification;
