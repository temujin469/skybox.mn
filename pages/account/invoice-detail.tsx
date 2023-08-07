import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import InvoiceDetail from '~/components/partials/account/InvoiceDetail';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
import PageContainer from '~/components/layouts/PageContainer';

const InvoiceDetailPage = () => {
    const breadCrumb = [
        {
            text: 'Захиалга',
            
        },
    ];
    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Invoice detail">
                <div className="ps-page--my-account">
                    <BreadCrumb bgColor="white" breadcrumb={breadCrumb} />
                    <InvoiceDetail />
                </div>
            </PageContainer>
        </>
    );
};

export default InvoiceDetailPage;