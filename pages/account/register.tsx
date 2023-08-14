import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import Register from '~/components/partials/account/Register';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';

const RegisterPage = () => {
    const breadCrumb = [
        {
            text: 'Бүртгүүлэх',
            url:"/account/register"
        },
    ];

    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Бүртгүүлэх">
                <div className="ps-page--my-account">
                    <BreadCrumb bgColor='white' breadcrumb={breadCrumb} />
                    <Register />
                </div>
            </PageContainer>
        </>
    );
};

export default RegisterPage;
