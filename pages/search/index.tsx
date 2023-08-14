import React, { useEffect, useState } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import Product from '~/components/elements/products/Product';
// import ProductGroupGridItems from '~/components/partials/product/ProductGroupGridItems';
import PageContainer from '~/components/layouts/PageContainer';
import { useRouter } from 'next/router';
import { Heading } from '@chakra-ui/react';
import Image from 'next/image';
import NotFoundState from '~/components/elements/NotFound';

const SearchPage = () => {
    const [pageSize] = useState(100);
    const router = useRouter();

    const key = router.query?.keyword;
    const [keyword, setKeyword] = useState(key);
    // const { productItems, loading, getProducts } = useGetProducts();

    // function handleSetKeyword() {
    //     if (query && query.keyword !== '') {
    //         setKeyword(query.keyword);
    //     } else {
    //         setKeyword('');
    //     }
    // }

    // useEffect(() => {
    //     if (query && query.keyword) {
    //         handleSetKeyword(query.keyword);
    //         const queries = {
    //             _limit: pageSize,
    //             title_contains: query.keyword,
    //         };
    //         getProducts(queries);
    //     }
    // }, [query]);

    const breadcrumb = [
        {
            text: 'Хайлтын үр дүн',
        },
    ];

    let shopItemsView, statusView;
    // if (!loading) {
    //     if (productItems) {
    //         shopItemsView = (
    //             <ProductGroupGridItems columns={6} pageSize={pageSize} />
    //         );
    //         if (productItems.length > 0) {
    //             const items = productItems.map((item) => {
    //                 return (
    //                     <div className="col-md-3 col-sm-6 col-6" key={item.id}>
    //                         <Product product={item} />
    //                     </div>
    //                 );
    //             });
    //             shopItemsView = (
    //                 <div className="ps-product-items row">{items}</div>
    //             );
    //             statusView = (
    //                 <p>
    //                     <strong style={{ color: '#000' }}>
    //                         {productItems.length}
    //                     </strong>{' '}
    //                     record(s) found.
    //                 </p>
    //             );
    //         } else {
    //             shopItemsView = <p>No product(s) found.</p>;
    //         }
    //     } else {
    //         shopItemsView = <p>No product(s) found.</p>;
    //     }
    // } else {
    //     statusView = <p>Searching...</p>;
    // }

    return (
        <PageContainer title={`Search results for: "${keyword}" `}>
            <div className="ps-page">
                <BreadCrumb breadcrumb={breadcrumb} />
            </div>
            <div className='ps-container'>
                <div className="ps-shop ps-shop--search">
                    <div>
                        <div className="flex gap-2 py-10">
                            <Heading>
                                Хайлтын үр дүн: 
                            </Heading>
                            <Heading>"{keyword}"</Heading>
                        </div>
                        <div className="ps-shop__content">
                            {/* <Alert status='info'>
                                <AlertIcon />
                                Chakra is going live on August 30th. Get ready!
                            </Alert> */}
                            <NotFoundState/>
                            {statusView}
                            {shopItemsView}
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default SearchPage;
