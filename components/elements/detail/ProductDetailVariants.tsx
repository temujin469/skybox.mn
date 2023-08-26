import React, { useEffect } from "react";
// import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault';
import DefaultDescription from "~/components/elements/detail/description/DefaultDescription";
import ModuleProductHasVariants from "~/components/elements/detail/modules/ModuleProductHasVariants";
import useAppState from "~/hooks/useAppState";
import VendorView from "~/components/shared/widgets/vendor/VendorView";
import RelatedProduct from "~/components/partials/product/RelatedProducts";
import VendorProductCarousel from "~/components/shared/widgets/vendor/VendorProductCarousel";
// import ModuleProductDetailDescription from '~/components/elements/detail/modules/ModuleProductDetailDescription';
// import ModuleDetailShoppingActions from '~/components/elements/detail/modules/ModuleDetailShoppingActions';
// import ModuleProductDetailSpecification from '~/components/elements/detail/modules/ModuleProductDetailSpecification';
// import ModuleProductDetailSharing from '~/components/elements/detail/modules/ModuleProductDetailSharing';
// import ModuleDetailActionsMobile from '~/components/elements/detail/modules/ModuleDetailActionsMobile';
// import ModuleDetailTopInformation from '~/components/elements/detail/modules/ModuleDetailTopInformation';

const ProductDetailVariants = ({
  product,
}: {
  product: ProductFullInfo;
}) => {
  // console.log({ product });
  const { setProductId, setvendorId,setCategoryId } = useAppState();

  // console.log(vendorItems);

  useEffect(() => {
    setProductId(product.Id);
    setvendorId(product.VendorId);
    setCategoryId(product.CategoryId);
  }, [product]);
  if (product) {
    return (
      <div className="ps-product--detail ps-product--fullwidth ">
        <div className="ps-container  sm:px-[20px] xl:px-[30px]">
          <ModuleProductHasVariants product={product} />
        </div>
        <div className="md:bg-[#F1F1F1]">
          <div className="ps-container h-full sm:px-[20px] xl:px-[30px] sm:py-[20px] xl:py-[30px]">
            <div className="md:grid grid-cols-12 gap-[20px] xl:gap-[30px] sm:pb-[20px] xl:pb-[30px]">
              {/* <div className="col-span-8 md:p-[15px] lg:p-[25px] md:rounded-md h-full bg-white">
                <DefaultDescription />
              </div> */}

              <div className="col-span-8 border-[1px] md:border-[0] rounded-md h-full bg-white mb-[20px] md:mb-[0]">
                <DefaultDescription />
              </div>
              <div className="col-span-4 rounded-md overflow-hidden bg-white sticky top-[10px] h-fit">
                <div className="p-[15px] border-[1px] md:border-[0]  rounded-md md:p-[20px] lg:p-[25px]">
                  <VendorView />
                </div>
                {/* <div className="grid grid-cols-2 ">
                  {vendorItems?.Content?.map((product) => (
                    <div className="col-span-1 md:col-span-2 lg:col-span-1">
                      <Product product={product} />
                    </div>
                  ))}
                </div> */}
                <div className="md:p-[18px] lg:p-[23px] mt-[40px] mb-[40px] md:mb-0 md:mt-0">
                  <VendorProductCarousel vendorId={product.VendorId} />
                </div>
              </div>
              
            </div>
            <div className="w-full">
              {/* <Produc */}
              <RelatedProduct
                filters={{ CategoryId: product.CategoryId }}
                title="уг ангиллын бусад бараанууд" limit={10}
                titleLink={`/shop?catId=${product.CategoryId}`}
              />
              <RelatedProduct
                filters={{ BrandId: product.BrandId }}
                title="уг брэндийн бусад бараанууд"
                titleLink={`/shop?brandId=${product.BrandId}`}
                limit={10} />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <p>Өгөгдөл алга</p>;
  }
};

export default ProductDetailVariants;
