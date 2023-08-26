import React from 'react';
import Slider from 'react-slick';
import Product from '~/components/elements/products/Product';
import { carouselStandard } from '~/utilities/carousel-helpers';
import NextArrow from '~/components/elements/carousel/NextArrow';
import PrevArrow from '~/components/elements/carousel/PrevArrow';
import ProductGroupByCarousel from './ProductGroupByCarousel';
import useSearchItemsFrame from '~/apiCall/otapi/useSearchItemsFrame';


type Props = {
    title: string,
    limit?: number
    filters: Partial<ProductFilter>,
    titleLink: string,
    carouselConfig?: any
}

const RelatedProduct = ({ title, filters, limit = 10, titleLink, carouselConfig }: Props) => {

    const { data, isLoading } = useSearchItemsFrame({ variables: { start: 0, limit, filters } });

    const productItems = data?.Result?.Items?.Content;


    return (
        <ProductGroupByCarousel
            // carouselConfig={carouselConfig}
            titlelink={titleLink}
            title={title}
            products={productItems}
            isLoading={isLoading} />
    );
};

export default RelatedProduct;
