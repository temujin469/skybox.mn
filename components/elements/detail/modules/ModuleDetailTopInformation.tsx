import React from 'react';
import Link from 'next/link';
import Rating from '~/components/elements/Rating';
import { formatCurrency } from '~/utilities/product-helper';

const ModuleDetailTopInformation = ({ product }:{product:ProductInfo}) => {
    // Views
    let priceView;


    if (product.PromotionPrice) {
        priceView = (
            <h4 className="ps-product__price sale">
                <del className="mr-2">{formatCurrency(product.Price.ConvertedPriceList.Internal.Price)}₮</del>
                {formatCurrency(product.PromotionPrice.ConvertedPriceList.Internal.Price)}₮
            </h4>
        );
    } else {
        priceView = <h4 className="ps-product__price">${formatCurrency(product.Price.ConvertedPriceList.Internal.Price)}</h4>;
    }


    return (
        <header>
            <h1>{product.Title}</h1>
            <div className="ps-product__meta">
                <p>
                    Брэнд:
                    <Link href="/shop">
                        <p className="ml-2 text-capitalize">{product.BrandName}</p>
                    </Link>
                </p>
                {/* <div className="ps-product__rating">
                    <Rating />
                    <span>(1 шүүмж)</span>
                </div> */}
            </div>
            {priceView}
        </header>
    );
};

export default ModuleDetailTopInformation;
