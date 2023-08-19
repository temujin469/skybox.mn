import React from 'react';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';
import Image from 'next/image';

const ProductSearchResult = ({ product }: { product: ProductInfo }) => {
    const { price, title } = useProduct();

    return (
        <Link href={`/product/${product.Id}`}>
            <div className='flex gap-2 h-[100px] p-2 hover:bg-gray-100 rounded-md'>
                <div className='relative aspect-square h-full'>
                    <Image src={product.MainPictureUrl} fill alt={product.Title} className='rounded-[5px]' />
                </div>
                <div className="overflow-hidden">
                    {title({ title: product.Title, pId: product.Id })}
                    {price(product)}
                </div>
            </div>

        </Link>
    );
};
export default ProductSearchResult;
