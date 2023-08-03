import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { RootState } from '~/store/store';
import ModuleEcomerceCartItems from '~/components/ecomerce/modules/ModuleEcomerceCartItems';
import { formatCurrency } from '~/utilities/product-helper';
import { Box, Button, Heading } from '@chakra-ui/react';

const PanelCartMobile = () => {
    const cart = useSelector((state: RootState) => state.cart)



    const footerView = (
        <Box p={3} className="absolute bottom-0 left-0 right-0 w-full border-t">

            {
                cart.cartItems?.length > 0 ? (
                    <>
                        <Heading size="md" mb="5px">Нийт дүн: {formatCurrency(cart.amount!)}₮</Heading>
                        <Link href="/account/checkout">
                            <Button size="lg" w="100%">
                                Тооцоо хийх
                            </Button>
                        </Link>
                    </>
                ) : (
                    <Link href="/shop">
                        <p className="ps-btn ps-btn--fullwidth">дэлгүүр явах</p>
                    </Link>
                )
            }
        </Box>)

    return (
        <Box p={3}>
            <ModuleEcomerceCartItems />
            {footerView}
        </Box>
    );
};
export default PanelCartMobile
