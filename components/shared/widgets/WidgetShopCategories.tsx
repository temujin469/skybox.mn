import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Heading } from '@chakra-ui/react';

const WidgetShopCategories = ({category}:{category:any}) => {
    const Router = useRouter();

    // async function getCategories() {
    //     setLoading(true);
    //     const responseData = await ProductRepository.getProductCategories();
    //     if (responseData) {
    //         setCategories(responseData);
    //         setTimeout(
    //             function () {
    //                 setLoading(false);
    //             }.bind(this),
    //             250
    //         );
    //     }
    // }

    // useEffect(() => {
    //     getCategories();
    // }, []);

    // Views
    let categoriesView;
    // if (!loading) {
    //     if (categories && categories.length > 0) {
    //         const items = categories.map((item) => (
    //             <li
    //                 key={item.slug}
    //                 className={item.slug === slug ? 'active' : ''}>
    //                 <Link href={`/category/${item.slug}`}>{item.name}</Link>
    //             </li>
    //         ));
    //         categoriesView = <ul className="ps-list--categories">{items}</ul>;
    //     } else {
    //     }
    // } else {
    //     categoriesView = <p>Loading...</p>;
    // }
console.log(category)
    return (
        <aside className="widget widget_shop">
            <Heading size="md">Ангилал</Heading>
            {/* {categoriesView} */}
            <p>{category?.Name}</p>
        </aside>
    );
};

export default WidgetShopCategories;
