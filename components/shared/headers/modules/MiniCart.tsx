import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import ProductOnCart from '~/components/elements/products/ProductOnCart';
import type { RootState } from '~/store/store';
import { removeCartItem } from '~/store/slices/cartSlice';
import { formatCurrency } from '~/utilities/product-helper';
import { Box, Button, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const MiniCart = () => {
    const cart = useSelector((state: RootState) => state.cart);
    const auth = useSelector((state: RootState) => state.auth);
    const isAuth = Boolean(auth.user);
    const router = useRouter()

    const dispatch = useDispatch()


    const handleCheckout = () => {
        if (!auth.isLoading) {
            if (!isAuth) {
               return router.push("/account/register")
            }
            router.push("/account/checkout")
        }
    }


    function handleRemoveItem(e: React.MouseEvent<HTMLDivElement, MouseEvent>, productId: string) {
        e.preventDefault();
        removeCartItem(dispatch, productId)
    }

    let cartItemsView;
    if (cart.cartItems && cart.cartItems.length > 0) {
        const productItems = cart.cartItems.map((item) => {
            return (
                <ProductOnCart product={item} key={item.cId}>
                    <div
                        className="ps-product__remove"
                        onClick={(e) => handleRemoveItem(e, item.cId)}>
                        <i className="icon-cross"></i>
                    </div>
                </ProductOnCart>
            );
        });
        cartItemsView = (
            <div className="ps-cart__content">
                <div className="ps-cart__items">{productItems}</div>
                <div className="ps-cart__footer">
                    <Box display="flex" mb={3} justifyContent="space-between">
                        <Heading>
                            Нийт:
                        </Heading>
                        <Heading color="red.400">{cart.amount ? formatCurrency(cart.amount) : 0}₮</Heading>
                    </Box>
                    <Box display="flex" gap={3} justifyContent="space-between" w="100%">
                        <Link href="/account/shopping-cart" style={{
                            flexGrow: "1"
                        }}>
                            <Button variant="solid" size="lg" width="100%">
                                Дэлгэрэнгүй
                            </Button>
                        </Link>

                        <Button style={{
                            flexGrow: "1"
                        }} onClick={handleCheckout} variant="brand" size="lg">
                            Тооцоо хийх

                        </Button>
                    </Box>
                </div>
            </div>
        );
    } else {
        cartItemsView = (
            <div className="ps-cart__content">
                <div className="ps-cart__items">
                    <span>Таны сагс хоосон байна!</span>
                </div>
            </div>
        );
    }

    return (
        <div className="ps-cart--mini">
            <a className="header__extra" href="#">
                <i className="icon-bag2"></i>
                <span>
                    <i>{cart.cartItems ? cart.cartItems.length : 0}</i>
                </span>
            </a>
            {cartItemsView}
        </div>
    );
};

export default MiniCart;
