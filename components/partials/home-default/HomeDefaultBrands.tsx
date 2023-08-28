
import React, { useRef} from 'react';
import Slider from 'react-slick';
import { generateTempArray } from '~/utilities/common-helpers';
// import NextArrow from '~/components/elements/carousel/NextArrow';
// import PrevArrow from '~/components/elements/carousel/PrevArrow';
import { AspectRatio, Box, Skeleton, Text } from '@chakra-ui/react';
import VendorCard from '~/components/elements/brand/BrandCard';
import useGetBrandInfoList from '~/apiCall/otapi/useGetBrandInfoList';



const HomeDefaultBrands = () => {

  const  {data,isLoading} = useGetBrandInfoList()
  const brands = data?.BrandInfoList.Content;


  const sliderRef = useRef<any>();

  const handleCarouselPrev = (e: any) => {
    e.preventDefault();
    sliderRef.current.slickPrev();
  };

  const handleCarouselNext = (e: any) => {
    e.preventDefault();
    sliderRef.current.slickNext();
  };

   const carouselConfig= {
    dots: false,
    infinite: true,
    speed: 750,
    slidesToShow: 18,
    slidesToScroll: 3,
     autoplay: true,
    arrows: true,
     pauseOnHover: true,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
    lazyload:false,
    responsive: [
      {
        breakpoint: 1750,
        settings: {
          slidesToShow: 17,
          slidesToScroll: 3,
        },
      },

      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 16,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 13,
          slidesToScroll: 1,
          infinite: true,

        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 10,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 6,
        },
      },
    ],
  };


  // Views
  let brandItemsView;
  if (!isLoading) {
    if (brands && brands.length > 0) {
      const slideItems = brands.map((item) => {
        return item.PictureUrl ? <VendorCard brand={item} key={item.Id} /> : null
    });
      brandItemsView = (
        <Slider
          ref={(slider) => (sliderRef.current = slider)}
          {...carouselConfig}
          arrows={false}
          >
          {slideItems}
        </Slider>
      );
    } else {
      brandItemsView = <p>Хоосон байна</p>;
    }
  } else {
    const skeleton = generateTempArray(19).map((item) => (
      <Box px="4px">
        <AspectRatio borderRadius="full"  overflow="hidden" ratio={1} key={item}>
          <Skeleton w="full" h="full" />
        </AspectRatio>
      </Box>
     
    ));
    brandItemsView = <Slider
      ref={(slider) => (sliderRef.current = slider)}
      {...carouselConfig}
      arrows={false}
      >
      {skeleton}
    </Slider>
  }

  return (
    <Box mt={{base:"10px",sm:"20px"}}>
     {brandItemsView}
    </Box >
  );
};

export default HomeDefaultBrands;

