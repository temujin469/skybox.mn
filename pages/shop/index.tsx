import React from "react";
import WidgetShopBrands from "~/components/shared/widgets/WidgetShopBrands";
import WidgetShopFilterByPriceRange from "~/components/shared/widgets/WidgetShopFilterByPriceRange";
import ShopItems from "~/components/partials/shop/ShopItems";
import BreadCrumb from "~/components/elements/BreadCrumb";
import FooterDefault from "~/components/shared/footers/FooterDefault";
import PageContainer from "~/components/layouts/PageContainer";
import useGetCategoryRootPath from "~/apiCall/otapi/useGetCategoryRootPath";
import { useRouter } from "next/router";
import WidgetSearchProperties from "~/components/shared/widgets/WidgetSearchMethods";
import WidgetVendor from "~/components/shared/widgets/vendor/WidgetVendor";
// import { Box } from "@chakra-ui/react";

const ShopSidebarWithoutBannerPage = () => {
  // const breadCrumb = useBreadCrumb()
  const router = useRouter()
  const { catId,brandId,vendorId } = router.query;
  const { data } = useGetCategoryRootPath({ variables: { catId: catId as string } });


  const breadCrumb = data?.CategoryInfoList?.Content ?  data?.CategoryInfoList.Content.map((cat) => ({
    text: cat.Name,
    url: `/shop/?catId=${cat.Id}`
  })) : brandId ? [{
    text:brandId
  }] : vendorId  ? [{
    text:vendorId
  }] : [{
          text:"Бүтээгдэхүүн "
  }]
  // const cat = data?.CategoryInfoList?.Content[data?.CategoryInfoList?.Content.length - 1];


  return (
    <PageContainer bgColor="#f1f1f1" footer={<FooterDefault />} title="Дэлгүүр">
      <BreadCrumb breadcrumb={breadCrumb as BreadCrumb[]}bgColor="white"/>
      <div className="ps-page--shop" id="shop-sidebar">
        <div className="ps-container">
          {/* <Box px={["10px", "30px"]}> */}
          <div className=" md:grid grid-cols-12 md:gap-[20px] xl:gap-[25px] mt-[10px] md:mt-[30px]">
            <div className="col-span-4 xl:col-span-3 hidden md:block h-full mb-[170px]">
              {/* {
                catId && <WidgetShopCategories category={cat} />
              } */}
              {
                brandId && <WidgetShopBrands />
              }
              {
                vendorId && <WidgetVendor />
              }
              <WidgetShopFilterByPriceRange />
              <WidgetSearchProperties/>
            </div>
            <div className="col-span-8 xl:col-span-9">
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
