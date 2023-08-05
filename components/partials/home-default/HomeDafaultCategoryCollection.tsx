import React from 'react';
import useGetHomeContent from '~/apiCall/strapi/useGetHomeContent';
import CategoryProductCarousel from './modules/CategoryProductCarousel';

function HomeDafaultCategoryCollection() {
  const homeData = useGetHomeContent()

  const categoryProducts = homeData.data?.data.attributes.featured_products;

  return (
    categoryProducts?.map(item => (
      <CategoryProductCarousel catId={item.category_id} title={item.title} productQuantity={item.product_quantity} />
    ))
  );
}

export default HomeDafaultCategoryCollection;
