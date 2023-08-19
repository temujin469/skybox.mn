import React from 'react';
import useGetHomeContent from '~/apiCall/strapi/useGetHomeContent';
import ProductCollection from './ProductCollection';
import { CircularProgress } from '@chakra-ui/react';

function HomeDefaultProductCollections() {
  const {data,isLoading} = useGetHomeContent();
  console.log(data?.data?.attributes?.productCollections)

  if(isLoading) return <CircularProgress isIndeterminate color='brand.1'/>
  return (
    <div>
      {
        data?.data?.attributes?.productCollections?.map(collection=>(
          <ProductCollection key={collection.id} collection={collection}/>
        ))
      }
    </div>
  );
}

export default HomeDefaultProductCollections;
