import React  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';
import type { RootState } from '~/store/store';
import { addToCart } from '~/store/slices/cartSlice';
import { Box, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import { formatCurrency } from '~/utilities/product-helper';
import { IoMdRemove } from "react-icons/io"
import { removeWishlistItem } from '~/store/slices/wishlistSlice';
import AccountLayout from '~/components/layouts/AccountLayout';


const Wishlist = () => {
    const { title } = useProduct()
    const { wishlist } = useSelector((state: RootState) => state)
    const dispatch = useDispatch()

    function handleAddItemToCart(e: any, product: ProductItem) {
        e.preventDefault();
        addToCart(dispatch, product)
    }

    function handleRemoveWishlistItem( productId: string) {
        removeWishlistItem(dispatch, productId)
    }

    // views
    let wishlistItemsView;
    if (wishlist.wishlistItems && wishlist.wishlistItems.length > 0) {
        wishlistItemsView = (
            <div className="ps-shop-items">
                <Grid
                    templateColumns={
                        ['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']
                    }
                    gap={3}
                >{
                        wishlist.wishlistItems.map((product) => (
                            <GridItem colSpan={1} overflow="hidden">
                                <div className="ps-product relative border">
                                    <div className="ps-product__thumbnail">
                                        <Link href="/product/[pid]" as={`/product/${product.pId}?cId=${product.cId}`}>
                                            {/* {thumbnailImage(product.Pictures[0])} */}
                                            <img src={product.image}
                                                style={{
                                                    aspectRatio: "1/1",
                                                    borderRadius: "5px"
                                                }}
                                            />
                                        </Link>

                                        {/* <ModuleProductActions product={product} /> */}
                                    </div>
                                    <div className="ps-product__container">

                                        <div className="ps-product__content">
                                            {title(product)}
                                            {/* <div className="ps-product__rating">
                                            <Rating />
                                            <span>{product.Volume}</span>
                                        </div> */}
                                            <Heading color="gray.600" size="sm">{formatCurrency(product.price)}₮</Heading>
                                        </div>

                                    </div>
                                    <div className='top-0 right-0 absolute bg-white w-6 h-6 rounded-[6px] flex items-center justify-center '
                                     onClick={()=>handleRemoveWishlistItem(product.cId)}
                                     >
                                        <IoMdRemove className="hover:text-red-500"/>
                                    </div>
                                </div>
                            </GridItem>
                        ))
                    }</Grid>
            </div>

        );
    } else {
        if (!wishlist.loading) {
            wishlistItemsView = (
                <div className="alert alert-danger" role="alert">
                    Хүслийн жагсаалт хоосон байна!
                </div>
            );
        }
    }
    return (
        // <div className="ps-section--shopping ps-whishlist">
        //     <div className="container">
        //         <div className="ps-section__header">
        //             <h3>Хүслийн жагсаалт</h3>
        //         </div>
        //         <div className="ps-section__content">{wishlistItemsView}</div>
        //     </div>
        // </div>
        <AccountLayout title="Хүслийн жагсаалт">
            {wishlistItemsView}
        </AccountLayout>
    );
};
export default Wishlist;
