import React from 'react';
import HomeAdsColumns from '~/components/partials/home-default/HomeAdsColumns';
import HomeAds from '~/components/partials/home-default/HomeAds';
// import DownLoadApp from '~/components/partials/commons/DownLoadApp';
import PageContainer from '~/components/layouts/PageContainer';
import HomeDefaultBanner from '~/components/partials/home-default/HomeDefaultBanner';
import SiteFeatures from '~/components/partials/home-default/SiteFeatures';
import HomeDefaultTopCategories from '~/components/partials/home-default/HomeDefaultTopCategories';
import { Box } from '@chakra-ui/react';
// import HomeDefaultDealOfDay from '~/components/partials/home-default/HomeDefaultDealOfDay';
import HomeDefaultProductListing from '~/components/partials/home-default/HomeDefaultProductListing';
import Newsletters from '~/components/partials/commons/Newletters';
import NewArrivals from '~/components/partials/home-default/NewArrivals';
import HomeDafaultCategoryCollection from '~/components/partials/home-default/HomeDafaultCategoryCollection';
import { GetStaticProps } from 'next';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import useGetHomeContent from '~/apiCall/strapi/useGetHomeContent';
import HomeDefaultBrands from '~/components/partials/home-default/HomeDefaultBrands';
import HomeDefaultProductCollections from '~/components/partials/home-default/collection/HomeDefaultProductCollections';

const HomepageDefaultPage = () => {
  return (
    <PageContainer title="Skybox">
      <main id="homepage-1">
       <Box overflowX="hidden">
          <HomeDefaultBrands />
          <HomeDefaultBanner />
          <SiteFeatures />
          {/* <HomeDefaultDealOfDay collection="deal-of-the-day" /> */}
          <HomeAdsColumns />
          <HomeDefaultTopCategories />
          <HomeDefaultProductListing
            collection="consumer-electronics"
            title="Хямдалтай бараа"
          />
          
          <HomeDafaultCategoryCollection/>
          {/* <NewArrivals collection="new-arrivals-products" /> */}
          <HomeDefaultProductCollections/>
          <HomeAds />
          {/* <DownLoadApp /> */}
       </Box>
        <Newsletters />
      </main>
    </PageContainer>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(useGetHomeContent.getKey(), useGetHomeContent.queryFn);

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}


export default HomepageDefaultPage;
