import React from 'react';

const ModuleProductDetailDescription = ({ product }: { product: ProductInfo }) => {
    const last30sales = product.FeaturedValues?.find((feature) => feature.Name ==="SalesInLast30Days")
    return (
        <div className="ps-product__desc" style={{ paddingBottom: "20px" }}>
            <div>
                Барааны код:
                <a>
                    <strong> {product.Id}</strong>
                </a>
            </div>
            <div>
                Барааны үлдэгдэл:
                <a>
                    <strong> {product.MasterQuantity}</strong>
                </a>
            </div>
            <div>
                Сүүлийн 30 өдөрт:
                <a>
                    <strong> {last30sales?.Value}  борлуулалт</strong>
                </a>
            </div>
            {/* <ul className="ps-list--dot">
            <li>{product.Location.City} {product.Location.State}</li>
            <li>Сүүлийн 30 өдөрт {product.MasterQuantity}</li>
        </ul> */}
        </div>
    );
}

export default ModuleProductDetailDescription;
