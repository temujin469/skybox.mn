import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import InvoiceDetail from '~/components/partials/account/InvoiceDetail';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';

const InvoiceDetailPage = () => {
    const breadCrumb = [
        {
            text: 'Захиалга'
        }
    ];
    return (
        <>
            <PageContainer bgColor="#f1f1f1" footer={<FooterDefault />} title="Захиалгын дэлгэрэнгүй">
                    <BreadCrumb bgColor="white" breadcrumb={breadCrumb} />
                    <InvoiceDetail />
            </PageContainer>
        </>
    );
};

export default InvoiceDetailPage;
