import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import Addresses from '~/components/partials/account/Addresses';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';

const MyAccountPage = () => {
    const breadCrumb = [
       
        {
            text: 'Хаяг',
        },
    ];
    return (
        <PageContainer footer={<FooterDefault />} title="Address">
            <div className="ps-page--my-account">
                <BreadCrumb bgColor='white' breadcrumb={breadCrumb} />
                <Addresses />
            </div>
        </PageContainer>
    );
};

export default MyAccountPage;
