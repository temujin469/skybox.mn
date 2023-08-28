
import React, { useRef } from 'react';
import Slider from 'react-slick';
import { generateTempArray } from '~/utilities/common-helpers';
// import NextArrow from '~/components/elements/carousel/NextArrow';
// import PrevArrow from '~/components/elements/carousel/PrevArrow';
import { AspectRatio, Box, Heading, Skeleton, Text } from '@chakra-ui/react';
import VendorCard from '~/components/elements/brand/BrandCard';
import useGetBrandInfoList from '~/apiCall/otapi/useGetBrandInfoList';
import Link from 'next/link';
import BlurImage from '~/components/elements/BlurImage';
import { Rate } from 'antd';



const TopVendorsCarousel = () => {

  const { data, isLoading } = useGetBrandInfoList()
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

  const carouselConfig = {
    dots: false,
    infinite: true,
    speed: 750,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    pauseOnHover: true,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
    lazyload: false,
    responsive: [
      {
        breakpoint: 1750,
        settings: {
          slidesToShow: 6,
        },
      },

      {
        breakpoint: 1366,
        settings: {
          slidesToShow:6,
          infinite: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow:5,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow:4,
          slidesToScroll: 1,
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
  let brandItemsView;
  if (!isLoading) {
    if (brands && brands.length > 0) {
      const slideItems = brands.map((item) => {
        return item.PictureUrl ? (
          <div className=' py-0'>
            <Box border="1px"  bg="white" _hover={{
              shadow: "sm",
              borderColor: "gray.400"
            }} borderRadius="5px" overflow="hidden" p="10px" borderColor="gray.200" mx="4px">
              <Link href={`/shop?brandId=${item.Id}`} className='flex gap-[10px] items-center'>
                <AspectRatio ratio={1} className='rounded-[5px] border w-[40%]'>
                  <BlurImage fill src={item.PictureUrl!} />
                </AspectRatio>
                <Heading size="sm" className='overflow-hidden whitespace-nowrap text-ellipsis w-[50%]'>{item.Name.split("/")[0]}</Heading>

                {/* <div className='hidden md:block'>
                    <Heading size="sm">{"name"}</Heading>
                  {vendorInfo?.Location?.State && (
                    <Heading fontSize="14px" className="flex gap-1 items-center mt-[5px]">
                      <TbMapPin size={20} />
                      {vendorInfo.Location?.State
                        ? vendorInfo.Location?.State
                        : vendorInfo.Location?.City}
                    </Heading>
                )}
                  <Rate disabled value={4} className="mb-0" />

                </div> */}

              </Link>
            </Box>
          </div>
        
        ) : null
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
        <AspectRatio borderRadius="5px" overflow="hidden" ratio={1} key={item}>
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
    <Box mt={{ base: "10px", sm: "20px" }}>
      {brandItemsView}
    </Box >
  );
};

export default TopVendorsCarousel;

