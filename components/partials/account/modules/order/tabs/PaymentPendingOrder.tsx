import QueryString from 'qs';
import React from 'react';
import { useSelector } from 'react-redux';
import useOrders from '~/apiCall/strapi/useOrders';
import { RootState } from '~/store/store';
import OrderRow from '../OrderRow';
import { useRouter } from 'next/router';

function PaymentPendingOrder() {
  const router = useRouter()

  const orderId = router.query.orderId
  const  {token,user}= useSelector((state: RootState) => state.auth);
  console.log(user?.id)



  const query = QueryString.stringify({
      populate: ["contact_information", "products","user"],
      filters: {
          user: user?.id,
          payment_status:{
            $eqi:"ХҮЛЭЭГДЭЖ БАЙГАА"
          }
      },
  },
      { encodeValuesOnly: true }
  )

  const { data } = useOrders({ variables: { jwt: token!, query } });
  return (
    <div >
      {
        data?.data?.map(order=>(
          <OrderRow order={order.attributes} key={order.id}/>
        ))
      }
    </div>
  );
}

export default PaymentPendingOrder;
