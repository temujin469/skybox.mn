import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import Product from '~/components/elements/products/Product';
import ProductWide from '~/components/elements/products/ProductWide';
import ModuleShopSortBy from '~/components/partials/shop/modules/ModuleShopSortBy';
import { useRouter } from 'next/router';
import { generateTempArray } from '~/utilities/common-helpers';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import useFilter from '~/hooks/useFilter';
import { Box  } from '@chakra-ui/react';
import NotFoundState from '~/components/elements/NotFound';
import useBatchSearchItemsFrame from '~/apiCall/otapi/useBatchSearchItemsFrame';
import useAppState from '~/hooks/useAppState';
import { LuLayoutList } from 'react-icons/lu';
import { FiGrid } from 'react-icons/fi';
import useShopState from '~/hooks/shop/useShopState';
import HomeDefaultBrands from '../home-default/HomeDefaultBrands';

const ShopItems = ({ columns = 1, pageSize = 60 }) => {
    const router = useRouter();
    const { catId, brandId, min, max, keyword, filtered, vendorId } = router.query;
    const { filters } = useFilter()
    const [listView, setListView] = useState(true);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [classes, setClasses] = useState(
        'col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6'
    );
    const [page, setPage] = useState<number>(1)
    const [start, setStart] = useState<number>(0);

    //   const {data,isLoading}= useSearchItemsFrame({ variables: { start, limit: pageSize, filters:{
    //       ...filters,
    //     CategoryId:catId as string,
    //     BrandId:brandId as string,
    //       MinPrice: Number(min),
    //       MaxPrice: Number(max),
    //       ItemTitle:(keyword || brandId) ? keyword as string : "a",
    //   }} });

    const { data, isLoading } = useBatchSearchItemsFrame({
        variables: {
            start, limit: pageSize, filters: {
                ...filters,
                CategoryId: catId as string,
                BrandId: brandId as string,
                MinPrice: Number(min),
                MaxPrice: Number(max),
                VendorId: vendorId as string,
                ItemTitle: (keyword || brandId || vendorId) ? keyword as string : "a",
                Configurators: filtered == "true" ? filters?.Configurators : undefined
            }
        }
    });

    const productItems = data?.Result?.Items?.Items?.Content;
    const searchPropertyContents = data?.Result?.SearchProperties?.Content;
    const resultCount = data?.Result?.Items?.Items.TotalCount;



    const { setSearchPropertyContents } = useAppState()
    const { setResultCount } = useShopState()


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
        setStart(page * pageSize);
        window.scroll({ top: 0, behavior: "smooth" })
    }

    useEffect(() => {
        // if (data?.Result?.MaximumPageCount) {
        //     // const totalProd = data?.OtapiItemInfoSubList.TotalCount;
        //     // const totalPage = Math.ceil(totalProd / pageSize)
        //     const totalPage = data?.Result?.MaximumPageCount;
        //     setTotalPage(totalPage)
        // }
        if (data?.Result?.Items?.MaximumPageCount) {
            // const totalProd = data?.OtapiItemInfoSubList.TotalCount;
            const totalPage = data?.Result.Items.MaximumPageCount
            setTotalPage(totalPage)
        }

        if (searchPropertyContents) {
            setSearchPropertyContents(searchPropertyContents)
        }
        setResultCount(resultCount)
        handleSetColumns();
    }, [columns, data, pageSize]);
    useEffect(() => {
        setPage(1)
    }, [router.query]);

    // Views
    let productItemsView;
    if (!isLoading) {
        if (productItems && productItems.length > 0) {
            if (listView) {
                const items = productItems.map((item) => (
                    <div className={classes} key={item.Id}>
                        <Product product={item} className='border-0 bg-white' />
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
            productItemsView = <NotFoundState />;
        }
    } else {
        const skeletonItems = generateTempArray(12).map((item) => (
            <div className={classes} key={item}>
                <SkeletonProduct />
            </div>
        ));
        productItemsView = <div className="ps-shop-items">
            <div className='row'>
                    {skeletonItems}
            </div>
        </div>
    }

    return (
        <div>
            <div className="ps-shopping">
                {/* <ShopMobileHeader /> */}
                <div className="bg-white rounded-md sm:mx-[5px] p-[10px] sm:p-[20px] mb-[15px] hidden md:block">
                    {/* <p>
                    <strong className="mr-2">{total}</strong>
                    Products found
                </p> */}
                    <Box style={{
                        display: "flex",
                        alignItems: "center",
                        flexGrow: 1,
                        gap: "10px",
                        justifyContent: "space-between"
                    }} className="ps-shopping__actions" >
                        <ModuleShopSortBy />
                        <Box display={"flex"} className="ps-shopping__view" alignItems="center">
                            {/* <Heading display={{base:"none",md:"block"}} size="sm" mr="10px">Харах</Heading> */}
                            <ul className="ps-tab-list h-fit">
                                <li className={listView === true ? 'active' : ''}>
                                    <a
                                        href="#"
                                        onClick={(e) => handleChangeViewMode(e)}>
                                        <FiGrid />
                                    </a>
                                </li>
                                <li className={listView !== true ? 'active' : ''}>
                                    <a
                                        href="#"
                                        onClick={(e) => handleChangeViewMode(e)}>
                                        <LuLayoutList />
                                    </a>
                                </li>
                            </ul>
                        </Box>
                    </Box>
                    <HomeDefaultBrands />
                </div>
                <div className="ps-shopping__content">{productItemsView}</div>
                <div className=" text-center">
                    <div className="py-[20px] md:py-[60px]">
                        <Pagination
                            total={totalPage}
                            pageSize={pageSize}
                            responsive={true}
                            showSizeChanger={false}
                            current={page}
                            onChange={(value) => handlePagination(value)}
                        />
                    </div>
                </div>
            </div>
        </div>

    );
};


export default ShopItems;
