import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import Invoices from '~/components/partials/account/Invoices';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';

const InvoicePage = () => {
    const breadCrumb = [
       
        {
            text: 'Нэхэмжлэл',
        },
    ];
    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Invoices">
                <div className="ps-page--my-account">
                    <BreadCrumb bgColor='white' breadcrumb={breadCrumb} />
                    <Invoices />
                </div>
            </PageContainer>
        </>
    );
};

export default InvoicePage;
