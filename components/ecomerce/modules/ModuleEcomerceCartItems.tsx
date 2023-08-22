import React from 'react';
import { Result } from 'antd';
import CartItem from '~/components/elements/products/CardItem';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';


const ModuleEcomerceCartItems = () => {

    const cartItems = useSelector((state: RootState) => state.cart.cartItems)
    // View
    let cartItemsViews;
    if (cartItems && cartItems.length > 0) {
        const items = cartItems.map((item) => <CartItem cartItem={item} />);

        cartItemsViews = (
            <div className='flex flex-col divide-y'>
                {items}
            </div>
        );
    } else {
        cartItemsViews = (
            <Result status="warning" title="Таны сагс хоосон байна!" />
        );
    }
    return <>{cartItemsViews}</>;
};

export default ModuleEcomerceCartItems;
