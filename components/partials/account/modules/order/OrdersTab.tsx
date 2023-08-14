import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import PendingOrder from './tabs/PendingOrder';
import PaymentPendingOrder from './tabs/PaymentPendingOrder';
import ConfirmedOrder from './tabs/ConfirmedOrder';
import OutOfStockOrder from './tabs/OutOfStockOrder';
import CenceledOrder from './tabs/CenceledOrder';

function OrdersTap() {
  return (
    <Tabs variant='enclosed'>
      <TabList>
        <Tab>Бодолт хүлээгдэж байгаа</Tab>
        <Tab>Төлбөр хүлээгдэж байгаа</Tab>
        <Tab>баталгаажсан</Tab>
        <Tab>УБ-т ирсэн</Tab>
        <Tab>Дууссан</Tab>
        <Tab>Цуцлагдсан</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <PendingOrder/>
        </TabPanel>
        <TabPanel>
          <PaymentPendingOrder/>
        </TabPanel>
        <TabPanel>
          <ConfirmedOrder />
        </TabPanel>
        <TabPanel>
          <CenceledOrder />
        </TabPanel>
        <TabPanel>
          <OutOfStockOrder />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default OrdersTap;
