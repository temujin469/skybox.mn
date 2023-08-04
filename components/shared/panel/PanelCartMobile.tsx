import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { RootState } from '~/store/store';
import ModuleEcomerceCartItems from '~/components/ecomerce/modules/ModuleEcomerceCartItems';
import { formatCurrency } from '~/utilities/product-helper';
import { Box, Button, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const PanelCartMobile = () => {
    const cart = useSelector((state: RootState) => state.cart)
    const auth = useSelector((state: RootState) => state.auth);

    const isAuth = Boolean(auth.user);
    const router = useRouter()



    const handleCheckout = () => {
        if (!auth.isLoading) {
            if (!isAuth) {
                return router.push("/account/register")
            }
            router.push("/account/checkout")
        }
    }



    const footerView = (
        <Box p={3} className="absolute bottom-0 left-0 right-0 w-full border-t">

            {
                cart.cartItems?.length > 0 ? (
                    <>
                        <Heading size="md" mb="5px">Нийт дүн: {formatCurrency(cart.amount!)}₮</Heading>
                            <Button onClick={handleCheckout} size="lg" w="100%">
                                Тооцоо хийх
                            </Button>
                    </>
                ) : (
                    <Link href="/shop">
                        <Button size="lg" w="full">дэлгүүр</Button>
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
