
import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import { generateTempArray } from '~/utilities/common-helpers';
import Product from '~/components/elements/products/Product';
import { carouselStandard, carouselFullwidth } from '~/utilities/carousel-helpers';
// import NextArrow from '~/components/elements/carousel/NextArrow';
// import PrevArrow from '~/components/elements/carousel/PrevArrow';
import { Heading, Text } from '@chakra-ui/react';
import { HiOutlineArrowLongRight } from 'react-icons/hi2';
import Link from 'next/link';
import VendorCard from '~/components/elements/brand/BrandCard';

type Props = {
  brands?: BrandInfoContent[]
  isLoading: boolean
}

const BrandCardCarousel = ({
  brands,
  isLoading,
}: Props) => {
  const sliderRef = useRef<any>();



  const handleCarouselPrev = (e: any) => {
    e.preventDefault();
    sliderRef.current.slickPrev();
  };

  const handleCarouselNext = (e: any) => {
    e.preventDefault();
    sliderRef.current.slickNext();
  };


  // Views
  let brandItemsView;
  if (!isLoading) {
    if (brands && brands.length > 0) {
      const slideItems = brands.map((item) => (
        <VendorCard brand={item} key={item.Id} />
      ));
      brandItemsView = (
        <Slider
          ref={(slider) => (sliderRef.current = slider)}
          {...carouselFullwidth}
          arrows={false}
          className="ps-carousel outside">
          {slideItems}
        </Slider>
      );
    } else {
      brandItemsView = <p>Хоосон байна</p>;
    }
  } else {
    const skeletons = generateTempArray(6).map((item) => (
      <div className="col-xl-2 col-lg-3 col-sm-3 col-6" key={item}>
        <SkeletonProduct />
      </div>
    ));
    brandItemsView = <div className="row">{skeletons}</div>;
  }

  return (
    <div className="ps-block--shop-features">
      <div className="ps-block__header">
        <Link href={"#"}>
          {/* <Heading cursor="pointer" display="flex" className='group' alignItems={"center"} gap={3} textTransform="uppercase">{title}
            <Text color="gray.600" display={["none", "inline-block"]} className='group-hover:translate-x-4 transition-transform duration-100'>
              <HiOutlineArrowLongRight size={30} />
            </Text>
          </Heading> */}
        </Link>

        <div className="ps-block__navigation">
          <a
            className="ps-carousel__prev"
            // style={{
            //     width:"30px",
            //     height:"30px",
            //     borderRadius:"100%",
            //     display:"flex",
            //     alignItems: "center",
            //     justifyContent: "center",
            //     backgroundColor:"#000"
            // }}
            onClick={(e) => handleCarouselPrev(e)}>
            <i className="icon-chevron-left"></i>
          </a>
          <a
            className="ps-carousel__next"

            onClick={(e) => handleCarouselNext(e)}>
            <i className="icon-chevron-right"></i>
          </a>
        </div>
      </div>
      <div className="ps-block__content">{brandItemsView}</div>
    </div >
  );
};

export default BrandCardCarousel;

