import React from 'react';
import useGetProductsByFilter from '~/apiCall/otapi/useGetProductsByFilter';
import ProductGroupByCarousel from '../../product/ProductGroupByCarousel';

type Props = {
  title: string
  catId: string
  productQuantity:number
}

function CategoryProductCarousel({ title, catId, productQuantity }: Props) {
  const { data, isLoading } = useGetProductsByFilter({ variables: { start: 0, limit: productQuantity || 18, filters: undefined, catId: catId as string } });

  const productItems = data?.OtapiItemInfoSubList?.Content;
  return (
    <div className='ps-container'>
      <ProductGroupByCarousel
        isLoading={isLoading}
        title={title}
        products={productItems!}
        titlelink={`/shop?catId=${catId}`}
      />
    </div>
  );
}

export default CategoryProductCarousel;
