import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import useGetItemInfoList from '~/apiCall/otapi/useGetItemInfoList';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import { generateTempArray } from '~/utilities/common-helpers';
import { ProductGroupWithCarousel } from '~/components/partials/product/ProductGroupWithCarousel';

const ProductCollection = ({ collection }: { collection:ProductCollection }) => {

  const productIds:string[] = collection?.products?.map(pro=>pro.product_id)

  const { data, isLoading } = useGetItemInfoList({ variables: { ids:productIds} });

  const productItems = data?.OtapiItemInfoList?.Content;

  // useEffect(() => {
  //     getProductsByCollection(collectionSlug);
  // }, [collectionSlug]);

  // views
  let productItemsView;
  if (!isLoading) {
    if (productItems && productItems.length > 0) {
      productItemsView = (
        <ProductGroupWithCarousel
          products={productItems}
          type="fullwidth"
        />
      );
    } else {
      productItemsView = <p>No product(s) found.</p>;
    }
  } else {
    const skeletons = generateTempArray(6).map((item) => (
      <div className="col-xl-2 col-lg-3 col-sm-3 col-6" key={item}>
        <SkeletonProduct />
      </div>
    ));
    productItemsView = <div className="row">{skeletons}</div>;
  }

  return (
    <div className="ps-product-list">
      <Box className="ps-container" >
        <Box
          borderRadius={5}
          p={3}
          sx={{
            backgroundImage: "url('/static/img/bg/abstract.png')",
            bgPosition: "right bottom",
            backgroundRepeat: "no-repeat",
            backgroundSize: "70%"
          }}
          backgroundColor={collection.bgColor || "brand.1"}
        >
          <Box className="ps-section__header"
            backgroundColor="white"
          >
            <Heading textTransform="uppercase" mb={{ base: 3, sm: 0 }}>{collection.collectionName}</Heading>
          </Box>
          <Box className="ps-section__content"
            px={[0, 10]} pb={[5, 10]}
          >{productItemsView}</Box>
        </Box>

      </Box>
    </div>
  );
};

export default ProductCollection;
