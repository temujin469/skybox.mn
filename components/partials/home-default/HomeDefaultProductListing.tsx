import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import { generateTempArray } from '~/utilities/common-helpers';
import { ProductGroupWithCarousel } from '~/components/partials/product/ProductGroupWithCarousel';
import useGetProductsByFilter from '~/apiCall/otapi/useGetProductsByFilter';
import { Box, Heading } from '@chakra-ui/react';

type Props = {
    collection: string,
    title: string
}

const HomeDefaultProductListing = ({ collection, title }: Props) => {
    const [currentCollection, setCurrentCollection] = useState('new-arrivals');

    const [page, setPage] = useState<number>(0)
    const [start, setStart] = useState<number>(0)

    const { data, isLoading } = useGetProductsByFilter({ variables: { start, limit: 10, filters: undefined, catId: "otc-20" } });

    const productItems = data?.OtapiItemInfoSubList?.Content;

    const sectionLinks = [
        {
            title: 'Oнцлох',
            name: 'new-arrivals',
            slug: collection,
        },
        {
            title: 'Шилдэг',
            name: 'best-seller',
            slug: 'fullwidth-clothing-best-sellers',
        },
        {
            title: 'Эрэлттэй',
            name: 'most-popular',
            slug: 'fullwidth-clothing-most-popular',
        },
    ];

    function handleChangeTab(e: any, tab: any) {
        e.preventDefault();
        setCurrentCollection(tab.name);
        // getProductsByCollection(tab.slug);
    }

    // useEffect(() => {
    //     getProductsByCollection(collectionSlug);
    // }, [collectionSlug]);

    const sectionLinksView = sectionLinks.map((link) => (
        <li
            className={currentCollection === link.name ? 'active' : ''}
            key={link.name}>
            <Link href="#" onClick={(e) => handleChangeTab(e, link)}>
                <Heading fontSize={{ base: "14px", md: "16px" }} fontWeight={[500, 500, 600]}>
                    {link.title}
                </Heading>
            </Link>
        </li>
    ));

    // views
    let productItemsView;
    if (!isLoading) {
        if (productItems && productItems.length > 0) {
            productItemsView = (
                <ProductGroupWithCarousel
                    products={productItems}
                    type="fullwidth"
                />
            );
        } else {
            productItemsView = <p>No product(s) found.</p>;
        }
    } else {
        const skeletons = generateTempArray(6).map((item) => (
            <div className="col-xl-2 col-lg-3 col-sm-3 col-6" key={item}>
                <SkeletonProduct />
            </div>
        ));
        productItemsView = <div className="row">{skeletons}</div>;
    }

    return (
        <div className="ps-product-list">
            <Box className="ps-container" >
                <Box
                    borderRadius={5}
                    p={3}
                    sx={{
                        backgroundImage: "url('/static/img/bg/abstract.png')",
                        bgPosition: "right bottom",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "70%"
                    }}
                    backgroundColor={"brand.1"}
                >
                    <Box className="ps-section__header"
                        backgroundColor="white"
                    >
                        <Heading textTransform="uppercase" mb={{base:3,sm:0}}>{title}</Heading>
                        <ul className="ps-section__links">
                            {sectionLinksView}
                            <li>
                                <Link href={`/shop`}>
                                    <Heading fontSize={{base:"14px",md:"16px"}} fontWeight={[500,500,600]}>
                                        Бүгд
                                    </Heading>
                                </Link>
                            </li>
                        </ul>
                    </Box>
                    <Box className="ps-section__content"
                        px={[0, 10]} pb={[5, 10]}
                    >{productItemsView}</Box>
                </Box>

            </Box>
        </div>
    );
};

export default HomeDefaultProductListing;
