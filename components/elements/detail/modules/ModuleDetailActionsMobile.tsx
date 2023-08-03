import React from 'react';
import {  useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
// import { addToCart } from '~/store/slices/cartSlice';

const ModuleDetailActionsMobile = ({  product }:{product:ProductInfo}) => {
    const Router = useRouter();
    const dispatch = useDispatch()

    // const productItem: ProductItem = { pId: product.Id, quantity: 1, thumbnail: product.MainPictureUrl, rating: 2, price: product.Price.ConvertedPriceList.Internal.Price, title: product.Title }

    function handleAddItemToCart(e: any) {
        e.preventDefault();
        // addToCart(dispatch, productItem)
    }


    const handleBuyNow = (e:any) => {
        e.preventDefault();
        // addToCart(dispatch, productItem)
        Router.push('/account/checkout');
    };

    return (
        <div className="ps-product__actions-mobile">
            <a
                className="ps-btn ps-btn--black"
                href="#"
                onClick={(e) => handleAddItemToCart(e)}>
                Сагслах
            </a>
            <a className="ps-btn" style={{whiteSpace:"nowrap"}} href="#" onClick={(e) => handleBuyNow(e)}>
                Худалдаж авах
            </a>
        </div>
    );
};

export default ModuleDetailActionsMobile;
