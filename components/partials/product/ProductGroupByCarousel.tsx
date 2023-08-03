import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import { generateTempArray } from '~/utilities/common-helpers';
import Product from '~/components/elements/products/Product';
import { carouselStandard,carouselFullwidth } from '~/utilities/carousel-helpers';
// import NextArrow from '~/components/elements/carousel/NextArrow';
// import PrevArrow from '~/components/elements/carousel/PrevArrow';
import { Heading } from '@chakra-ui/react';

type Props = {
    title:string
    layout?:"standard" | "fullwidth"
    products?:ProductInfo[]
    isLoading:boolean
}

const ProductGroupByCarousel = ({
    title,
    layout = 'fullwidth',
    products,
    isLoading
}:Props) => {
    const sliderRef = useRef<any>();


    // useEffect(() => {
    //     getProductsByCollection(collectionSlug);
    // }, [collectionSlug]);

    const handleCarouselPrev = (e:any) => {
        e.preventDefault();
        sliderRef.current.slickPrev();
    };

    const handleCarouselNext = (e:any) => {
        e.preventDefault();
        sliderRef.current.slickNext();
    };
 

    // Views
    let productItemsView;
    if (!isLoading) {
        if (products && products.length > 0) {
            const slideItems = products.map((item) => (
                <Product product={item} key={item.Id} />
            ));
            if (layout !== 'standard') {
                productItemsView = (
                    <Slider
                        ref={(slider) => (sliderRef.current = slider)}
                        {...carouselFullwidth}
                        arrows={false}
                        className="ps-carousel outside">
                        {slideItems}
                    </Slider>
                );
            } else {
                productItemsView = (
                    <Slider
                        ref={(slider) => (sliderRef.current = slider)}
                        {...carouselStandard}
                        arrows={false}
                        className="ps-carousel outside">
                        {slideItems}
                    </Slider>
                );
            }
        } else {
            productItemsView = <p>Бүтээгдэхүүн алга</p>;
        }
    } else {
        const skeletons = generateTempArray(6).map((item) => (
            <div className="col-xl-2 col-lg-3 col-sm-3 col-6" key={item}>
                <SkeletonProduct />
            </div>
        ));
        productItemsView = <div className="row">{skeletons}</div>;
    }

    return (
        <div className="ps-block--shop-features">
            <div className="ps-block__header">
                <Heading textTransform="uppercase">{title}</Heading>
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
            <div className="ps-block__content">{productItemsView}</div>
        </div>
    );
};

export default ProductGroupByCarousel;
