import React from 'react';
import Slider from 'react-slick';
import NextArrow from '~/components/elements/carousel/NextArrow';
import PrevArrow from '~/components/elements/carousel/PrevArrow';
import Link from 'next/link';
import Promotion from '~/components/elements/media/Promotion';
import useGetHomeContent from '~/apiCall/strapi/useGetHomeContent';
import BlurImage from '~/components/elements/BlurImage';

const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL

const HomeDefaultBanner = () => {
    const { data } = useGetHomeContent();

    const banner = data?.data.attributes.banner

    const carouselSetting = {
        dots: false,
        infinite: true,
        speed: 750,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    // Views
    let mainCarouselView;
    if (banner?.banner_main.data) {
        const carouseItems = banner?.banner_main.data.map((item) => (
            <div className="slide-item" key={item.id}>
                <Link href="/shop" className="ps-banner-item--default bg--cover relative"
                >

                    <BlurImage fill src={`${baseUrl}${item.attributes.url}`} />
                </Link>
            </div>
        ));
        mainCarouselView = (
            <Slider {...carouselSetting} className="ps-carousel">
                {carouseItems}
            </Slider>
        );
    }
    return (
        <div className="ps-home-banner ps-home-banner--1">
            <div className="ps-container">
                <div className="ps-section__left">
                    {mainCarouselView}
                </div>
                <div className="ps-section__right">
                    <Promotion
                        link="#"
                        image={banner?.banner_1 ? banner.banner_1.data.attributes : undefined}
                    />
                    <Promotion
                        link="#"
                        image={banner?.banner_2 ? banner.banner_2.data.attributes : undefined}

                    />
                </div>
            </div>
        </div>
    );
};

export default HomeDefaultBanner;
