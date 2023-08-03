import React from 'react';
import Link from 'next/link';
import Rating from '~/components/elements/Rating';
import useProduct from '~/hooks/useProduct';
import { Box } from '@chakra-ui/react';

const ProductHorizontal = ({ product }:{product:ProductInfo}) => {
    const {  price, title } = useProduct();
    return (
        <Box border="1px" borderColor="transparent" p={2} rounded={5} _hover={{
            borderColor:"gray.200",
        }} className="ps-product--horizontal">
            <div className="ps-product__thumbnail">
                <Link href="/product/[pid]" as={`/product/${product.Id}`}>
                    <img
                    src={product.MainPictureUrl}
                    style={{
                        aspectRatio:"1/1",
                        borderRadius:"5px",
                    }}
                    />
                </Link>
            </div>
            <Box className="ps-product__content" overflow="hidden">
                {title({title:product.Title,pId:product.Id})}
                {/* <div className="ps-product__rating">
                    <Rating />
                </div> */}
                {price(product)}
            </Box>
        </Box>
    );
};

export default ProductHorizontal;
