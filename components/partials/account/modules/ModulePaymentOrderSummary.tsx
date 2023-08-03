import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { formatCurrency } from '~/utilities/product-helper';
import useSettings from '~/apiCall/strapi/useSettings';

type Props = {
    shipping?:boolean
}

const ModulePaymentOrderSummary = ({ shipping }:Props) => {

    const {data} = useSettings();
    const shippingFee = data?.data.attributes.deliver_fee

    const cart = useSelector((state:RootState)=>state.cart)

    // view
    let listItemsView, shippingView, totalView;
    if (cart && cart.cartItems.length > 0) {
        listItemsView = cart.cartItems.map((item) => (
            <Link href={`/product/${item.pId}?${item.cId}`} target='_blank' key={item.cId}>
                    <strong>
                        {item.title}
                        <span>x{item.quantity}</span>
                    </strong>
                    <small>{item.quantity * item.price}₮</small>
            </Link>
        ));
    } else {
        listItemsView = <p>Бүтээгдэхүүн байхгүй.</p>;
    }
    if (shipping) {
        shippingView = (
            <figure>
                <figcaption>
                    <strong>хүргэлтийн төлбөр</strong>
                    <small>{formatCurrency(shippingFee!)}₮</small>
                </figcaption>
            </figure>
        );
        totalView = (
            <figure className="ps-block__total">
                <h3>
                    ТӨЛӨХ ДҮН
                    <strong>{cart.amount ? formatCurrency(cart.amount + Math.ceil(shippingFee!)) : null}₮</strong>
                </h3>
            </figure>
        );
    } else {
        totalView = (
            <figure className="ps-block__total">
                <h3>
                    ТӨЛӨХ ДҮН
                    <strong>{cart.amount ? formatCurrency(cart.amount) : null}₮</strong>
                </h3>
            </figure>
        );
    }
    return (
        <div className="ps-block--checkout-order">
            <div className="ps-block__content">
                <figure className="ps-block__items">{listItemsView}</figure>
                <figure>
                    <figcaption>
                        <strong>Нийт</strong>
                        <small>{cart.amount ? formatCurrency(cart.amount) : null}₮</small>
                    </figcaption>
                </figure>
                {shippingView}
                {totalView}
            </div>
        </div>
    );
};
export default ModulePaymentOrderSummary;
