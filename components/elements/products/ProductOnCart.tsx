import React from 'react';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';
import { formatCurrency } from '~/utilities/product-helper';
import { Box, Text } from '@chakra-ui/react';

type Props = {
    product:ProductItem
    children:React.ReactNode
}

const ProductOnCart = ({ product, children }:Props) => {
    const { title } = useProduct();

    return (
        <div className="ps-product--cart-mobile">
            <div className="ps-product__thumbnail">
                <Link href={`/product/${product.pId}?cId=${product.cId}`}>
                    <img src={product.image} style={{
                        objectFit:"cover",
                        borderRadius:"5px"
                    }}/>
                </Link>
            </div>
            <Box overflow="hidden" className="ps-product__content">
                {title(product)}
                <Text>
                        {formatCurrency(product.price)}₮ x {product.quantity}
                </Text>{' '}
                {children}
            </Box>
        </div>
    );
};

export default ProductOnCart;
