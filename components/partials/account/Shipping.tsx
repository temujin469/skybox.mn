import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ModulePaymentOrderSummary from '~/components/partials/account/modules/ModulePaymentOrderSummary';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { Radio, Spin, notification } from 'antd';
import { formatCurrency } from '~/utilities/product-helper';
import useSettings from '~/apiCall/strapi/useSettings';
import { useMutation } from '@tanstack/react-query';
import { strapiApi } from '~/utilities/axios';
import { useRouter } from 'next/router';
import { clearCartItems } from '~/store/slices/cartSlice';
import { Box, Button, Grid, GridItem } from '@chakra-ui/react';
// import useQpay from '~/hooks/qpay/useQpay';

const Shipping = () => {
    const ecomerce = useSelector((state: RootState) => state.ecomerce);
    const cart = useSelector((state: RootState) => state.cart);
    const { token, user } = useSelector((state: RootState) => state.auth)
    const [isShipping, setIsShipping] = useState(true);
    const [orderID, setOrderID] = useState<string | undefined>()
    const { data: settings } = useSettings();
    const shippingFee = settings?.data.attributes.deliver_fee;

    const [api, contextHolder] = notification.useNotification();
    const router = useRouter()
    const dispatch = useDispatch()

    function handleChangeMethod(e: any) {
        setIsShipping(e.target.value); //e.target.value
    }

    // const { getAccessToken, createInvoice } = useQpay();
    // console.log(ac)

    // useEffect(() => {
    //     console.log("access token", accessToken);
    //     if (accessToken) {
    //         createInvoice(
    //             { access_token: accessToken, callback_url: "df", invoice_description: "Order No1311 200.00", invoice_receiver_code: "83",amount:200 }
    //         )
    //     }
    // }, [accessToken])


    const makeOrderMutation = useMutation({
        mutationFn: async (body: OrderBody): Promise<OrderResponse> => {
            const res = await strapiApi.post("/orders", { data: body }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            return res.data;
        },
        onSuccess: () => {
            api.success({
                message: "Хүсэлт амжилттай",
                description: "Захиалга хийгдлээ"
            });
            router.push(`/account/payment?orderId=${orderID}`);
            clearCartItems(dispatch)
        },
        onError: () => {
            api.error({
                message: "Алдаа гарлаа",
            });
        }
    })

    // console.log(makeOrderMutation.data)

    const handleMakeOrder = async () => {
        // const tokenRes  =await  getAccessToken();
        // const accessToken = tokenRes.access_token;
        // console.log("access token", accessToken);
        //     if (accessToken) {
        //         createInvoice(
        //             { access_token: accessToken, callback_url: "df", invoice_description: "Order No1311 200.00", invoice_receiver_code: "83",amount:200 }
        //         )
        //     }

        if (user && cart.cartItems.length && cart.amount && ecomerce.contactInfo && shippingFee) {
            const ORDER_ID = `SKB${Math.random().toString().slice(2, 10)}`;
            setOrderID(ORDER_ID)

            makeOrderMutation.mutate({
                contact_information: ecomerce.contactInfo,
                user: user.id,
                order_id: ORDER_ID,
                products: cart.cartItems,
                is_shipping_included: isShipping,
                total_payment: isShipping ? (cart.amount + shippingFee) : cart.amount,
                total_product_quantity: cart.total,
                payment_status: "ХҮЛЭЭГДЭЖ БАЙГАА"
            })
        }
    }

    return (
        <div className="ps-checkout ps-section--shopping">
            {contextHolder}
            <div className="container">
                <div className="ps-section__content">
                    <Grid templateColumns={["repeat(1,1fr)", "repeat(12,1fr)"]} gap={10}>
                        <GridItem colSpan={[1, 8]}>
                            <div className="ps-block--shipping">
                                <div className="ps-block__panel">
                                    <figure>
                                        <small>Хувийн мэдээлэл</small>
                                        <p> {ecomerce.contactInfo?.firstname} {ecomerce.contactInfo?.lastname}, {ecomerce.contactInfo?.phoneNumber}</p>
                                        <Link href="/account/checkout">
                                            <p>Засах</p>
                                        </Link>
                                    </figure>
                                    <figure>
                                        <small>Хаяг</small>
                                        <p>
                                            {ecomerce.contactInfo?.city},
                                            {ecomerce.contactInfo?.state},
                                            {ecomerce.contactInfo?.address}
                                        </p>
                                    </figure>
                                </div>
                                <h4>Ачаа хүлээж авах</h4>
                                <div className="ps-block__panel">
                                    <figure>
                                        <Radio.Group
                                            onChange={(e) => handleChangeMethod(e)}
                                            value={isShipping}>
                                            <Radio value={false}>Оффисоос ирж авна</Radio>
                                            <Radio value={true}>
                                                Гэртээ хүргүүлнэ</Radio>
                                        </Radio.Group>
                                        <strong>
                                            {!isShipping ? 0 : formatCurrency(shippingFee!)}₮
                                        </strong>
                                    </figure>

                                </div>

                                <Box display="flex" justifyContent={"space-between"} alignItems={'center'}>
                                    <Link href="/account/checkout">
                                        <p>
                                            <i className="icon-arrow-left mr-2"></i>
                                            Мэдээлэл рүү буцах
                                        </p>
                                    </Link>
                                    <Button variant="brand" size="lg" onClick={handleMakeOrder}>
                                        үргэлжлүүлэх
                                    </Button>
                                </Box>
                            </div>
                        </GridItem>
                        <GridItem colSpan={[1, 4]}>
                            <ModulePaymentOrderSummary shipping={isShipping} />
                        </GridItem>
                    </Grid>
                </div>
            </div>
        </div>
    );
};

export default Shipping;
