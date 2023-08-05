import React from 'react';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';
import { formatCurrency } from '~/utilities/product-helper';
import { AspectRatio, Box, Text } from '@chakra-ui/react';
import BlurImage from '../BlurImage';

type Props = {
    product: ProductItem
    children: React.ReactNode
}

const ProductOnCart = ({ product, children }: Props) => {
    const { title } = useProduct();

    return (
        <Box className="ps-product--cart-mobile" alignItems="center">
            <Link href={`/product/${product.pId}?cId=${product.cId}`} style={{
                width:"80px"
            }}>
                <AspectRatio ratio={1} height="80px" width="80px">
                    <BlurImage fill src={product.image} style={{
                        objectFit: "cover",
                        borderRadius: "5px"
                    }} />
                </AspectRatio>
            </Link>
            <Box overflow="hidden" className="ps-product__content">
                {title(product)}
                <Text>
                    {formatCurrency(product.price)}₮ x {product.quantity}
                </Text>{' '}
                {children}
            </Box>
        </Box>
    );
};

export default ProductOnCart;
