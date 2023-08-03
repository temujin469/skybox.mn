import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import ModuleEcomerceCartItems from '~/components/ecomerce/modules/ModuleEcomerceCartItems';
import Link from 'next/link';
import ModuleCartSummary from '~/components/ecomerce/modules/ModuleCartSummary';
import { useSelector } from 'react-redux';
import type { RootState } from '~/store/store';
import { Button } from '@chakra-ui/react';
import { HiArrowSmallLeft } from "react-icons/hi2"

const ShoppingCartScreen = () => {

  const { cartItems } = useSelector((state: RootState) => state.cart);

  const breadCrumb = [
    {
      text: 'Сагс',
      url: "/account/shopping-cart"
    },
  ];

  // View
  let contentView;
  if (cartItems) {
    if (cartItems.length > 0) {
      contentView = (
        <div className='md:grid grid-cols-12 w-full gap-10'>
          <div className='col-span-8 mb-20'>
            <ModuleEcomerceCartItems/>
          </div>
          <div className="col-span-4">
            <ModuleCartSummary/>
            <Link
              href="/account/checkout"
              className="ps-btn ps-btn--fullwidth"
            >
              Тооцоо хийх
            </Link>
          </div>
        </div>
      );
    } else {
      contentView = (
        <>
          <div className="ps-section__content">
            <div className="alert alert-info">
              <p className="mb-0">
                Таны сагсанд одоогоор хоосон байна.</p>
            </div>

            <div className="ps-section__cart-actions">
              <Link href="/shop">
                <Button size="lg" variant="ghost" leftIcon={<HiArrowSmallLeft/>}>
                  Буцах
                </Button>
              </Link>
            </div>
          </div>
        </>
      );
    }
  } else {
  }

  return (
    <>
      <PageContainer footer={<FooterDefault />} title="Shopping Cart">
        <div className="ps-page--simple">
          <BreadCrumb breadcrumb={breadCrumb} />
          <div className="ps-section--shopping ps-shopping-cart">
            <div className="container">
              {contentView}
              <div className="ps-section__cart-actions">
                <Link href="/shop">
                  <Button size="lg" variant="ghost" leftIcon={<HiArrowSmallLeft />}>
                    Буцах
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
};

export default ShoppingCartScreen;
