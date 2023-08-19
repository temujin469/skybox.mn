import { Box, StackDivider, Table, TableContainer, Tbody, Td, Tr, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import useBatchGetSimplifiedItemFullInfo from '~/apiCall/otapi/useBatchGetSimplifiedItemFullInfo';
import useGetItemFullInfo from '~/apiCall/otapi/useGetItemFullInfo';

const PartialSpecification = () => {
  const router = useRouter()

  const pid = router.query.pid

  const { data, isLoading } = useBatchGetSimplifiedItemFullInfo({ variables: { id: pid as string } });
  const productInfos = data?.Result?.Item?.Properties;

  return (
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
      {
        productInfos?.map(info=>(
          <Box key={info.Id} gap={2} display="flex" px={[4, 6]}  alignItems={"center"} w="100%" h="fit-content">
            <Box maxW="270px" w="full">{info.DisplayName}</Box>
            <Box>{info.Value.map(val=>val.DisplayName).join(" ")}</Box>
          </Box>
        ))
      }
      
    </VStack>
  );
}

export default PartialSpecification;
