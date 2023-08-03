import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import Login from '~/components/partials/account/Login';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';

const LoginPage = () => {
    const breadCrumb = [
       
        {
            text: 'Нэвтрэх',
            url:"/account/login"
        },
    ];
    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Login">
                <div className="ps-page--my-account">
                    <BreadCrumb bgColor='white' breadcrumb={breadCrumb} />
                    <Login />
                </div>
            </PageContainer>
        </>
    );
};

export default LoginPage;
