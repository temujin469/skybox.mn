import React from 'react';
import Slider from 'react-slick';
import { carouselFullwidth, carouselStandard } from '~/utilities/carousel-helpers';
import Product from '~/components/elements/products/Product';

type Props = {
    type?:"standart" | "fullwidth"
    products?:ProductInfo[]
}

export const ProductGroupWithCarousel = ({type = 'fullwidth',products }:Props) => {

    if (type === 'fullwidth') {
        return (
            <Slider
                {...carouselFullwidth}
                infinite={products?.length && products.length > 7 ? true : false}
                className='ps-carousel outside'>
                {products?.map((item) => (
                    <div className='ps-carousel-item' key={item.Id}>
                        <Product product={item} />
                    </div>
                ))}
            </Slider>
        );
    } else {
        return (
            <Slider
                {...carouselStandard}
                infinite={products?.length && products.length > 5 ? true : false}
                className='ps-carousel outside'>
                {products?.map((item) => (
                    <div className='ps-carousel-item' key={item.Id}>
                        <Product product={item} />
                    </div>
                ))}
            </Slider>
        );
    }
};


