import React from 'react';
// import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react'
import PendingOrder from './tabs/PendingOrder';
import PaymentPendingOrder from './tabs/PaymentPendingOrder';
import ConfirmedOrder from './tabs/ConfirmedOrder';
import OutOfStockOrder from './tabs/OutOfStockOrder';
import CenceledOrder from './tabs/CenceledOrder';
import { Tabs } from 'antd';
import ArrivedOrder from './tabs/ArrivedOrder';

function OrdersTap() {
  // return (
  //   <Tabs variant='soft-rounded' colorScheme="yellow">
  //     <Box 
  // //     __css={{
  // //  '&::-webkit-scrollbar': {
  // //   w: '4px',
  // // },
  // // '&::-webkit-scrollbar-track': {
  // //   w: '6px',
  // // },
  // // '&::-webkit-scrollbar-thumb': {
  // //   borderRadius: '10',
  // //   bg: `brand.1`,
  // // },
  // // }} 
  // className='overflow-x-scroll overflow-y-hidden w-full '>
  //   <div className="">
  //   <TabList >
  //       <Tab whiteSpace="nowrap">Бодолт хүлээгдэж байгаа</Tab>
  //       <Tab whiteSpace="nowrap">Төлбөр хүлээгдэж байгаа</Tab>
  //       <Tab whiteSpace="nowrap">баталгаажсан</Tab>
  //       <Tab whiteSpace="nowrap">УБ-т ирсэн</Tab>
  //       <Tab whiteSpace="nowrap">Дууссан</Tab>
  //       <Tab whiteSpace="nowrap">Цуцлагдсан</Tab>
  //     </TabList>
  //   </div>

  //     </Box>
  //     <TabPanels>
  //       <TabPanel p={0} pt={"20px"}>
  //         <PendingOrder/>
  //       </TabPanel>
  //       <TabPanel p={0} pt={"20px"}>
  //         <PaymentPendingOrder/>
  //       </TabPanel>
  //       <TabPanel p={0} pt={"20px"}>
  //         <ConfirmedOrder />
  //       </TabPanel>
  //       <TabPanel p={0} pt={"20px"}>
  //         <CenceledOrder />
  //       </TabPanel>
  //       <TabPanel p={0} pt={"20px"}>
  //         <OutOfStockOrder />
  //       </TabPanel>
  //     </TabPanels>
  //   </Tabs>
  // );

  return (
    <Tabs
    defaultActiveKey="1"
    type='card'
    items={[
      {
        label: 'Бодолт хүлээгдэж байгаа',
        key: '1',
        children: <PendingOrder/>,
      },
      {
        label: 'Төлбөр хүлээгдэж байгаа',
        key: '2',
        children: <PaymentPendingOrder/>,
      },
      {
        label: 'баталгаажсан',
        key: '3',
        children: <ConfirmedOrder/>,
      },
      {
        label: 'УБ-т ирсэн',
        key: '4',
        children: <ArrivedOrder/>
      },
      {
        label: 'Дууссан',
        key: '5',
        children: <OutOfStockOrder/>,
      },
      {
        label: 'Цуцлагдсан',
        key: '6',
        children: <CenceledOrder/>,
      },
    ]}
  />
  )
}

export default OrdersTap;
