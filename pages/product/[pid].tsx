import React from 'react';
import { useRouter } from 'next/router';
import SkeletonProductDetail from '~/components/elements/skeletons/SkeletonProductDetail';
import BreadCrumb from '~/components/elements/BreadCrumb';
import RelatedProduct from '~/components/partials/product/RelatedProducts';
import ProductDetailVariants from '~/components/elements/detail/ProductDetailVariants';
import PageContainer from '~/components/layouts/PageContainer';
import useGetItemFullInfo from '~/apiCall/otapi/useGetItemFullInfo';
import { Box } from '@chakra-ui/react';
import useGetCategoryRootPath from '~/apiCall/otapi/useGetCategoryRootPath';
import useBatchGetItemFullInfo from '~/apiCall/otapi/useBatchGetItemFullInfo';

const ProductDetailHasVariantsPage = () => {
    const router = useRouter();
    const { pid } = router.query;

    const { data, isLoading } = useBatchGetItemFullInfo({ variables: { id: pid as string } });
    const product = data?.Result?.Item;
    const vendorItems = data?.Result?.VendorItems;

    const rootPathData = useGetCategoryRootPath({variables:{catId:product?.CategoryId}});


    const breadCrumb = rootPathData.data?.CategoryInfoList.Content.map(cat=>({
        text:cat.Name,
        url:`/shop?catId=${cat.Id}`
    })).reverse()
    // Views
    let productView;
    if (!isLoading) {
        if (product) {
            productView = <ProductDetailVariants product={product} vendorItems={vendorItems} />;
        } else {
        }
    } else {
        productView = <SkeletonProductDetail />;
    }
    return (
        <PageContainer title={product ? product.Title : 'Хайж байна...'}>
            <BreadCrumb breadcrumb={breadCrumb!} />
            <Box overflowX="hidden" pt={["15px", "30px"]}>
                {/* <div className="ps-container"> */}
                    {/* <div className="ps-page__container">
                        <div className="ps-page__left">{productView}</div>
                        <div className="ps-page__right">
                            <ProductWidgets />
                        </div>
                    </div> */}
                    {/* <Box py={{base:"15px",sm:0}}> */}
                        {productView}
                        {/* <CustomerBought
                            layout="fullwidth"
                            collectionSlug="deal-of-the-day"
                        /> */}
                        {/* <RelatedProduct  catId={product?.CategoryId!} collection="related" /> */}
                    {/* </Box> */}
                    {/*
                    <CustomerBought
                        layout="fullwidth"
                        collectionSlug="deal-of-the-day"
                    />
                    <RelatedProduct collectionSlug="shop-recommend-items" /> */}
                {/* </div> */}
            </Box>
        </PageContainer>
    );
};

export default ProductDetailHasVariantsPage;
