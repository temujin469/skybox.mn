import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import Compare from '~/components/partials/account/Compare';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';

const ComparePage = () => {
    const breadCrumb = [
        
        {
            text: 'Бүтээгдэхүүн харьцуулах',
        },
    ];
    return (
        <PageContainer footer={<FooterDefault />} title="Compare">
            <div className="ps-page--simple">
                <BreadCrumb breadcrumb={breadCrumb} />
                <Compare />
            </div>
        </PageContainer>
    );
};

export default ComparePage;
