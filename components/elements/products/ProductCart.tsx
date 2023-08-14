import React from 'react';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';
import { AspectRatio, Box } from '@chakra-ui/react';
import BlurImage from '../BlurImage';

const ProductCart = ({ product }:{product:ProductItem}) => {
    const { title } = useProduct();
    return (
        <Box className="ps-product--cart" maxW="300px">
            <div className="ps-product__thumbnail">
                <Link href={`/product/${product.pId}?cId=${product.cId}`}>
                    <AspectRatio ratio={1}>
                        <BlurImage src={product.image} fill />
                    </AspectRatio>
                </Link>
            </div>
            <Box className="ps-product__content" width="100%" overflow="hidden">{title(product)}</Box>
        </Box>
    );
};

export default ProductCart;
