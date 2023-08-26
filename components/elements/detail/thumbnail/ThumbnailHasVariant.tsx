import { AspectRatio, Box } from '@chakra-ui/react';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Lightbox from 'react-18-image-lightbox';
import Slider from 'react-slick';
import NextArrow from '~/components/elements/carousel/NextArrow';
import PrevArrow from '~/components/elements/carousel/PrevArrow';
import { GoPlay } from "react-icons/go"
import BlurImage from '../../BlurImage';

type Props = {
    colorPicture?: string;
    setColorPicture: Dispatch<SetStateAction<string | undefined>>
    pictures?: ProductPictureInfo[]
    videos?: ProductFullInfo["Videos"]
}

const ThumbnailHasVariant = ({ colorPicture, pictures, setColorPicture, videos }: Props) => {
    const galleryCarousel = useRef(null);
    const variantCarousel = useRef(null);
    const [gallery, setGallery] = useState(null);
    const [variant, setVariant] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [productImages, setProductImages] = useState<{ url: string, videoUrl?: string }[]>([]);


    const handleOpenLightbox = (e: any, imageIndex: number) => {
        e.preventDefault();
        setPhotoIndex(imageIndex);
        setIsOpen(true);
    };

    useEffect(() => {
        let images: { url: string, videoUrl?: string }[] = [];

        if (pictures && pictures.length > 0) {
            pictures.map((item) => {
                images.push({ url: item.Large.Url, videoUrl: undefined });
            });
        }

        if (videos && videos.length > 0) {
            videos.map((item) => {
                images.push({ url: item.PreviewUrl, videoUrl: item.Url });
            });
        }

        // if(images){
        setProductImages(images);
        // }

        setGallery(galleryCarousel.current);
        setVariant(variantCarousel.current);
    }, [pictures]);

    const gallerySetting = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };
    const variantSetting = {
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 6,
                    dots: false,
                    slidesPerRow: 1,
                    arrows: false,
                    vertical: false,
                    infinite: false,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 6,
                    dots: false,
                    slidesPerRow: 1,

                    arrows: false,
                    vertical: false,
                    infinite: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 6,
                    slidesPerRow: 1,

                    dots: false,
                    arrows: false,
                    vertical: false,
                    infinite: false,
                },
            },
        ],
    };
  

    //Views
    let lightboxView, variantCarouselView, imagesView, galleryImagesView;
    if (productImages.length > 0) {
        // videos
        imagesView = productImages?.map((item, i) => (
            <Box rounded="5px" position={"relative"} className="item" key={i} onClick={() => setColorPicture(undefined)}>
                
                <AspectRatio ratio={1} overflow="hidden">
                        <BlurImage className='rounded-[0]' fill src={item.url} alt={item.url} />
                </AspectRatio>
                <Box _hover={{
                    color: "brand.100"
                }} hidden={!item.videoUrl} style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    opacity: "0.5",
                    transform: "translate(-50%,-50%)",
                    fontSize: "30px",
                }}>
                    <GoPlay />
                </Box>
            </Box>
        ))



        galleryImagesView = productImages.map((item, index) => (
            <AspectRatio ratio={1}>
                <div className="item" key={item.url} style={{
                    display: 'inline-block',
                    width: "100%",
                    borderRadius: "5px",
                }}>
                    <a href="#" >
                        {
                            !colorPicture ? (
                                item.videoUrl ? (
                                    <video style={{
                                        width: "100%",
                                        aspectRatio: "1/1",
                                        objectFit: "cover",
                                        borderRadius: "5px"
                                    }} controls>
                                        <source src={item.videoUrl} type="video/mp4" />
                                    </video>
                                ) : (
                                    <AspectRatio ratio={1}>
                                        <BlurImage src={item.url} alt={item.url} fill />
                                    </AspectRatio>
                                )
                            ) : (
                                <AspectRatio ratio={1}>
                                    <BlurImage fill src={colorPicture ? colorPicture : item.url} alt={colorPicture} />
                                </AspectRatio>
                            )

                        }
                    </a>
                    <div onClick={(e) => handleOpenLightbox(e, index)} className='absolute w-full h-full top-0 left-0 hover:bg-black/5'></div>
                </div>
            </AspectRatio>
        ));
    }

    variantCarouselView = (
        <Slider
            asNavFor={gallery as any}
            ref={(slider: any) => (variantCarousel.current = slider)}
            swipeToSlide={true}
            arrows={false}
            slidesToShow={6}
            slidesPerRow={1}
            vertical={false}
            // {...variantSetting}

            // centered={true }
            infinite={false}
            focusOnSelect={true}
            className="ps-product__variants"
        >
            {imagesView}
        </Slider>
    );

    if (isOpen) {
        lightboxView = (
            <Lightbox
                mainSrc={productImages[photoIndex].url}
                nextSrc={productImages[(photoIndex + 1) % productImages.length].url}
                prevSrc={
                    productImages[
                        (photoIndex + productImages.length - 1) %
                        productImages.length
                    ].url
                }
                onCloseRequest={() => {
                    setIsOpen(false);
                }}
                onMovePrevRequest={() => {
                    setPhotoIndex(
                        (photoIndex + productImages.length - 1) %
                        productImages.length
                    );
                }}
                onMoveNextRequest={() => {
                    setPhotoIndex((photoIndex + 1) % productImages.length);
                }}
            />
        );
    }

    return (
        <Box
            position="sticky"
            top="0"
            height="screen"
            className="ps-product__thumbnail"
            data-vertical="false"
            mb="10px"
        >
            {/* <Affix offsetTop={70}> */}

            <figure>
                <div className="ps-wrapper">
                    <Slider
                        {...gallerySetting}
                        ref={(slider: any) => (galleryCarousel.current = slider)}
                        asNavFor={variant as any}
                        className="ps-product__gallery ps-carousel inside">
                        {galleryImagesView}
                    </Slider>
                </div>
            </figure>
            {variantCarouselView}
            {lightboxView}
            {/* </Affix> */}
        </Box>
    );
}

export default ThumbnailHasVariant;
