import React from 'react';
import Link from 'next/link';
import ModuleProductActions from '~/components/elements/products/modules/ModuleProductActions';
import useProduct from '~/hooks/useProduct';
import Rating from '~/components/elements/Rating';

type Props = {
    product: ProductInfo
}

const Product = ({ product }: Props) => {
    const { title, price,badge } = useProduct();
    return (
        <div className="ps-product">
            <div className="ps-product__thumbnail">
                <Link href="/product/[pid]" as={`/product/${product.Id}`}>
                    {/* {thumbnailImage(product.Pictures[0])} */}
                    <img src={product.MainPictureUrl}
                    style={{
                        aspectRatio:"1/1",
                        borderRadius:"5px"
                    }}
                    />
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
                    {title({ pId: product.Id, title: product.Title})}
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

export default Product;
