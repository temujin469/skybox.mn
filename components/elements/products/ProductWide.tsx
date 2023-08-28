import React from 'react';
import Link from 'next/link';
import { Box, Center, Heading } from '@chakra-ui/react';
import { formatCurrency } from '~/utilities/product-helper';
import ThumbnailDefault from '../detail/thumbnail/ThumbnailDefault';
import { BsChevronRight } from 'react-icons/bs';

const ProductWide = ({ product }: { product: ProductInfo }) => {
    return (
            <Box className='hover:shadow-md' display="flex" gap={3} bg="white" mb="10px" borderRadius={5} overflow="hidden">
                <div className='p-[10px] pr-0'>
                <ThumbnailDefault product={product} />
                </div>
                <div className='group flex flex-[1] cursor-pointer'>
                    <Link href={`/product/${product.Id}`} className='w-full py-[10px] pr-[10px]'>
                        <Heading display={{ base: "none", md: "block" }} color="gray.600" mb={3} size="sm">{product.Title}</Heading>
                        {
                            product.PromotionPrice ? (
                                <>
                                    <Heading fontSize={{ base: "14px", md: "16px" }} color="gray.400" textDecorationLine="line-through" >{formatCurrency(product.Price.ConvertedPriceList.Internal.Price)}₮</Heading>
                                    <Heading color="red.400" size={{ base: "sm", md: "md" }} >{formatCurrency(product.PromotionPrice.ConvertedPriceList.Internal.Price)}</Heading>
                                </>

                            ) : (
                                <Heading size={{ base: "sm", md: "md" }}>{formatCurrency(product.Price.ConvertedPriceList.Internal.Price)}₮</Heading>
                            )
                        }
                    </Link>
                    <div className='p-[10px] hidden 2xl:p-[40px] w-fit md:flex text-gray-300 group-hover:text-gray-400 items-center group-hover:bg-gray-100'>
                        <BsChevronRight size={30} />
                    </div>
                </div>

            </Box>

    );
};

export default ProductWide;
