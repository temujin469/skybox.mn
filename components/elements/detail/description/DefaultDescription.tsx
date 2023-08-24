import React from 'react';

import PartialVendor from '~/components/elements/detail/description/PartialVendor';
import PartialReview from '~/components/elements/detail/description/PartialReview';
import PartialOffer from '~/components/elements/detail/description/PartialOffer';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import PartialSpecification from './PartialSpecification';
import PartialDescription from './PartialDescription';



const DefaultDescription = () => {
    return (
            <Tabs variant={{sm:"enclosed",md:"line"}}>
                <TabList mb='1em'>
                    <Tab>Тайлбар</Tab>
                    <Tab>Нэмэлт мэдээлэл</Tab>
                </TabList>
                <TabPanels >
                    <TabPanel px={0} maxW={900} mx="auto">
                        <PartialDescription />
                    </TabPanel>
                    <TabPanel px={0}>
                        <PartialSpecification />
                    </TabPanel>
                </TabPanels>
            </Tabs>
    );
};

export default DefaultDescription;
