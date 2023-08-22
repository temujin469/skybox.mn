import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '~/store/store';
import { formatCurrency } from '~/utilities/product-helper';

const ModuleCartSummary = () => {
    // View
    const amount = useSelector((state:RootState) =>state.cart.amount)

    return (
        <>
            <div className="">
                <Heading className='mb-4 uppercase'>Захиалгын дүн</Heading>
                    <Box mb="10px" className='flex items-center justify-between'>
                        <Text>Барааны үнэ</Text> <Heading size="sm"> {formatCurrency(amount!)}₮</Heading>
                    </Box>
                    <Box className='flex items-center justify-between'>
                       <Text>Нийт</Text> <Heading size="sm">{formatCurrency(amount!)}₮</Heading>
                    </Box>
            </div>
        </>
    );
};

export default ModuleCartSummary;
