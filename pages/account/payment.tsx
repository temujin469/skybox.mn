import React from 'react';

import Payment from '~/components/partials/account/Payment';

import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';

import OrderStepper from '~/components/partials/account/modules/OrderStepper';

const PaymentPage = () => {
   
    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Payment">
                <div className="ps-page--simple">
                    <OrderStepper index={2} />
                    <Payment />
                </div>
            </PageContainer>
        </>
    );
};

export default PaymentPage
