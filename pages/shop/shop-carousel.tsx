import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
// import ShopCarouselBanner from '~/components/partials/shop/ShopCarouselBanner';
// import ShopCarouselTopDeal from '~/components/partials/shop/ShopCarouselTopDeal';
// import ProductGroupByCarousel from '~/components/partials/product/ProductGroupByCarousel';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';
import FooterDefault from '~/components/shared/footers/FooterDefault';

const ShopCategoriesPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shop Carousel',
        },
    ];
    return (
        <PageContainer footer={<FooterDefault />} title="Shop Carousel">
            <BreadCrumb breadcrumb={breadCrumb} />
            <div className="ps-page--shop" id="shop-carousel">
                <div className="container">
                    {/* <ShopCarouselBanner /> */}
                    {/* <ShopCarouselTopDeal collectionSlug="shop-top-deals-super-hot-today" /> */}

                    {/* <ProductGroupByCarousel
                        collection="best-seller-products"
                        title="Best Seller Products"
                    />
                    <ProductGroupByCarousel
                        collection="new-arrivals-products"
                        title="Best Seller Products"
                    /> */}
                </div>
            </div>
            <Newletters />
        </PageContainer>
    );
};

export default ShopCategoriesPage;
