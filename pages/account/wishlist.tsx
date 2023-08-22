import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import Wishlist from '~/components/partials/account/Wishlist';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';

const WishlistPage = () => {
    const breadCrumb = [
      {
        text: "Хүслийн жагсаалт",
      },
    ];

    return (
      <PageContainer footer={<FooterDefault />} title="Хүслийн жагсаалт">
        <div className="ps-page--simple">
          <BreadCrumb breadcrumb={breadCrumb} bgColor='white'/>
          <Wishlist />
        </div>
      </PageContainer>
    );
};

export default WishlistPage;
