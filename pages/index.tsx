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
import HomeDefaultCollection from '~/components/partials/home-default/HomeDefaultCollection';

const HomepageDefaultPage = () => {
  return (
    <PageContainer title="Skybox">
      <main id="homepage-1">
       <Box overflowX="hidden">
          <HomeDefaultBanner />
          <SiteFeatures />
          {/* <HomeDefaultDealOfDay collection="deal-of-the-day" /> */}
          <HomeAdsColumns />
          <HomeDefaultTopCategories />
          <HomeDefaultProductListing
            collection="consumer-electronics"
            title="Хямдалтай бараа"
          />
          
          <HomeDefaultCollection catId='otc-49' title="Хүүхдийн онцлох хямдрал" />
          <HomeDefaultCollection catId='otc-19' title="Зуны онцлох бараа" />
          <HomeDefaultCollection catId='otc-20' title="Технологи" />
          <HomeDefaultCollection catId='otc-31' title="Цахилгаан хэрэгсэл" />
          <NewArrivals collection="new-arrivals-products" />
          <HomeAds />
          {/* <DownLoadApp /> */}
       </Box>
        <Newsletters />
      </main>
    </PageContainer>
  );
};

export default HomepageDefaultPage;
