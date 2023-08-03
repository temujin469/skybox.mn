import React from 'react';
import FormCheckoutInformation from './modules/FormCheckoutInformation';
import { Box } from '@chakra-ui/react';
const Checkout = () => {
    return (
        <div className="ps-checkout ps-section--shopping">
            <div className="container">
                <div className="ps-section__content">
                    <div className="ps-form--checkout">
                        <Box mx="auto" maxW={900}>
                            {/* <Grid templateColumns={["repeat(1,1fr)", "repeat(12,1fr)"]} gap={10}> */}
                                {/* <GridItem colSpan={[1,8]}> */}
                                    <FormCheckoutInformation />
                                {/* </GridItem> */}
                                {/* <GridItem colSpan={[1,4]}>
                                    <div>
                                        <h3>Таны захиалга</h3>
                                        <ModulePaymentOrderSummary />
                                    </div>
                                </GridItem> */}
                            {/* </Grid> */}
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
