import React  from 'react';
import FormChangeUserInformation from '~/components/shared/FormChangeUserInformation';
import AccountLayout from '~/components/layouts/AccountLayout';

const UserInformation = () => {
    return (
        <AccountLayout title='Хэрэглэгчийн мэдээлэл'>
            <FormChangeUserInformation/>
        </AccountLayout>
    );
};

export default UserInformation;
