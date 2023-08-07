import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import Product from '~/components/elements/products/Product';
import ProductWide from '~/components/elements/products/ProductWide';
import ModuleShopSortBy from '~/components/partials/shop/modules/ModuleShopSortBy';
import { useRouter } from 'next/router';
import { generateTempArray } from '~/utilities/common-helpers';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import useGetProductsByFilter from '~/apiCall/otapi/useGetProductsByFilter';
import useFilter from '~/hooks/useFilter';
import { ProductGroupWithCarousel } from '../product/ProductGroupWithCarousel';
import { Box, Heading } from '@chakra-ui/react';
import useSearchItemsFrame from '~/apiCall/otapi/useSearchItemsFrame';

const ShopItems = ({ columns = 1, pageSize = 60 }) => {
    const router = useRouter();
    const { catId } = router.query;
    const { filters } = useFilter()
    const [listView, setListView] = useState(true);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [classes, setClasses] = useState(
        'col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6'
    );
    const [page, setPage] = useState<number>(0)
    const [start, setStart] = useState<number>(0);

    //   const { data, isLoading } = useSearchItemsFrame({ variables: { start, limit: pageSize, filters:{
    //     CategoryId:catId as string
    //   }} });

    //   console.log("filtered",data)

    const { data, isLoading } = useGetProductsByFilter({ variables: { start, limit: pageSize, filters, catId: catId ?  catId as string : "otc-20" } });

    const productItems = data?.OtapiItemInfoSubList?.Content;


    function handleChangeViewMode(e: any) {
        e.preventDefault();
        setListView(!listView);
    }

    function handleSetColumns() {
        switch (columns) {
            case 2:
                setClasses('col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6');
                return 3;
                break;
            case 4:
                setClasses('col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6');
                return 4;
                break;
            case 5:
                setClasses('col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6');
                return 5;
                break;
            case 6:
                setClasses('col-xl-2 col-lg-4 col-md-6 col-sm-6 col-6');
                return 6;
                break;

            default:
                setClasses('col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6');
        }
    }

    const handlePagination = (page: number) => {
        setPage(page)
        setStart(page * pageSize)
    }

    useEffect(() => {
        if (data?.OtapiItemInfoSubList?.TotalCount) {
            const totalProd = data?.OtapiItemInfoSubList.TotalCount;
            const totalPage = Math.ceil(totalProd / pageSize)
            setTotalPage(totalPage)
        }
        handleSetColumns();
    }, [columns, data, pageSize]);

    // Views
    let productItemsView;
    if (!isLoading) {
        if (productItems && productItems.length > 0) {
            if (listView) {
                const items = productItems.map((item) => (
                    <div className={classes} key={item.Id}>
                        <Product product={item} />
                    </div>
                ));
                productItemsView = (
                    <div className="ps-shop-items">
                        <div className="row">{items}</div>
                    </div>
                );
            } else {
                productItemsView = productItems.map((item) => (
                    <ProductWide product={item} />
                ));
            }
        } else {
            productItemsView = <p>Бүтээгдэхүүн олдсонгүй.</p>;
        }
    } else {
        const skeletonItems = generateTempArray(12).map((item) => (
            <div className={classes} key={item}>
                <SkeletonProduct />
            </div>
        ));
        productItemsView = <div className="row">{skeletonItems}</div>;
    }

    return (
        <div>
            <div className="ps-shopping">
                <div className="ps-shopping__header">
                    {/* <p>
                    <strong className="mr-2">{total}</strong>
                    Products found
                </p> */}
                    <Box style={{
                        display:"flex",
                        alignItems: "center",
                        flexGrow:1,
                        gap:"10px",
                        justifyContent:"space-between"
                    }} className="ps-shopping__actions">
                        <ModuleShopSortBy />
                        <Box display="flex" className="ps-shopping__view" alignItems="center">
                            <Heading size="sm" mr="10px">Харах</Heading>
                            <ul className="ps-tab-list">
                                <li className={listView === true ? 'active' : ''}>
                                    <a
                                        href="#"
                                        onClick={(e) => handleChangeViewMode(e)}>
                                        <i className="icon-grid"></i>
                                    </a>
                                </li>
                                <li className={listView !== true ? 'active' : ''}>
                                    <a
                                        href="#"
                                        onClick={(e) => handleChangeViewMode(e)}>
                                        <i className="icon-list4"></i>
                                    </a>
                                </li>
                            </ul>
                        </Box>
                    </Box>
                </div>
                <div className="ps-shopping__content">{productItemsView}</div>
                <div className="ps-shopping__footer text-center">
                    <div className="ps-pagination">
                        <Pagination
                            total={totalPage}
                            pageSize={pageSize}
                            responsive={true}
                            showSizeChanger={false}
                            // current={page !== undefined ? parseInt(page) : 1}
                            onChange={(e) => handlePagination(e)}
                        />
                    </div>
                </div>
            </div>
        </div>

    );
};


export default ShopItems;
