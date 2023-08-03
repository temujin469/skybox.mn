import React from 'react';
import {  useSelector } from 'react-redux';
import Link from 'next/link';

import ModulePaymentShipping from '~/components/ecomerce/modules/ModulePaymentShipping';
import ModulePaymentMethods from '~/components/ecomerce/modules/ModulePaymentMethods';
import useOrder from '~/apiCall/strapi/useOrderDetail';
import { RootState } from '~/store/store';
import { useRouter } from 'next/router';
import { formatCurrency } from '~/utilities/product-helper';

const Payment = () => {
    const router = useRouter()

    const orderId = router.query.orderId
    const jwt = useSelector((state: RootState) => state.auth.token)

    const { data, isLoading } = useOrder({ variables: { jwt: jwt!, orderId: orderId as string } });

    const order = data?.data[0].attributes;

    // view
    let listItemsView, shippingView, totalView;
    if (order) {
        listItemsView = order.products.map((item) => (
            <Link href={`/product/${item.pId}?cId=${item.cId}`} target='_blank' key={item.cId}>
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
    if (order?.is_shipping_included) {
        shippingView = (
            <figure>
                <figcaption>
                    <strong>хүргэлтийн төлбөр</strong>
                    <small>{formatCurrency(10000)}₮</small>
                </figcaption>
            </figure>
        );
        totalView = (
            <figure className="ps-block__total">
                <h3>
                    ТӨЛӨХ ДҮН
                    <strong>{formatCurrency(order.total_payment)}₮</strong>
                </h3>
            </figure>
        );
    } else {
        totalView = (
            <figure className="ps-block__total">
                <h3>
                    ТӨЛӨХ ДҮН
                    <strong>{formatCurrency(order?.total_payment!)}₮</strong>
                </h3>
            </figure>
        );
    }
    return (
        <div className="ps-checkout ps-section--shopping">
            <div className="container">
                <div className="ps-section__content">
                    {/* <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                            <div className="ps-block--shipping">
                                <ModulePaymentShipping info={{isShipping:order?.is_shipping_included!,contactInfo:order?.contact_information}} />
                                <ModulePaymentMethods />
                                
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 ">
                            <div className="ps-form__orders">
                                <div className="ps-block--checkout-order">
                                    <div className="ps-block__content">
                                       {
                                        order ? (
                                            <>
                                                    <figure className="ps-block__items">{listItemsView}</figure>
                                                    <figure>
                                                        <figcaption>
                                                            <strong>Нийт</strong>
                                                            <small>{ formatCurrency(order.total_payment)}₮</small>
                                                        </figcaption>
                                                    </figure>
                                                    {shippingView}
                                                    {totalView}
                                            </>
                                        ) : (
                                            <div></div>
                                        )
                                       }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className="ps-block--shipping" style={{
                        maxWidth:"900px",
                        margin:"auto"
                    }}>
                        {/* <ModulePaymentShipping info={{ isShipping: order?.is_shipping_included!, contactInfo: order?.contact_information }} /> */}
                        <ModulePaymentMethods />
                        <div className="ps-block__footer">
                            <Link href={`/account/invoice-detail?orderId=${order?.order_id}`}>
                                <p>
                                    <i className="icon-arrow-left mr-2"></i>
                                    Буцах
                                </p>
                            </Link>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Payment
