import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ModuleProductDetailSharing from '~/components/elements/detail/modules/ModuleProductDetailSharing';
import ModuleProductDetailSpecification from '~/components/elements/detail/modules/ModuleProductDetailSpecification';
// import Rating from '~/components/elements/Rating';
import ThumbnailHasVariant from '~/components/elements/detail/thumbnail/ThumbnailHasVariant';
import { useRouter } from 'next/router';
import { notification } from 'antd';
import { formatCurrency } from '~/utilities/product-helper';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '~/store/slices/cartSlice';
// import { addToCompare } from '~/store/slices/compareSlice';
import { addToWishlist } from '~/store/slices/wishlistSlice';
import useSettings from '~/apiCall/strapi/useSettings';
import { Box, Button, Grid, GridItem, HStack, Heading, IconButton, Input, Text, Tooltip } from '@chakra-ui/react';
import { FiHeart, FiPieChart } from "react-icons/fi"
import { addToCompare } from '~/store/slices/compareSlice';
import { RootState } from '~/store/store';

type Props = {
    product?: ProductFullInfo
}

const ModuleProductHasVariants = ({ product }: Props) => {

    const auth = useSelector((state: RootState) => state.auth);
    const isAuth = Boolean(auth.user);

    const { data } = useSettings();
    const settings = data?.data.attributes;

    const router = useRouter();

    const { cId } = router.query;



    const [quantity, setQuantity] = useState(1);


    // const cart = useSelector((state: RootState) => state.cart);
    // const compare = useSelector((state:RootState)=>state.compare);
    // const wishlist = useSelector((state: RootState) => state.wishlist);
    const dispatch = useDispatch()

    const colors = product?.Attributes.filter((att => att.Pid === "1627207" && att.IsConfigurator === true))

    const sizes = product?.Attributes.filter((att => att.Pid !== "1627207" && att.IsConfigurator === true))

    const defaultVariant = product?.ConfiguredItems.find((item) => item.Id === cId)

    const defaultColor = colors?.find((color) => defaultVariant?.Configurators.find(variant => variant.Vid === color.Vid))
    const defaultSize = sizes?.find((size) => defaultVariant?.Configurators.find(variant => variant.Vid === size.Vid))

    const [selectedVariant, setSelectedVariant] = useState<ProductConfiguredItem | undefined>(defaultVariant);
    const [selectedSize, setSelectedSize] = useState<ProductAttribute | undefined>(defaultSize);
    const [selectedColor, setSelectedColor] = useState<ProductAttribute | undefined>(defaultColor);
    const [colorPicture, setColorPicture] = useState<string | undefined>(defaultColor?.ImageUrl)

    const last30sales = product?.FeaturedValues?.find((feature) => feature.Name === "SalesInLast30Days")

    const [api, contextHolder] = notification.useNotification()


    console.log(product?.PromotionPrice)
    console.log(product?.Price)



    function handleAddItemToCart(e: any) {
        e.preventDefault();
        if (sizes?.length && !selectedSize || !selectedVariant || !selectedColor) {
            return api.info({
                message: "Сонголтоо хийнэ үү!"
            })
        } else {
            addToCart(dispatch, {
                title: product?.Title!,
                pId: product?.Id,
                cId: cId as string,
                color: selectedColor.Value,
                property_value: selectedSize?.Value,
                property_name: selectedSize?.PropertyName,
                price: selectedVariant.Price.ConvertedPriceList.Internal.Price!,
                quantity: quantity,
                image: selectedColor.ImageUrl!,
                countInStock: selectedVariant.Quantity
            })
            api.success({
                message: "Сагсанд нэмэгдлээ"
            })
        }

    }

    function handleBuynow(e: any) {
        e.preventDefault();

        if (!auth.isLoading) {
            if (!isAuth) {
                return router.push("/account/register")
            }
            if (sizes?.length && !selectedSize || !selectedVariant || !selectedColor) {
                return api.info({
                    message: "Сонголтоо хийнэ үү!"
                })
            } else {
                addToCart(dispatch, {
                    title: product?.Title!,
                    pId: product?.Id,
                    cId: cId as string,
                    color: selectedColor.Value,
                    property_value: selectedSize?.Value,
                    property_name: selectedSize?.PropertyName,
                    price: selectedVariant.Price.ConvertedPriceList.Internal.Price!,
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
            addToCompare(dispatch, {
                title: product?.Title!,
                pId: product?.Id,
                cId: cId as string,
                color: selectedColor.Value,
                property_value: selectedSize?.Value,
                property_name: selectedSize?.PropertyName,
                price: selectedVariant.Price.ConvertedPriceList.Internal.Price!,
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
            addToWishlist(dispatch, {
                title: product?.Title!,
                pId: product?.Id,
                cId: cId as string,
                color: selectedColor.Value,
                property_value: selectedSize?.Value,
                property_name: selectedSize?.PropertyName,
                price: selectedVariant.Price.ConvertedPriceList.Internal.Price!,
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
        if (selectedVariant.PromotionPrice) {
            priceArea = (
                <h4 className="ps-product__price sale">
                    <del className="mr-2">
                        {formatCurrency(selectedVariant.PromotionPrice.ConvertedPriceList.Internal.Price)}
                        ₮
                    </del>
                    {formatCurrency(selectedVariant.Price.OriginalPrice)}
                    ₮
                </h4>
            );
        } else {
            priceArea = (
                // <h4 className="ps-selectedVariant__price">
                //     {/* {formatCurrency(selectedVariant.Price.OriginalPrice * Math.ceil(settings?.CNY_rate!))} */}
                //     {formatCurrency(selectedVariant.Price.ConvertedPriceList.Internal.Price)}
                //     ₮
                // </h4>
                <Heading color="gray.700" size="2xl" mb={5}>
                    {/* //     {/* {formatCurrency(selectedVariant.Price.OriginalPrice * Math.ceil(settings?.CNY_rate!))} */}
                    {formatCurrency(selectedVariant.Price.ConvertedPriceList.Internal.Price)}
                    ₮
                </Heading>
            );
        }

    } else {
        priceArea = (
            <Heading color="gray.700" size="2xl" mb={5}>
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

                                    {item.MiniImageUrl ? (
                                        <img
                                            src={item.MiniImageUrl}
                                            alt=""
                                            style={{
                                                aspectRatio: "1/1",
                                                objectFit: "cover"
                                            }}
                                        />
                                    ) : (
                                        <img
                                            src={product.MainPictureUrl}
                                            alt=""
                                            style={{
                                                aspectRatio: "1/1",
                                                objectFit: "cover"
                                            }}
                                        />
                                    )}
                                </GridItem>
                            );
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
                            <Box display="flex" alignItems="end" mb={3}>
                                <Heading fontSize="16px" className="pr-1">
                                    Барааны үлдэгдэл:
                                </Heading>
                                <Text lineHeight="15px">
                                    {selectedVariant?.Quantity}
                                    ширхэг
                                </Text>
                            </Box>
                        </figcaption>
                    </figure>
                    <figure>
                        <figcaption>
                            <Box display="flex" alignItems="end" mb={3}>
                                <Heading fontSize="16px" className="pr-1">
                                    Хятад доторх тээвэр:
                                </Heading>
                                <Text lineHeight="15px">
                                    {formatCurrency(product?.Price.DeliveryPrice.ConvertedPriceList.Internal.Price!)}₮
                                </Text>
                            </Box>
                        </figcaption>
                    </figure>
                    <figure>
                        <figcaption>
                            <Box display="flex" alignItems="end" mb={3}>
                                <Heading fontSize="16px" className="pr-1">
                                    Өнгө:
                                </Heading>
                                <Text lineHeight="15px">
                                    {selectedColor
                                        ? selectedColor.Value
                                        : 'Сонгоx'}
                                </Text>
                            </Box>
                        </figcaption>

                        {colorSelectionArea}
                    </figure>
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
        <div className="ps-product__header">
            {contextHolder}
            {thumbnailArea}
            <div className="ps-product__info">
                <Heading fontSize="22px" mb={3}>{product?.Title}</Heading>
                <div className="ps-product__meta">
                    <Box display="flex" alignItems="end">
                        <Heading fontSize="16px" className="pr-1">
                            Барааны код:
                        </Heading>
                        <Text lineHeight="15px">
                            {product?.Id}
                        </Text>
                    </Box>
                    {/* <div className="ps-product__rating">
                        Сүүлийн 30 өдөрт:
                        <span>{last30sales?.Value}{" "}
                            борлуулалт
                        </span>
                    </div> */}
                </div>
                {priceArea}
                {/* <ModuleProductDetailDescription product={product} /> */}
                {variants}
                <Box gap="10px" className="ps-product__shopping">
                    <Box>
                        <Heading fontSize="17px" mb={3}>
                            Тоо хэмжээ
                        </Heading>
                        <Box gap="10px" display="flex" alignItems="center">
                            <HStack w="100%" rounded={5} bgColor="gray.100">
                                <Button variant="ghost" size="lg" borderRightRadius={0} bgColor="gray.200" onClick={(e) => handleDecreaseItemQty(e)}>-</Button>
                                <Heading size="sm" w="100%" minW="45px" color="gray.600" textAlign="center">{quantity}</Heading>
                                <Button variant="ghost" size="lg" borderLeftRadius={0} bgColor="gray.200" onClick={(e) => handleIncreaseItemQty(e)}>+</Button>
                            </HStack>
                            {/* <Box rounded={5} className="form-group--number">
                                <button
                                    className="up"
                                    onClick={(e) => handleIncreaseItemQty(e)}>
                                    <i className="fa fa-plus"></i>
                                </button>
                                <button
                                    className="down"
                                    onClick={(e) => handleDecreaseItemQty(e)}>
                                    <i className="fa fa-minus"></i>
                                </button>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder={quantity.toString()}
                                    disabled
                                />
                            </Box> */}
                            <Tooltip placement='top' hasArrow label='Хүслийн жагсаалт'>
                                <IconButton w="45px" fontSize="20px" variant="icon" size="lg" aria-label='' onClick={(e) => handleAddItemToWishlist(e)} icon={<FiHeart />} />
                            </Tooltip>
                            <Tooltip placement='top' hasArrow label="Харьцуулах жагсаалт">
                                <IconButton w="45px" fontSize="20px" variant="icon" size="lg" aria-label='' onClick={(e) => handleAddItemToCompare(e)} icon={<FiPieChart />} />
                            </Tooltip>



                        </Box>

                    </Box>
                    <Box display={["none", "flex"]} style={{
                        gap: "10px"
                    }}>
                        <Button size="lg"
                            w="100%"
                            onClick={(e) => handleAddItemToCart(e)}
                        >
                            Картанд нэмэх
                        </Button>
                        <Button variant="brand"
                            w="100%"
                            size="lg"
                            onClick={(e) => handleBuynow(e)}
                        >
                            Худалдаж авах
                        </Button>
                    </Box>

                </Box>
                <ModuleProductDetailSpecification />
                <ModuleProductDetailSharing />
                <div className="ps-product__actions-mobile">
                    <a
                        className="ps-btn ps-btn--black"
                        style={{
                            height: "67px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",

                        }}
                        onClick={(e) => handleAddItemToCart(e)}
                    >
                        Сагслах
                    </a>
                    <a
                        className="ps-btn"
                        onClick={(e) => handleBuynow(e)}
                        style={{
                            height: "67px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        Авах
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ModuleProductHasVariants
