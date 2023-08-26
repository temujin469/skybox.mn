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
    <VStack rounded="5px" overflow="hidden" divider={<StackDivider borderColor='gray.200' borderStyle="dashed" />}>
      {
        productInfos?.map(info=>{

          // remove colors info
          return info.Id !== "1627207" && info.DisplayName != "Биеийн бүрэн" ? (
            <Box key={info.Id} gap={2} display="flex" px={[4, 6]} alignItems={"center"} w="100%" h="fit-content">
              <Box maxW="270px" w="full">{info.DisplayName}</Box>
              <Box>{info.Value.map(val => val.DisplayName).join(" ")}</Box>
            </Box>
          ) : null
        })
      }
      
    </VStack>
  );
}

export default PartialSpecification;
