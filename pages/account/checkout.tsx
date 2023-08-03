import React from 'react';

import Checkout from '~/components/partials/account/Checkout';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import OrderStepper from '~/components/partials/account/modules/OrderStepper';


const CheckoutPage = () => {

    return (
        <PageContainer footer={<FooterDefault />} title="Checkout">
            <div className="ps-page--simple">
                <OrderStepper index={0}/>
                <Checkout />
            </div>
        </PageContainer>
    );
};

export default CheckoutPage;
