import React from "react";
import WidgetShopCategories from "~/components/shared/widgets/WidgetShopCategories";
import WidgetShopBrands from "~/components/shared/widgets/WidgetShopBrands";
import WidgetShopFilterByPriceRange from "~/components/shared/widgets/WidgetShopFilterByPriceRange";
import ShopItems from "~/components/partials/shop/ShopItems";
import BreadCrumb from "~/components/elements/BreadCrumb";
import FooterDefault from "~/components/shared/footers/FooterDefault";
import PageContainer from "~/components/layouts/PageContainer";
import useBreadCrumb from "~/hooks/useBreadCrumb";
import { Box } from "@chakra-ui/react";
// import { Box } from "@chakra-ui/react";

const ShopSidebarWithoutBannerPage = () => {
  const breadCrumb = useBreadCrumb()

  return (
    <PageContainer footer={<FooterDefault />} title="Shop Sidebar">
      <BreadCrumb breadcrumb={breadCrumb.links!} />
      <div className="ps-page--shop" id="shop-sidebar">
        <div className="ps-container">
          {/* <Box px={["10px", "30px"]}> */}
            <div className="ps-layout--shop">
              <Box height="100%" top="85px" mb="170px" position={"sticky"} className="ps-layout__left">
                <WidgetShopCategories />
                <WidgetShopBrands />
                <WidgetShopFilterByPriceRange />
              </Box>
              <div className="ps-layout__right">
                {/* <div className="ps-page__header">
                <h1>Shop Sidebar</h1>
              </div> */}
                <ShopItems columns={5} />
              </div>
            </div>
          {/* </Box> */}
        </div>
      </div>
    </PageContainer>
  );
};

export default ShopSidebarWithoutBannerPage;
