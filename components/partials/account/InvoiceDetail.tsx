import React, { Component } from "react";
import AccountMenuSidebar from "./modules/AccountMenuSidebar";
import TableNotifications from "./modules/TableNotifications";
import Link from "next/link";
import ProductCart from "../../elements/products/ProductCart";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "~/store/store";
import { formatCurrency } from "~/utilities/product-helper";
import useOrderDetail from "~/apiCall/strapi/useOrderDetail";
import { Tag } from "antd";
import { Button, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";




const InvoiceDetail = () => {
  const router = useRouter()

  const orderId = router.query.orderId
  const jwt = useSelector((state: RootState) => state.auth.token)

  const { data, isLoading } = useOrderDetail({ variables: { jwt: jwt!, orderId: orderId as string } });
  const order = (data?.data && data.data.length) ? data.data[0].attributes : undefined;
  console.log(data)

  const invoiceProducts = [
    {
      id: "6",
      thumbnail: "/static/img/products/shop/5.jpg",
      title: "Grand Slam Indoor Of Show Jumping Novel",
      vendor: "Robert's Store",
      sale: true,
      price: "32.99",
      salePrice: "41.00",
      rating: true,
      ratingCount: "4",
      badge: [
        {
          type: "sale",
          value: "-37%",
        },
      ],
    },
    {
      id: "7",
      thumbnail: "/static/img/products/shop/6.jpg",
      title: "Sound Intone I65 Earphone White Version",
      vendor: "Youngshop",
      sale: true,
      price: "100.99",
      salePrice: "106.00",
      rating: true,
      ratingCount: "5",
      badge: [
        {
          type: "sale",
          value: "-5%",
        },
      ],
    },
  ];
  return (
    <section className="ps-my-account ps-page--account">
      <div>
        <div
          style={{
            maxWidth: "900px",
            margin: "auto",
          }}
        >
          <div className="ps-page__content">
            <div className="ps-section--account-setting">
              <div className="ps-section__header">
                <h4 className="px-4">
                  Захиалга {order?.order_id} <Tag color="green">
                    {order?.order_status ? order?.order_status : order?.payment_status}
                    </Tag>
                </h4>
              </div>
              <div className="ps-section__content">
                <div className="row">
                  <div className="col-md-4 col-12">
                    <figure className="ps-block--invoice">
                      <Heading mb={3} borderBottom="1px" borderColor="gray.200" pb={2}>Хаяг</Heading>
                      <div className="ps-block__content">
                        <p>{order?.contact_information?.city}, {order?.contact_information?.state}, {order?.contact_information?.address}</p>
                        <p>Phone:{order?.contact_information?.phoneNumber}</p>
                      </div>
                    </figure>
                  </div>
                  <div className="col-md-4 col-12">
                    <figure className="ps-block--invoice">
                      <Heading mb={3} borderBottom="1px" borderColor="gray.200" pb={2}>Хүргэлт</Heading>
                      <div className="ps-block__content">
                        <p>{order?.is_shipping_included ? "Гэртээ хүргүүлнэ" : "Оффисоос ирж авна"}</p>
                      </div>
                    </figure>
                  </div>
                  <div className="col-md-4 col-12">
                    <figure className="ps-block--invoice">
                      <Heading mb={3} borderBottom="1px" borderColor="gray.200" pb={2}>Төлбөр</Heading>
                      <div className="ps-block__content">
                        {
                          order?.payment_status !== "ХҮЛЭЭГДЭЖ БАЙГАА" ? (
                            <p>{order?.payment_status}</p>

                          ) : (
                            <Link href={`/account/payment?orderId=${order?.order_id}`}>
                              <p className="ps-btn ps-btn--sm ">Төлбөр төлөх</p>
                            </Link>
                          )
                        }

                      </div>
                    </figure>
                  </div>
                </div>
                <TableContainer marginBottom="40px">
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>Бүтээгдэхүүн</Th>
                        <Th>Нэгж үнэ</Th>
                        <Th>Тоо хэмжээ</Th>
                        <Th>Нийт дүн</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {order ? order?.products?.map((product) => (
                        <Tr key={product.cId}>
                          <Td>
                            <ProductCart product={product} />
                          </Td>
                          <Td className="price">{formatCurrency(product.price)}₮</Td>
                          <Td>{product.quantity}</Td>
                          <Td className="price">{formatCurrency(product.price * product.quantity)}₮</Td>
                        </Tr>
                      )) : null}
                    </Tbody>
                  </Table>
                </TableContainer>
                <Link href="/account/invoices">
                  <Button size="lg">
                    Буцах
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvoiceDetail;
