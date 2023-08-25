import React, { useEffect } from "react";
// import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault';
import DefaultDescription from "~/components/elements/detail/description/DefaultDescription";
import ModuleProductHasVariants from "~/components/elements/detail/modules/ModuleProductHasVariants";
import useAppState from "~/hooks/useAppState";
import Product from "../products/Product";
import VendorView from "~/components/shared/widgets/vendor/VendorView";
// import ModuleProductDetailDescription from '~/components/elements/detail/modules/ModuleProductDetailDescription';
// import ModuleDetailShoppingActions from '~/components/elements/detail/modules/ModuleDetailShoppingActions';
// import ModuleProductDetailSpecification from '~/components/elements/detail/modules/ModuleProductDetailSpecification';
// import ModuleProductDetailSharing from '~/components/elements/detail/modules/ModuleProductDetailSharing';
// import ModuleDetailActionsMobile from '~/components/elements/detail/modules/ModuleDetailActionsMobile';
// import ModuleDetailTopInformation from '~/components/elements/detail/modules/ModuleDetailTopInformation';

const ProductDetailVariants = ({
  product,
  vendorItems,
}: {
  product: ProductFullInfo;
  vendorItems?: {
    Content: ProductInfo[];
  };
}) => {
  // console.log({ product });
  const { setProductId, setvendorId } = useAppState();

  // console.log(vendorItems);

  useEffect(() => {
    setProductId(product.Id);
    setvendorId(product.VendorId);
  }, [product]);
  if (product) {
    return (
      <div className="ps-product--detail ps-product--fullwidth">
        <div className="ps-container  sm:px-[20px] xl:px-[30px]">
          <ModuleProductHasVariants product={product} />
        </div>
        <div className="md:bg-[#F1F1F1]">
          <div className="ps-container sm:px-[20px] xl:px-[30px]">
            <div className="md:grid grid-cols-12 gap-[20px] xl:gap-[30px] sm:py-[20px] xl:py-[30px]">
              <div className="col-span-8 md:p-[15px] lg:p-[25px] md:rounded-md h-fit bg-white">
                <DefaultDescription />
              </div>
              <div className="col-span-4 rounded-md  h-fit bg-white">
                <div className="p-[15px] shadow-md md:shadow-none rounded-md md:p-[20px] lg:p-[25px]">
                  <VendorView />
                </div>
                <div className="grid grid-cols-2 md:p-[18px] lg:p-[23px] mt-[20px] md:mt-0">
                  {vendorItems?.Content?.map((product) => (
                    <div className="col-span-1 md:col-span-2 lg:col-span-1">
                      <Product product={product} />
                    </div>
                  ))}
                </div>
              </div>
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
