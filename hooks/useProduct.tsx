import React from 'react';
// import LazyLoad from 'react-lazyload';
import { formatCurrency } from '~/utilities/product-helper';
import Link from 'next/link';
import { Text } from '@chakra-ui/react';


function getImageURL(source: ProductPictureInfo, size?: "large" | "medium" | "small") {
    let image: string, imageURL: string;

    if (source) {
        if (size && size === 'large') {
            if (source.Large) {
                image = source.Large.Url;
            } else {
                image = source.Url;
            }
        } else if (size && size === 'medium') {
            if (source.Medium) {
                image = source.Medium.Url;
            } else {
                image = source.Url;
            }
        } else if (size && size === 'small') {
            if (source.Small) {
                image = source.Small.Url;
            } else {
                image = source.Url
            }
        } else {
            image = source.Url
        }
        imageURL = image
    } else {
        imageURL = `/static/img/undefined-product-thumbnail.jpg`;
    }
    return imageURL;
}

export default function useProduct() {
    return {
        thumbnailImage: (payload: ProductPictureInfo) => {
            if (payload) {
                return (
                    <>
                        {/* <LazyLoad> */}
                        <img
                            src={getImageURL(payload)}
                            alt={getImageURL(payload)}
                        />
                        {/* </LazyLoad> */}
                    </>
                );
            }
        },
        price: (payload: ProductInfo) => {
            let view;
            if (payload.PromotionPrice) {
                view = (
                    <p className="ps-product__price sale">
                        <span>{payload.PromotionPrice.ConvertedPriceList.Internal.Sign}</span>
                        {formatCurrency(payload.PromotionPrice.ConvertedPriceList.Internal.Price)}
                        <del className="ml-2">
                            <span>{payload.Price.ConvertedPriceList.Internal.Sign}</span>
                            {formatCurrency(payload.Price.ConvertedPriceList.Internal.Price)}
                        </del>
                    </p>
                );
            } else {
                view = (
                    <p className="ps-product__price">
                        <span>{payload.Price.ConvertedPriceList.Internal.Sign}</span>
                        {formatCurrency(payload.Price.ConvertedPriceList.Internal.Price)}
                    </p>
                );
            }
            return view;
        },
        features: (payload: ProductInfo) => {
            let view = null;
            if (payload.Features && payload.Features.length > 0) {
                // const items = payload.Features.map((item) => {
                //     if (item.value === 'hot') {
                //         return (
                //             <span
                //                 className="ps-product__badge hot"
                //                 key={item.id}>
                //                 Hot
                //             </span>
                //         );
                //     }
                //     if (item.value === 'new') {
                //         return (
                //             <span
                //                 className="ps-product__badge new"
                //                 key={item.id}>
                //                 New
                //             </span>
                //         );
                //     }
                //     if (item.value === 'sale') {
                //         return (
                //             
                //         );
                //     }
                // });
                view = <div className="ps-product__badges">]
                    {
                        payload.Features.map((feature) => (
                            <span
                                className="ps-product__badge sale"
                                key={feature}>
                                {feature}
                            </span>
                        ))
                    }

                </div>;
            }
            return view;
        },
        badge: (payload: ProductInfo) => {
            let view;
            // if (payload.StuffStatus) {
            //     if (payload.StuffStatus === 'New') {
            //         view = (
            //             <div className="ps-product__badge">
            //                 Шинэ
            //             </div>
            //         );
            //     } else if (payload.StuffStatus === 'outStock') {
            //         view = (
            //             <div className="ps-product__badge out-stock">
            //                 {/* {badge.value} */}
            //             </div>
            //         );
            //     } else {
            //         view = (
            //             <div className="ps-product__badge hot">
            //                 {/* {badge.value} */}
            //             </div>
            //         );
            //     }
            // }
            if (payload.PromotionPricePercent?.length) {
                return (
                    <div className="ps-product__badge">{payload.PromotionPricePercent[0].Percent}%</div>
                );
            }
            return view;
        },
        brand: (payload?: { brandId: string, brandName: string }) => {
            let view;
            view = (
                <Link href="/shop">
                    <p className="text-capitalize">
                        {payload?.brandName}
                    </p>
                </Link>
            );

            return view;
        },
        title: (payload?: Partial<ProductItem>) => {
            let view = (
                <Link
                    href={payload?.cId ? `/product/${payload?.pId}?cId=${payload?.cId}` : `/product/${payload?.pId}`}
                    >
                        <Text fontWeight={500}  textOverflow="ellipsis" lineHeight="5" mb={1} _hover={{color:"brand"}} whiteSpace="nowrap" overflow="hidden">
                        {payload?.title}
                        </Text>
                </Link>
            );
            return view;
        },
    };
}
