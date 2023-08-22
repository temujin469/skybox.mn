import moment from 'moment'
import Link from 'next/link'
import React from 'react'
import { CgChevronRight } from 'react-icons/cg'
import { formatCurrency } from '~/utilities/product-helper'
import 'moment/locale/mn';

function OrderRow({order}:{order:OrderResponse}) {
  return (
    <Link href={`/account/invoice-detail?orderId=${order.order_id}`}>
    <div className='flex border hover:shadow-sm rounded-md mb-[10px] p-[10px] justify-between items-center'>
      <div>{order.order_id}</div>
      <div>{formatCurrency(order.total_payment)}₮</div>
      <p className='whitespace-nowrap hidden md:block'>{moment(order.publishedAt).locale('mn').format('lll')}</p>
      <p className='whitespace-nowrap md:hidden'>{moment(order.publishedAt).locale('mn').format('L')}</p>
      <p className='sm:block'><CgChevronRight size={17}/></p>
    </div>
  </Link>
  )
}

export default OrderRow