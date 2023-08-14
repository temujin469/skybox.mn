import React  from 'react';
import { Table,  Tag } from 'antd';
import Link from 'next/link';
import { ColumnsType } from 'antd/es/table';
import QueryString from 'qs';
import useOrders from '~/apiCall/strapi/useOrders';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { formatCurrency } from '~/utilities/product-helper';
import moment from "moment"
import 'moment/locale/mn';

const TableInvoices = () => {

    const router = useRouter()

    const orderId = router.query.orderId
    const  {token,user}= useSelector((state: RootState) => state.auth);
    console.log(user?.id)



    const query = QueryString.stringify({
        populate: ["contact_information", "products","user"],
        filters: {
            user: user?.id
        },
    },
        { encodeValuesOnly: true }
    )

    const { data } = useOrders({ variables: { jwt: token!, query } });

    let color = "green"


    interface DataType {
        id: number,
        order_id: string,
        dateCreate:string
        amount:number
        status:any
    }

    const tableData: DataType[] | undefined  = data?.data.map(data =>({
        id:data.id,
        order_id:data.attributes.order_id,
        dateCreate:data.attributes.publishedAt,
        amount:data.attributes.total_payment,
        status:data.attributes.order_status ? data.attributes.order_status : data.attributes.payment_status as any
    }))

    const tableColumn: ColumnsType<DataType> = [
        {
            title: 'Дугаар/Огноо',
            dataIndex: 'invoiceId',
            key: 'invoiceId',
            width: '120px',
            render: (text, record) => (
                <Link href={`/account/invoice-detail?orderId=${record.order_id}`}>
                    {record.order_id}
                    <p className='whitespace-nowrap'>{moment(record.dateCreate).locale('mn').format('lll')}</p>
                </Link>
            ),
        },
        
        // {
        //     title: 'Date',
        //     rowKey: 'dateCreate',
        //     dataIndex: 'dateCreate',
        //     key: 'dateCreate',
        //     width: '120px',
        // },
        {
            title: 'Төлбөр',
            dataIndex: 'amount',
            key: 'amount',
            render: (text, record) => (
                <span className="text-right">{formatCurrency(record.amount)}₮</span>
            ),
        },
        {
            title: 'Төлөв',
            key: 'status',
            dataIndex: 'status',
            // width: '150px',
            render: (text, record) => (
                <Tag color={color} >
                    {record.status}
                </Tag>
            ),
        },
    ];
    return (
        <div className='table-responsive'>
            <Table
                columns={tableColumn}
                dataSource={tableData}
                rowKey={record => record.id}
                pagination={{total:data?.meta.pagination.total,pageSize:data?.meta.pagination.pageSize,current:data?.meta.pagination.page}}
            />
        </div>
        
    );
}

export default TableInvoices;
