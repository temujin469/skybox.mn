import React from 'react';

import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Heading } from '@chakra-ui/react';
import PartialSpecification from './PartialSpecification';
import PartialDescription from './PartialDescription';
import PartialReview from './PartialReview';

const DefaultDescription = () => {
    return (
        // <Tabs variant={{base:"enclosed",md:"line"}}>
        //     <TabList mb='1em'>
        //         <Tab>Тайлбар</Tab>
        //         <Tab>Нэмэлт мэдээлэл</Tab>
        //     </TabList>
        //     <TabPanels className='max-h-[500px] overflow-hidden' >
        //         <TabPanel px={0} maxW={900} mx="auto">
        //             <PartialDescription />
        //         </TabPanel>
        //         <TabPanel px={0}>
        //             <PartialSpecification />
        //         </TabPanel>
        //     </TabPanels>
        // </Tabs>
        <Accordion defaultIndex={[2]} allowMultiple allowToggle>
            <AccordionItem borderTop={0}>
                <h2>
                    <AccordionButton p={{md:"20px"}}>
                        <Box as="span" flex='1' textAlign='left'>
                            <Heading fontSize="15px" className=' text-gray-600'>
                                Тайлбар
                            </Heading>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel p={0}>
                    <PartialDescription />
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem borderBottom={0}>
                <h2>
                    <AccordionButton p={{ md: "20px" }}>
                        <Box as="span" flex='1' textAlign='left'>
                            <Heading fontSize="15px" className=' text-gray-600'>
                                Нэмэлт мэдээлэл
                            </Heading>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4} px={{ base: "0", sm: "20px" }}>
                    <PartialSpecification />
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem borderBottom={0}>
                <h2>
                    <AccordionButton p={{ md: "20px" }}>
                        <Box as="span" flex='1' textAlign='left'>
                            <Heading fontSize="15px" className=' text-gray-600'>
                                Сэтгэгдэл
                            </Heading>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4} p={{ md: "20px" }}>
                    <PartialReview />
                </AccordionPanel>
            </AccordionItem>

        </Accordion>
    );
};

export default DefaultDescription;
