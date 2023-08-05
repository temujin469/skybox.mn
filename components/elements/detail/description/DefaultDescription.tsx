import React from 'react';

import PartialVendor from '~/components/elements/detail/description/PartialVendor';
import PartialReview from '~/components/elements/detail/description/PartialReview';
import PartialOffer from '~/components/elements/detail/description/PartialOffer';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import PartialSpecification from './PartialSpecification';
import PartialDescription from './PartialDescription';


const DefaultDescription = () => {
    return (
        <div className="ps-product__content">
            <Tabs variant='enclosed'>
                <TabList mb='1em'>
                    <Tab>Нэмэлт мэдээлэл</Tab>
                    <Tab>Тайлбар</Tab>
                </TabList>
                <TabPanels >
                    <TabPanel px={0}>
                        <PartialSpecification />
                    </TabPanel>
                    <TabPanel px={0} maxW={900} mx="auto">
                        <PartialDescription />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );
};

export default DefaultDescription;
