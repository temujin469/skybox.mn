import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import UserInformation from '~/components/partials/account/UserInformation';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';

const UserInformationPage = () => {
    const breadCrumb = [
        {
            text: 'Хэрэглэгчийн мэдээлэл',
        },
    ];

    return (
        <PageContainer title="Хэрэглэгчийн мэдээлэл">
            <div className="ps-page--my-account">
                <BreadCrumb bgColor='white' breadcrumb={breadCrumb} />
                <UserInformation />
            </div>
        </PageContainer>
    );
};

export default UserInformationPage;
