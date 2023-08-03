import React  from 'react';
import FormChangeUserInformation from '~/components/shared/FormChangeUserInformation';
import AccountMenuSidebar from './modules/AccountMenuSidebar';

const UserInformation = () => {
    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                            <AccountMenuSidebar />
                    </div>
                    <div className="col-lg-8">
                        <div className="ps-page__content">
                            <FormChangeUserInformation />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserInformation;
