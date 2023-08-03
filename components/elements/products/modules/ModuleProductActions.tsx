import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { connect, useDispatch, useSelector } from 'react-redux';
import ProductDetailQuickView from '~/components/elements/detail/ProductDetailQuickView';
import { addToCart } from '~/store/slices/cartSlice';
import { addToWishlist } from '~/store/slices/wishlistSlice';
import { addToCompare } from '~/store/slices/compareSlice';

type Props = {
    product:ProductInfo
}

const ModuleProductActions = ({ product }:Props) => {
    const [isQuickView, setIsQuickView] = useState(false);
    const [productItem,setProductItem] = useState<ProductItem>(
    //     {
    //     id: product.Id,
    //     thumbnail: product.MainPictureUrl,
    //     quantity: 1,
    //     title: product.Title,
    //     price: product.PromotionPrice?.ConvertedPriceList ? product.PromotionPrice.ConvertedPriceList.Internal.Price : product.Price.ConvertedPriceList.Internal.Price
    // }
    )
    const dispatch = useDispatch()



    useEffect(()=>{
        const price: number = product.PromotionPrice?.ConvertedPriceList ? product.PromotionPrice.ConvertedPriceList.Internal.Price : product.Price.ConvertedPriceList.Internal.Price
        // setProductItem(
        //     {
        //         id: product.Id,
        //         thumbnail: product.MainPictureUrl,
        //         quantity: 1,
        //         title: product.Title,
        //         price,
        //     }
        // )
    },[product])

    function handleAddItemToCart(e: any) {
        e.preventDefault();
        // addToCart(dispatch, productItem)
        // const modal = Modal.success({
        //     centered: true,
        //     title: 'Амжилттай!',
        //     content: `Энэ зүйл таны сагсанд нэмэгдсэн байна!`,
        // });
        // modal.update;
    }


    function handleAddItemToWishlist(e: React.MouseEvent<any, MouseEvent>) {
        e.preventDefault();
        // addToWishlist(dispatch, productItem)
        // const modal = Modal.success({
        //     centered: true,
        //     title: 'Амжилттай!',
        //     content: `Энэ бүтээгдэхүүн таны хүслийн жагсаалтад нэмэгдсэн байна!`,
        //     okButtonProps: {
        //         children: "За"
        //     }
        // });
        // modal.update;
    }

    function handleAddItemToCompare(e: React.MouseEvent<any, MouseEvent>) {
        e.preventDefault();
        // addToCompare(dispatch, {
        //     id: product.Id,
        //     thumbnail: product.MainPictureUrl,
        //     quantity: 1,
        //     title: product.Title,
        //     price:product.Price.ConvertedPriceList.Internal.Price,
        //     salePrice:product.PromotionPrice?.ConvertedPriceList.Internal.Price
        // })
        // const modal = Modal.success({
        //     centered: true,
        //     title: 'Амжилттай!',
        //     content: `Энэ бүтээгдэхүүн таны харьцуулах жагсаалтад нэмэгдсэн байна!`,
        //     okButtonProps:{
        //         children:"За"
        //     }
        // });
        // modal.update;
    }

    const handleShowQuickView = (e: React.MouseEvent<any, MouseEvent>) => {
        e.preventDefault();
        setIsQuickView(true);
    };

    const handleHideQuickView = (e: React.MouseEvent<any, MouseEvent>) => {
        e.preventDefault();
        setIsQuickView(false);
    };
    return (
        <ul className="ps-product__actions">
            <li>
                <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Add To Cart"
                    onClick={handleAddItemToCart}>
                    <i className="icon-bag2"></i>
                </a>
            </li>
            <li>
                <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Quick View"
                    onClick={handleShowQuickView}>
                    <i className="icon-eye"></i>
                </a>
            </li>
            <li>
                <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Add to wishlist"
                    onClick={handleAddItemToWishlist}>
                    <i className="icon-heart"></i>
                </a>
            </li>
            <li>
                <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Compare"
                    onClick={handleAddItemToCompare}>
                    <i className="icon-chart-bars"></i>
                </a>
            </li>
            <Modal
                centered
                footer={null}
                width={1024}
                onCancel={(e) => handleHideQuickView(e)}
                open={isQuickView}
                closeIcon={<i className="icon icon-cross2"></i>}>
                <ProductDetailQuickView product={product} />
            </Modal>
        </ul>
    );
};

export default connect((state) => state)(ModuleProductActions);
