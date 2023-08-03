import React from 'react';

import Shipping from '~/components/partials/account/Shipping';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import OrderStepper from '~/components/partials/account/modules/OrderStepper';

const ShippingPage = () => {
  

    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Shipping">
                <div className="ps-page--simple">
                    <OrderStepper index={1} />
                    <Shipping />
                </div>
            </PageContainer>
        </>
    );
};

export default ShippingPage
