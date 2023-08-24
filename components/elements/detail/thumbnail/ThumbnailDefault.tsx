import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import Lightbox from "react-18-image-lightbox";
import NextArrow from '~/components/elements/carousel/NextArrow';
import PrevArrow from '~/components/elements/carousel/PrevArrow';
import { Box, Grid, GridItem } from '@chakra-ui/react';


type Props = {
    product: ProductInfo
}

const ThumbnailDefault = ({ product }: Props) => {
    const galleryCarousel = useRef(null);
    const variantCarousel = useRef(null);
    const [gallery, setGallery] = useState(null);
    const [variant, setVariant] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [productImages, setProductImages] = useState<string[]>([]);


    useEffect(() => {
        let images: string[] = [];
        if (product && product.Pictures.length > 0) {
            product.Pictures.map((item) => {
                images.push(item.Medium.Url);
            });
            setProductImages(images);
        }
        setGallery(galleryCarousel.current);
        setVariant(variantCarousel.current);
    }, [product]);

    //Views
    let imagesView, galleryImageView;
    if (productImages.length > 0) {
        galleryImageView = (
            <img src={productImages[photoIndex]} alt={productImages[photoIndex]} style={{
                height: "180px",
                width: "180px",
                borderRadius: "5px",
                objectFit:"contain"
            }} />
        )
    }


    return (
        <Box
            display="flex"
            height="180px"
            width="210px"
        >
            <Box width="230px">
                {galleryImageView}
            </Box>
            <Box display="flex" justifyContent="space-between" flexDirection="column" gap={2}>
                {
                    productImages.slice(0,6).map((item) => (

                        <img src={item} alt={item} style={{
                            aspectRatio: "1/1",
                            width: "25px",
                            height: "25px",
                            border: "1px solid gray",
                            borderRadius: "5px",
                            objectFit: "cover"
                        }} />
                    ))
                }
            </Box>
        </Box>
    );
};

export default ThumbnailDefault;
