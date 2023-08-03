import React, { Component, useEffect, useState } from 'react';
import Slider from 'react-slick';
import Product from '~/components/elements/products/Product';
import { carouselStandard } from '~/utilities/carousel-helpers';
import NextArrow from '~/components/elements/carousel/NextArrow';
import PrevArrow from '~/components/elements/carousel/PrevArrow';
import useGetProductsByFilter from '~/apiCall/otapi/useGetProductsByFilter';
import ProductGroupByCarousel from './ProductGroupByCarousel';
import { layout } from '@chakra-ui/react';


type Props = {
    collection:string,
    catId:string
}

const RelatedProduct = ({ collection,catId}:Props) => {

    const [page, setPage] = useState<number>(0)
    const [start, setStart] = useState<number>(0)

    const { data, isLoading } = useGetProductsByFilter({ variables: { start, limit: 10, filters:undefined, catId: catId as string } });

    const productItems = data?.OtapiItemInfoSubList?.Content;



    const carouselFullwidth = {
        dots: false,
        infinite: productItems && productItems.length > 7 ? true : false,
        speed: 750,
        slidesToShow: 7,
        slidesToScroll: 3,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        lazyload: true,
        responsive: [
            {
                breakpoint: 1750,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 3,
                    dots: true,
                    arrows: false,
                },
            },

            {
                breakpoint: 1366,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                    arrows: false,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    dots: true,
                    arrows: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    dots: true,
                    arrows: false,
                },
            },
        ],
    };

    const layout = "fullwidth";

    // Views
    let carouselView;
    if (!isLoading) {
        if (productItems) {
            if ((layout === 'fullwidth')) {
                carouselView = (
                    <Slider
                        {...carouselFullwidth}
                        className="ps-carousel outside">
                        {productItems.map((item, index) => {
                            if (index < 8) {
                                return <Product product={item} key={item.Id} />;
                            }
                        })}
                    </Slider>
                );
            } else {
                carouselView = (
                    <Slider
                        {...carouselStandard}
                        className="ps-carousel outside">
                        {productItems.map((item, index) => {
                            if (index < 8) {
                                return <Product product={item} key={item.Id} />;
                            }
                        })}
                    </Slider>
                );
            }
        } else {
            carouselView = <p>No product found.</p>;
        }
    } else {
        carouselView = <p>Loading...</p>;
    }

    return (
        // <div
        //     className={`ps-section--default ps-related-products`}>
        //     <div className="ps-section__header">
        //         <h3>Санал болгох</h3>
        //     </div>
        //     <div className="ps-section__content">{carouselView}</div>
        // </div>
        <ProductGroupByCarousel title='Санал болгох' products={productItems} isLoading={isLoading}/>
    );
};

export default RelatedProduct;
