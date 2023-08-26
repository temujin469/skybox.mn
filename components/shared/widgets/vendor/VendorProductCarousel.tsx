import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import { generateTempArray } from '~/utilities/common-helpers';
import Product from '~/components/elements/products/Product';
import { Heading, Text } from '@chakra-ui/react';
import { HiOutlineArrowLongRight } from 'react-icons/hi2';
import Link from 'next/link';
import useSearchItemsFrame from '~/apiCall/otapi/useSearchItemsFrame';
import NextArrow from '~/components/elements/carousel/NextArrow';
import PrevArrow from '~/components/elements/carousel/PrevArrow';

type Props = {
  vendorId:string;
}

const VendorProductCarousel = ({
  vendorId
}: Props) => {

  const { data, isLoading } = useSearchItemsFrame({ variables: { start: 0, limit:10, filters:{VendorId:vendorId} } });

  const products= data?.Result?.Items?.Content;


  const sliderRef = useRef<any>();


  const handleCarouselPrev = (e: any) => {
    e.preventDefault();
    sliderRef.current.slickPrev();
  };

  const handleCarouselNext = (e: any) => {
    e.preventDefault();
    sliderRef.current.slickNext();
  };


  const carouselConfig = {
    dots: false,
    infinite: true,
    speed: 710,
    slidesToShow: 2,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1750,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };



  // Views
  let productItemsView;
  if (!isLoading) {
    if (products && products.length > 0) {
      const slideItems = products.map((item) => (
        <Product product={item} key={item.Id} />
      ));
        productItemsView = (
          <Slider
            ref={(slider) => (sliderRef.current = slider)}
            {...carouselConfig}
            autoplay={true}
            arrows={false}
            className="ps-carousel outside">
            {slideItems}
          </Slider>
        );
     
    } else {
      productItemsView = <p>Бүтээгдэхүүн алга</p>;
    }
  } else {
    const skeletons = generateTempArray(4).map((item) => (
        <SkeletonProduct key={item}/>
    ));
    productItemsView = 
      <Slider
        ref={(slider) => (sliderRef.current = slider)}
        {...carouselConfig}
        autoplay={true}
        arrows={false}
        className="ps-carousel outside">
        {skeletons}
      </Slider>;
  }

  return (
    <div>
      <div className="flex items-center justify-between border-b mb-[20px] pb-[5px]">
        <Link href={`/shop?vendorId=${vendorId}`}>
          <Heading fontSize={{ base: "15px", sm: "17px" }} cursor="pointer" display="flex" className='group' alignItems={"center"} gap={3} textTransform="uppercase">
            Уг дэлгүүрийн бараа
            {/* <Text color="gray.600" display={["none", "inline-block"]} className='group-hover:translate-x-4 transition-transform duration-100'>
              <HiOutlineArrowLongRight size={30} />
            </Text> */}
          </Heading>
        </Link>

        <div className="flex gap-[5px]">
          <a
            className="flex h-[30px] w-[30px] items-center justify-center"
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
            className="flex h-[30px] w-[30px] items-center justify-center"

            onClick={(e) => handleCarouselNext(e)}>
            <i className="icon-chevron-right"></i>
          </a>
        </div>
      </div>
      <div className="ps-block__content">{productItemsView}</div>
    </div >
  );
};

export default VendorProductCarousel;
