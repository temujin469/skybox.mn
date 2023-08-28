import React, { useEffect, useRef, useState } from 'react';
import { Box, Skeleton, } from '@chakra-ui/react';
import Lightbox from 'react-18-image-lightbox';
import { HiMiniViewfinderCircle } from 'react-icons/hi2';

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
    const [productImages, setProductImages] = useState<string[] | undefined>(undefined);


    useEffect(() => {
        let images: string[] = [product.MainPictureUrl];
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
    let imagesView, galleryImageView,lightboxView;
    if (productImages?.length) {
        galleryImageView = (
            <div className='aspect-square group   bg-gray-50 relative w-[180px] md:w-[190px] rounded-[5px] overflow-hidden'>
                <img src={productImages[photoIndex]} alt={productImages[photoIndex]} 
                    className='object-cover w-full h-full cursor-zoom-in hover:brightness-90 transition-all duration-200' />
                <div className='absolute opacity-0 group-hover:opacity-100 top-[50%] transition-all duration-200 left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                    <HiMiniViewfinderCircle size={30} color="white"/>
                </div>
            </div>
        )

        lightboxView = isOpen && (
            <Lightbox
                mainSrc={productImages[photoIndex]}
                nextSrc={productImages[(photoIndex + 1) % productImages.length]}
                prevSrc={productImages[(photoIndex + productImages.length - 1) % productImages.length]}
                onCloseRequest={() => setIsOpen(false)}
                onMovePrevRequest={() =>
                    setPhotoIndex((photoIndex + productImages.length - 1) % productImages.length)
                }
                onMoveNextRequest={() =>
                    setPhotoIndex( (photoIndex + 1) % productImages.length)
                }
            />
        )
    }else {
        galleryImageView = (
            <div className='aspect-square bg-gray-50 relative w-[180px] md:w-[190px] rounded-[5px] overflow-hidden'>
                <Skeleton
                    className='w-full h-full' />
            </div>
        )
    }




    return (
        <Box
            display="flex"
            // height="180px"
            className=' gap-2 w-fit'
        >
            <Box onClick={()=>setIsOpen(true)}>
                {galleryImageView}
            </Box>
            <Box display="flex" justifyContent="start" flexDirection="column" gap="7px">
                {
                    productImages ? productImages.slice(0, 5).map((item, i) => (
                        <Box border="1px" borderColor="gray.200" _hover={{borderColor:"brand.1"}} onMouseEnter={() => setPhotoIndex(i)}
                          onMouseOut={()=>setPhotoIndex(0)} className='aspect-square w-[28px] cursor-pointer bg-gray-50 overflow-hidden rounded-[4px]  h-[28px] md:w-[30px] md:h-[30px]'>
                            <img src={item} alt={item} className='object-cover w-full h-full' />
                        </Box>
                    )) : Array.from(Array(3)).map(i=>(
                        <Box className='aspect-square w-[28px] cursor-pointer overflow-hidden rounded-[4px]  h-[28px] md:w-[30px] md:h-[30px]'>
                            <Skeleton className='w-full h-full'/>
                        </Box>
                    ))
                }
            </Box>
            {lightboxView}
        </Box>
    );
};

export default ThumbnailDefault;
