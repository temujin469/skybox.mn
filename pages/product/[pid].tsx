import React from 'react';
import { useRouter } from 'next/router';
import SkeletonProductDetail from '~/components/elements/skeletons/SkeletonProductDetail';
import BreadCrumb from '~/components/elements/BreadCrumb';
import RelatedProduct from '~/components/partials/product/RelatedProducts';
import ProductDetailVariants from '~/components/elements/detail/ProductDetailVariants';
import PageContainer from '~/components/layouts/PageContainer';
import useGetItemFullInfo from '~/apiCall/otapi/useGetItemFullInfo';
import { Box } from '@chakra-ui/react';

const ProductDetailHasVariantsPage = () => {
    const router = useRouter();
    const { pid } = router.query;

    const { data, isLoading } = useGetItemFullInfo({ variables: { id: pid as string } });
    const product = data?.OtapiItemFullInfo;


    const breadCrumb = [
        {
            id: 2,
            text: 'Дэлгүүр',
            url: '/shop',
        },
        {
            id: 3,
            text: !isLoading && product ? product.Id : 'Хайж байна...',
        },
    ];
    // Views
    let productView;
    if (!isLoading) {
        if (product) {
            productView = <ProductDetailVariants product={product} />;
        } else {
        }
    } else {
        productView = <SkeletonProductDetail />;
    }
    return (
        <PageContainer title={product ? product.Title : 'Хайж байна...'}>
            <BreadCrumb breadcrumb={breadCrumb} />
            <Box overflowX="hidden" py={["0", "30px"]}>
                <div className="ps-container">
                    {/* <div className="ps-page__container">
                        <div className="ps-page__left">{productView}</div>
                        <div className="ps-page__right">
                            <ProductWidgets />
                        </div>
                    </div> */}
                    <Box py={{base:"15px",sm:0}}>
                        {productView}
                        {/* <CustomerBought
                            layout="fullwidth"
                            collectionSlug="deal-of-the-day"
                        /> */}
                        <RelatedProduct  catId="otc-4" collection="related" />
                    </Box>
                    {/*
                    <CustomerBought
                        layout="fullwidth"
                        collectionSlug="deal-of-the-day"
                    />
                    <RelatedProduct collectionSlug="shop-recommend-items" /> */}
                </div>
            </Box>
        </PageContainer>
    );
};

export default ProductDetailHasVariantsPage;
