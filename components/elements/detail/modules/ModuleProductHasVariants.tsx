import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import ModuleProductDetailSharing from '~/components/elements/detail/modules/ModuleProductDetailSharing';
import ModuleProductDetailSpecification from '~/components/elements/detail/modules/ModuleProductDetailSpecification';
// import Rating from '~/components/elements/Rating';
import ThumbnailHasVariant from '~/components/elements/detail/thumbnail/ThumbnailHasVariant';
import { useRouter } from 'next/router';
import { Rate, notification } from 'antd';
import { formatCurrency } from '~/utilities/product-helper';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '~/store/slices/cartSlice';
// import { addToCompare } from '~/store/slices/compareSlice';
import { addToWishlist } from '~/store/slices/wishlistSlice';
// import useSettings from '~/apiCall/strapi/useSettings';
import { Box, Button, Divider, Grid, GridItem, HStack, Heading, IconButton, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Stack, Text, Tooltip } from '@chakra-ui/react';
import { FiCopy, FiHeart, FiPieChart } from "react-icons/fi"
import { addToCompare } from '~/store/slices/compareSlice';
import { RootState } from '~/store/store';
import BlurImage from '../../BlurImage';
import { HiOutlineShare } from 'react-icons/hi';
import { FaFacebookF } from "react-icons/fa"
import { BsTwitter, BsInstagram, BsFacebook } from "react-icons/bs"
import SameProductDrawer from '~/components/partials/product/SameProductDrawer';
import {
    FacebookIcon,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from "react-share";
import ProductDetailMobileAction from '../ProductDetailMobileAction';


type Props = {
    product?: ProductFullInfo
}

const ModuleProductHasVariants = ({ product }: Props) => {

    const auth = useSelector((state: RootState) => state.auth);
    const isAuth = Boolean(auth.user);
    const [isOpenSameProductDrawer, setIsOpenSameProductDrawer] = useState(false);

    console.log(product)

    const closeSameProductDrawer = () => {
        setIsOpenSameProductDrawer(false)
    }

    const openSameProductDrawer = () => {
        setIsOpenSameProductDrawer(true)
    }

    // const { data } = useSettings();
    // const settings = data?.data?.attributes;

    const router = useRouter();

    const { cId } = router.query;

    const [quantity, setQuantity] = useState(1);

    const hiddenRef = useRef<HTMLDivElement>(null);


    // const cart = useSelector((state: RootState) => state.cart);
    // const compare = useSelector((state:RootState)=>state.compare);
    // const wishlist = useSelector((state: RootState) => state.wishlist);
    const dispatch = useDispatch()

    const colors = product?.Attributes.filter((att => att.Pid === "1627207" && att.IsConfigurator === true))

    const sizes = product?.Attributes.filter((att => att.Pid !== "1627207" && att.IsConfigurator === true))

    const defaultVariant = product?.ConfiguredItems.find((item) => item.Id === cId)

    const defaultColor = colors?.find((color) => defaultVariant?.Configurators.find(variant => variant.Vid === color.Vid))
    const defaultSize = sizes?.find((size) => defaultVariant?.Configurators.find(variant => variant.Vid === size.Vid))

    const [selectedVariant, setSelectedVariant] = useState<ProductConfiguredItem | undefined>();
    const [selectedSize, setSelectedSize] = useState<ProductAttribute | undefined>(defaultSize);
    const [selectedColor, setSelectedColor] = useState<ProductAttribute | undefined>(defaultColor);
    const [colorPicture, setColorPicture] = useState<string | undefined>(defaultColor?.ImageUrl)

    const last30sales = product?.FeaturedValues?.find((feature) => feature.Name === "SalesInLast30Days");

    const promotion = product?.Promotions?.find(
        (promotion) => promotion.ConfiguredItems.find(item => item.Id === selectedVariant?.Id)
    );
    const selectedPromotion = promotion?.ConfiguredItems.find(item => item.Id === selectedVariant?.Id);

    const [api, contextHolder] = notification.useNotification();



    function handleAddItemToCart() {
        if (sizes?.length && !selectedSize || !selectedVariant || colors?.length && !selectedColor) {
            return api.info({
                message: "Сонголтоо хийнэ үү!"
            })
        } else {
            const price = selectedPromotion?.Price.ConvertedPriceList.Internal.Price ? selectedPromotion?.Price.ConvertedPriceList.Internal.Price : selectedVariant.Price.ConvertedPriceList.Internal.Price
            addToCart(dispatch, {
                title: product?.Title!,
                pId: product?.Id,
                cId: cId as string,
                color: selectedColor?.Value,
                property_value: selectedSize?.Value,
                property_name: selectedSize?.PropertyName,
                price: price,
                quantity: quantity,
                image: selectedColor?.ImageUrl!,
                countInStock: selectedVariant.Quantity
            })
            api.success({
                message: "Сагсанд нэмэгдлээ"
            })
        }

    }

    function handleBuynow() {

        if (!auth.isLoading) {
            if (!isAuth) {
                return router.push("/account/register")
            }
            if (sizes?.length && !selectedSize || !selectedVariant || !selectedColor) {
                return api.info({
                    message: "Сонголтоо хийнэ үү!"
                })
            } else {

                const price = selectedPromotion?.Price.ConvertedPriceList.Internal.Price ? selectedPromotion?.Price.ConvertedPriceList.Internal.Price : selectedVariant.Price.ConvertedPriceList.Internal.Price
                addToCart(dispatch, {
                    title: product?.Title!,
                    pId: product?.Id,
                    cId: cId as string,
                    color: selectedColor.Value,
                    property_value: selectedSize?.Value,
                    property_name: selectedSize?.PropertyName,
                    price: price,
                    quantity: quantity,
                    image: selectedColor.ImageUrl!,
                    countInStock: selectedVariant.Quantity
                })
                router.push("/account/checkout")
                // api.success({
                //     message: "Хүслийн жагсаалтанд нэмэгдлээ"
                // })
            }
        }
    }

    const handleAddItemToCompare = (e: any) => {
        e.preventDefault();
        if (sizes?.length && !selectedSize || !selectedVariant || !selectedColor) {
            return api.info({
                message: "Сонголтоо хийнэ үү!"
            })
        } else {

            const price = selectedPromotion?.Price.ConvertedPriceList.Internal.Price ? selectedPromotion?.Price.ConvertedPriceList.Internal.Price : selectedVariant.Price.ConvertedPriceList.Internal.Price
            addToCompare(dispatch, {
                title: product?.Title!,
                pId: product?.Id,
                cId: cId as string,
                color: selectedColor.Value,
                property_value: selectedSize?.Value,
                property_name: selectedSize?.PropertyName,
                price: price,
                quantity: quantity,
                image: selectedColor.ImageUrl!,
                countInStock: selectedVariant.Quantity
            })
            api.success({
                message: "Харьцуулах жагсаалтанд нэмэгдлээ"
            })
        }
    };

    const handleAddItemToWishlist = (e: any) => {
        e.preventDefault();

        if (sizes?.length && !selectedSize || !selectedVariant || !selectedColor) {
            return api.info({
                message: "Сонголтоо хийнэ үү!"
            })
        } else {

            const price = selectedPromotion?.Price.ConvertedPriceList.Internal.Price ? selectedPromotion?.Price.ConvertedPriceList.Internal.Price : selectedVariant.Price.ConvertedPriceList.Internal.Price

            addToWishlist(dispatch, {
                title: product?.Title!,
                pId: product?.Id,
                cId: cId as string,
                color: selectedColor.Value,
                property_value: selectedSize?.Value,
                property_name: selectedSize?.PropertyName,
                price: price,
                quantity: quantity,
                image: selectedColor.ImageUrl!,
                countInStock: selectedVariant.Quantity
            })
            api.success({
                message: "Хүслийн жагсаалтанд нэмэгдлээ"
            })
        }

    };

    function handleIncreaseItemQty(e: any) {
        e.preventDefault();
        if (selectedVariant?.Quantity && quantity < selectedVariant?.Quantity) {
            setQuantity(quantity + 1);
        } else {
            api.info({
                message: "Тоон хэмжээ хүрэлцэхүй байна"
            })
        }
    }

    function handleDecreaseItemQty(e: any) {
        e.preventDefault();
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    function handleSelectColor(e: any, vId: string) {
        if (colors && colors.length > 0) {
            const selectedColor = colors.find(
                (item) => item.Vid === vId
            );

            if (selectedColor) {
                setSelectedColor(selectedColor);
            }
            setColorPicture(selectedColor?.ImageUrl)
        }
    }

    const handleVariant = () => {
        const existVariant = product?.ConfiguredItems.find(
            (item) => {
                if (selectedSize) {
                    return item.Configurators.find(con => con.Vid === selectedSize?.Vid) && item.Configurators.find(con => con.Vid === selectedColor?.Vid)
                } else {
                    return item.Configurators.find(con => con.Vid === selectedColor?.Vid)
                }
            }
        );
        if (existVariant) {
            setSelectedVariant(existVariant);
            router.push(`/product/${product?.Id}?cId=${existVariant?.Id}`)
            console.log(existVariant.Id)
        }
    }


    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
        handleVariant()
        setQuantity(1)
    }, [selectedSize, selectedColor])


    function handleSelectSize(e: any, vId: string) {
        if (sizes) {
            const selectedSizeItem = sizes.find(
                (item) => item.Vid === vId
            );
            if (selectedSizeItem) {
                setSelectedSize(selectedSizeItem);
            }
        }
    }



    let variants, sizeSelectionArea, priceArea, thumbnailArea;
    if (selectedVariant) {


        if (selectedPromotion) {
            priceArea = (
                <Heading color="gray.700" gap={2} size="2xl" display="flex" alignItems="end">
                    {formatCurrency(selectedPromotion.Price.ConvertedPriceList.Internal.Price)}
                    ₮
                    <Text textDecorationLine="line-through" color="gray.600" lineHeight="30px" fontSize="25px">
                        {formatCurrency(selectedVariant.Price.ConvertedPriceList.Internal.Price)}
                        ₮
                    </Text>
                </Heading>
            );
        } else {
            priceArea = (
                // <h4 className="ps-selectedVariant__price">
                //     {/* {formatCurrency(selectedVariant.Price.OriginalPrice * Math.ceil(settings?.CNY_rate!))} */}
                //     {formatCurrency(selectedVariant.Price.ConvertedPriceList.Internal.Price)}
                //     ₮
                // </h4>
                <Heading color="gray.700" size="2xl">
                    {/* //     {/* {formatCurrency(selectedVariant.Price.OriginalPrice * Math.ceil(settings?.CNY_rate!))} */}

                    {formatCurrency(selectedVariant.Price.ConvertedPriceList.Internal.Price)}
                    ₮
                </Heading>
            );
        }

    } else {
        priceArea = (
            <Heading color="gray.700" size="2xl">
                {/* //     {/* {formatCurrency(selectedVariant.Price.OriginalPrice * Math.ceil(settings?.CNY_rate!))} */}
                {formatCurrency(product?.Price.ConvertedPriceList.Internal.Price!)}
                ₮
            </Heading>
        );
    }


    thumbnailArea = <ThumbnailHasVariant videos={product?.Videos} pictures={product?.Pictures} colorPicture={colorPicture} setColorPicture={setColorPicture} />;

    if (product) {
        if (colors && colors?.length > 0) {
            let colorSelectionArea = (
                <Grid templateColumns={['repeat(7, 1fr)', 'repeat(9, 1fr)', 'repeat(9, 1fr)', 'repeat(12, 1fr)']} gap={[2, 2]}>
                    {
                        colors.map((item) => {
                            return (
                                <GridItem
                                    border="2px"
                                    borderColor={selectedColor && selectedColor.Vid === item.Vid ? "brand.1" : "gray.400"}
                                    _hover={{
                                        borderColor: "black"
                                    }}
                                    display="inline-block"
                                    w="100%"
                                    h="100%"
                                    marginEnd={2}
                                    aspectRatio="1/1"
                                    borderRadius={5}
                                    overflow={"hidden"}
                                    key={item.Vid}
                                    position="relative"
                                    onClick={(e) => handleSelectColor(e, item.Vid)}>
                                    <span className="ps-variant__tooltip" style={{ whiteSpace: "nowrap" }}>{item.Value}</span>

                                    <BlurImage
                                        src={(item.MiniImageUrl ? item.ImageUrl : product.MainPictureUrl) as string}
                                        alt={item.Value}
                                        fill
                                    />
                                </GridItem>
                            )
                        })
                    }
                </Grid>
            )
            if (sizes && sizes.length > 0) {
                sizeSelectionArea = sizes.map((item) => {
                    return (
                        <Box
                            onClick={(e) => handleSelectSize(e, item.Vid)}
                            display="inline-block" border="2px"
                            cursor="pointer"
                            color="gray.700"
                            textAlign="center"
                            minW="35px"
                            _hover={{
                                borderColor: "black"
                            }}
                            borderColor={selectedSize && selectedSize.Vid === item.Vid ? "brand.1" : "gray.400"} rounded={5} p="1" mb={2} mr={2}
                        >
                            {item.Value}
                        </Box>
                    );
                });
            }
            variants = (
                <div className="ps-product__variations">
                    <figure>
                        <figcaption>
                            <Box display="flex" alignItems="stretch" mb={3}>
                                <Heading fontSize="16px" className="pr-1">
                                    Барааны үлдэгдэл:
                                </Heading>
                                <Text lineHeight="22px">
                                    {selectedVariant?.Quantity}
                                    ширхэг
                                </Text>
                            </Box>
                        </figcaption>
                    </figure>
                    <figure>
                        <figcaption>
                            <Box display="flex" alignItems="stretch" mb={3}>
                                <Heading fontSize="16px" className="pr-1">
                                    Хятад доторх тээвэр:
                                </Heading>
                                <Text lineHeight="22px">
                                    {formatCurrency(product?.Price.DeliveryPrice.ConvertedPriceList.Internal.Price!)}₮
                                </Text>
                            </Box>
                        </figcaption>
                    </figure>
                    {
                        colors && colors.length > 0 ? (
                            <figure>
                                <figcaption>
                                    <Box display="flex" alignItems="stretch" mb={3}>
                                        <Heading fontSize="16px" className="pr-1">
                                            Өнгө:
                                        </Heading>
                                        <Text lineHeight="22px">
                                            {selectedColor
                                                ? selectedColor.Value
                                                : 'Сонгоx'}
                                        </Text>
                                    </Box>
                                </figcaption>
                                {colorSelectionArea}
                            </figure>
                        ) : null
                    }


                    {/* {selectedVariant !== null} */}
                    {
                        sizes && sizes?.length > 0 ? (
                            <figure>
                                <Box display="flex" alignItems="end" mb={3}>
                                    <Heading fontSize="16px" className="pr-1">
                                        {sizes[0]?.PropertyName}:
                                    </Heading>
                                    <Text lineHeight="15px">
                                        {selectedSize
                                            ? selectedSize.Value
                                            : 'Сонгоx'}
                                    </Text>
                                </Box>
                                {sizeSelectionArea}
                            </figure>
                        ) : null
                    }
                </div>
            );
        }
    }

    return (
        <div className="ps-product__header pb-[30px]">
            {contextHolder}
            {thumbnailArea}
            <div className="ps-product__info">
                <Heading fontSize={{ base: "19px", md: "22px" }} mb={3}>{product?.Title}</Heading>
                <div className='pb-[20px] flex flex-col sm:flex-row gap-[10px]'>
                    <Box display="flex items-center">
                        <Heading fontSize="16px" lineHeight="14px" className="pr-1">
                            Барааны код:
                        </Heading>
                        <Text lineHeight="15px">
                            {product?.Id}
                        </Text>
                    </Box>
                    <Text lineHeight="14px" className='sm:border-l border-l-0 sm:pl-2 '>
                        Сүүлийн 30 өдөрт {" "}
                        <span>{last30sales?.Value}{" "}
                            борлуулалт
                        </span>
                    </Text>
                </div>
                <Divider borderColor="gray.400" borderStyle="dashed" />
                <div className='pt-[15px] mb-[10px] lg:mb-[15px] flex flex-wrap items-baseline gap-[10px]'>
                    <div>
                        {priceArea}
                    </div>
                    <div>
                        <Rate disabled value={product?.VendorScore} />
                    </div>

                </div>
                {/* <ModuleProductDetailDescription product={product} /> */}
                {variants}

                <Box gap="10px" className="flex flex-col pb-[20px]">
                    <Box>
                        <Heading fontSize="17px" mb={3}>
                            Тоо хэмжээ
                        </Heading>
                    </Box>
                    <div className='flex flex-col md:flex-row gap-[10px]' ref={hiddenRef}>
                        <HStack w="fit" rounded={5} bgColor="gray.100">
                            <Button variant="ghost" size="lg" borderRightRadius={0} bgColor="gray.200" onClick={(e) => handleDecreaseItemQty(e)}>-</Button>
                            <Heading size="sm" w="100%" minW="45px" color="gray.600" textAlign="center">{quantity}</Heading>
                            <Button variant="ghost" size="lg" borderLeftRadius={0} bgColor="gray.200" onClick={(e) => handleIncreaseItemQty(e)}>+</Button>
                        </HStack>
                        <Box display={["flex", "flex"]} style={{
                            gap: "10px"
                        }}>
                            <Button size="lg"
                                w="100%"
                                onClick={handleAddItemToCart}
                            >
                                Картанд нэмэх
                            </Button>
                            <Button variant="brand"
                                w="100%"
                                size="lg"
                                onClick={handleBuynow}
                            >
                                Худалдаж авах
                            </Button>
                        </Box>
                    </div>
                </Box>
                <Divider borderColor="gray.400" borderStyle="dashed" />
                <Box gap="10px" display="flex" alignItems="center" py={3}>

                    <Button onClick={(e) => handleAddItemToWishlist(e)} size="lg" variant="ghost" leftIcon={<FiHeart size={18} />}>
                        Хадгалах
                    </Button>
                    <Button onClick={(e) => handleAddItemToCompare(e)} size="lg" variant="ghost" leftIcon={<FiPieChart size={18} />}>
                        Харьцуулах
                    </Button>
                    <Popover>
                        <PopoverTrigger>
                            <Button size="lg" variant="ghost" leftIcon={<HiOutlineShare size={18} />}>
                                Хуваалцах
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent w="160px">
                            <PopoverArrow />
                            <PopoverBody p={"8px"}>
                                <div className='gap-[10px] flex flex-col'>
                                    <FacebookShareButton url={`skybox.mn/${router.asPath}`} quote={product?.Title} hashtag='#skyboxmn' >
                                        <Stack direction="row" alignItems="center" className='hover:bg-gray-100 rounded-[5px] p-1 px-2'>
                                            <FacebookIcon size={30} className='rounded-full' />
                                            <Text>Facebook</Text>
                                        </Stack>
                                    </FacebookShareButton>
                                    <TwitterShareButton url={`skybox.mn/${router.asPath}`}  >
                                        <Stack direction="row" alignItems="center" className='hover:bg-gray-100 rounded-[5px] p-1 px-2'>
                                            <TwitterIcon size={30} className='rounded-full' />
                                            <Text>Twitter</Text>
                                        </Stack>
                                    </TwitterShareButton>
                                    <WhatsappShareButton url={`skybox.mn/${router.asPath}`}  >
                                        <Stack direction="row" alignItems="center" className='hover:bg-gray-100 rounded-[5px] p-1 px-2'>
                                            <WhatsappIcon size={30} className='rounded-full' />
                                            <Text>Whatsapp</Text>
                                        </Stack>
                                    </WhatsappShareButton>
                                </div>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>

                    <Button display={{ base: "none", lg: "flex" }} size="lg" variant="ghost" onClick={openSameProductDrawer} leftIcon={<FiCopy size={18} />}>
                        Төстэй бараа
                        <SameProductDrawer filters={{ CategoryId: product?.CategoryId, BrandId: product?.BrandId }} isOpen={isOpenSameProductDrawer} onClose={closeSameProductDrawer} />
                    </Button>

                    {/* <Tooltip placement='top' hasArrow label='Хүслийн жагсаалт'>
                            <IconButton w="45px" fontSize="20px" variant="icon" size="lg" aria-label='' onClick={(e) => handleAddItemToWishlist(e)} icon={<FiHeart />} />
                        </Tooltip>
                        <Tooltip placement='top' hasArrow label="Харьцуулах жагсаалт">
                            <IconButton w="45px" fontSize="20px" variant="icon" size="lg" aria-label='' onClick={(e) => handleAddItemToCompare(e)} icon={<FiPieChart />} />
                        </Tooltip> */}
                </Box>
                <Divider borderColor="gray.400" borderStyle="dashed" />
                {/* <ModuleProductDetailSharing /> */}
                <div className='pt-[20px]'>
                    <ModuleProductDetailSpecification />
                </div>

                <ProductDetailMobileAction quantity={quantity} handleIncreaseItemQty={handleIncreaseItemQty} handleDecreaseItemQty={handleDecreaseItemQty} target={hiddenRef.current as Element} handleAddItemToCart={handleAddItemToCart} handleBuynow={handleBuynow} />
            </div>
        </div>
    );
};

export default ModuleProductHasVariants
