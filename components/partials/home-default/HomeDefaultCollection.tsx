import React from 'react';
import ProductGroupByCarousel from '../product/ProductGroupByCarousel';
import useGetProductsByFilter from '~/apiCall/otapi/useGetProductsByFilter';

type Props = {
  title: string
  collection?: string
  catId: string
}

function HomeDefaultCollection({ title, catId }: Props) {
  const { data, isLoading } = useGetProductsByFilter({ variables: { start: 0, limit: 10, filters: undefined, catId: catId as string } });

  const productItems = data?.OtapiItemInfoSubList?.Content;
  return (
    <div className='ps-container'>
      <ProductGroupByCarousel
        isLoading={isLoading}
        title={title}
        products={productItems!}
      />
    </div>
  );
}

export default HomeDefaultCollection;
