import React, { useState } from 'react';
import Link from 'next/link';
import ModuleProductActions from '~/components/elements/products/modules/ModuleProductActions';
import useProduct from '~/hooks/useProduct';
import Rating from '~/components/elements/Rating';
import Image from 'next/image';
import { AspectRatio } from '@chakra-ui/react';
import { getPlaiceholder } from "plaiceholder";
import { GetServerSideProps } from 'next';
import cn from 'clsx';
import BlurImage from '../BlurImage';

type Props = {
    product: ProductInfo,
}

const Product = ({ product }: Props) => {
    const { title, price, badge } = useProduct();
    // const { base64 } = await getPlaiceholder(file);

    return (
        <div className="ps-product">
            <div className="ps-product__thumbnail">
                <Link href="/product/[pid]" as={`/product/${product.Id}`}>
                    <AspectRatio ratio={1}>
                        <BlurImage fill src={product.MainPictureUrl}/>
                    </AspectRatio>
                </Link>
                {badge(product)}
                {/* {product.StuffStatus == "New" && (
                    <div className="ps-product__badge out-stock">
                        Дууссан
                    </div>
                )} */}
                {/* <ModuleProductActions product={product} /> */}
            </div>
            <div className="ps-product__container">
                {/* <Link href="/shop">
                    <p className="ps-product__vendor">{product.BrandName}</p>
                </Link> */}
                <div className="ps-product__content">
                    {title({ pId: product.Id, title: product.Title })}
                    {/* <div className="ps-product__rating">
                        <Rating />
                        <span>{product.Volume}</span>
                    </div> */}
                    {price(product)}
                </div>
                {/* <div className="ps-product__content hover">
                    {title({ pId: product.Id, title: product.Title })}
                    {price(product)}
                </div> */}
            </div>
        </div>
    );
};

// export const getServerSideProps:GetServerSideProps = async (ctx) =>{
//     // Fetch data from external API

//     // const data = await res.json()
//     console.log("req",ctx.params)
//     const data = "fdf";

//     // Pass data to the page via props
//     return { props: {data} }
// }

export default Product;
