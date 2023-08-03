import React from 'react';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';
import { Box } from '@chakra-ui/react';

const ProductCart = ({ product }:{product:ProductItem}) => {
    const { title } = useProduct();
    return (
        <Box className="ps-product--cart" maxW="300px">
            <div className="ps-product__thumbnail">
                <Link href={`/product/${product.pId}?cId=${product.cId}`}>
                    <img src={product.image} style={{
                        borderRadius:"5px",
                        aspectRatio:"1/1",
                        objectFit:"cover"
                    }}/>
                </Link>
            </div>
            <Box className="ps-product__content" width="100%" overflow="hidden">{title(product)}</Box>
        </Box>
    );
};

export default ProductCart;
