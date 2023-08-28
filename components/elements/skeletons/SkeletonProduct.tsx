import { AspectRatio, Skeleton, SkeletonText } from "@chakra-ui/react";
import React from "react";

const SkeletonProduct = () => {
  return (
    //   <div className="ps-skeleton ps-skeleton--product">
    //     <Skeleton.Input active={true} size={350} style={{ height: 160 }} />
    //     <Skeleton paragraph={{ rows: 4, title: true }} />
    <div className={`ps-product`}>
      <div className="ps-product__thumbnail">
        <div>
          <AspectRatio ratio={1}>
            <Skeleton />
          </AspectRatio>
        </div>
      </div>
      <div className="ps-product__container">
        <div className="ps-product__content">
          <SkeletonText mt="3px" noOfLines={2} spacing="4" skeletonHeight="10px" />
        </div>
      </div>
    </div>
    //   </div>
  );
};

export default SkeletonProduct;
