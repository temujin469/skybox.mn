import React, { useEffect } from 'react';
import { BackTop } from 'antd';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';

import PageLoader from '~/components/elements/media/common/PageLoader';
import NavigationList from '~/components/shared/navigation/NavigationList';
import { addToCart } from '~/store/slices/cartSlice';
import { addToCompare } from '~/store/slices/compareSlice';
import { addToWishlist } from '~/store/slices/wishlistSlice';

const MasterLayout = ({ children }:{children:React.ReactNode}) => {
    const dispatch = useDispatch();
    const [cookies] = useCookies(['cart', 'compare', 'wishlist']);

    function initEcomerceValues() {
        if (cookies) {
            if (cookies.cart) {
                addToCart(dispatch, cookies.cart)
            }
            if (cookies.wishlist) {
                addToWishlist(dispatch, cookies.wishlist)
            }
            if (cookies.compare) {
                addToCompare(dispatch, cookies.compare)
            }
        }
    }

    useEffect(() => {
        initEcomerceValues();
    }, []);

    return (
        <>
            {children}
            <PageLoader />
            <NavigationList />
            <BackTop>
                <button className="ps-btn--backtop">
                    <i className="icon-arrow-up" />
                </button>
            </BackTop>
        </>
    );
};

export default MasterLayout;
