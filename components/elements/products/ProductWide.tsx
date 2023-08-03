import React from 'react';
import Link from 'next/link';
import { Box, Heading } from '@chakra-ui/react';
import { formatCurrency } from '~/utilities/product-helper';
import ThumbnailDefault from '../detail/thumbnail/ThumbnailDefault';

const ProductWide = ({ product }: { product: ProductInfo }) => {
    return (
        <Link href={`/product/${product.Id}`}>
            <Box padding="10px" _hover={{
                borderColor: "gray.400"
            }} mb="10px" border="1px" borderRadius={5} borderColor="gray.200" overflow="hidden" display="flex" gap={3}>
                <ThumbnailDefault product={product} />
                <Box>
                    <Heading display={{ base: "none", md: "block" }} color="gray.600" mb={5} size="sm">{product.Title}</Heading>
                    {
                        product.PromotionPrice && (
                            <Heading color="gray.500" size="md" textDecorationLine="line-through" >{formatCurrency(product.PromotionPrice.ConvertedPriceList.Internal.Price)}</Heading>
                        )
                    }
                    <Heading color="red.400" size="md">{formatCurrency(product.Price.ConvertedPriceList.Internal.Price)}₮</Heading>
                </Box>
            </Box>
        </Link>
       
    );
};

export default ProductWide;
