import React from 'react';
import Link from 'next/link';

type Props = {
    link:string
    image?:MediaData["attributes"]
}

const Promotion = ({ link, image }:Props) => {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    if (image) {
        return (
            <Link href={link} className='ps-collection'>
                    <img  style={{
                        borderRadius:"5px"
                    }} src={`${baseUrl}${image?.url}`} alt={image.name} />
            </Link>
        );
    } else {
        return (
            <Link href={link ? link : '/shop'} className='"ps-collection"'>
                    <img style={{
                        borderRadius:"5px"
                    }}  src="/static/img/not-found.jpg" alt="martfury" />
            </Link>
        );
    }
};

export default Promotion;
