import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import ShoppingCart from '~/components/partials/account/ShoppingCart';
import FooterDefault from '~/components/shared/footers/FooterDefault';

const ShoppingCartScreen = () => {

  const breadCrumb = [
    {
      text: 'Сагс',
    }
  ];


  return (
    <>
      <PageContainer footer={<FooterDefault />} title="Shopping Cart">
          <BreadCrumb breadcrumb={breadCrumb} bgColor='white'/>
          <ShoppingCart/>
      </PageContainer>
    </>
  );
};

export default ShoppingCartScreen;
