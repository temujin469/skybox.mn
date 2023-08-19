import React, { useEffect, useRef, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { Box, CircularProgress, Skeleton } from '@chakra-ui/react';
import searchItemsFrame from '~/apiCall/otapi/searchItemsFrame';
import ProductSearchResult from '~/components/elements/products/ProductSearchResult';
import Link from 'next/link';



function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}


const PanelSearch = ({ handleClose }: { handleClose: () => void }) => {
    const router = useRouter()
    const [keyword, setKeyword] = useState<string | undefined>(router.query.keyword as string);
    const [brand, setBrand] = useState<string | undefined>(router.query.brandId as string)
    const [loading, setLoading] = useState(false);
    const [resultItems, setResultItems] = useState<ProductInfo[] | undefined>()
    const debouncedSearchTerm = useDebounce(keyword!, 700);

    // const brandData = useGetBrandInfoList();

    // const brands = brandData?.data?.BrandInfoList?.Content;

    function handleClearKeyword() {
        setKeyword('');
        setLoading(false);
    }

    // const searchUrl = brand && keyword ? `/shop?brandId=${brand}&keyword=${keyword}` : brand && !keyword ? `/shop?brandId=${brand}` : `/shop?keyword=${keyword}`;
    const searchUrl = `/shop?keyword=${keyword}`

    function handleSubmit(e: any) {
        e.preventDefault();
        router.push(searchUrl);
        handleClose()
    }

    const fetchProducts = async () => {
        const data = await searchItemsFrame({
            start: 0, limit: 30, filters: {
                ItemTitle: debouncedSearchTerm,
                BrandId: brand
            }
        })
        const items = data?.Result?.Items?.Content;
        setResultItems(items);
        setLoading(false);

    }

    useEffect(() => {
        if (debouncedSearchTerm) {
            setLoading(true);
            if (keyword) {
                fetchProducts()
            } else {
                setKeyword('');
            }

        } else {
            setLoading(false);
        }
    }, [debouncedSearchTerm]);


    // Views
    let productItemsView,
        clearTextView,
        selectOptionView,
        loadMoreView,
        loadingView;
    if (!loading) {
        if (resultItems && resultItems?.length > 0) {
            if (resultItems.length >= 5) {
                loadMoreView = (
                    <div className="ps-panel__footer text-center">
                        <div onClick={handleSubmit}>
                            <p>Цааш үзэх</p>
                        </div>
                    </div>
                );
            }
            productItemsView =
                resultItems.map((product) => (
                    <div onClick={handleClose}>
                        <ProductSearchResult product={product} key={product.Id} />
                    </div>
                ));
        }
        // else {
        //     productItemsView = <p>
        //         Бүтээгдэхүүн олдсонгүй.</p>;
        // }
        if (keyword !== '') {
            clearTextView = (
                <span className="ps-form__action" onClick={handleClearKeyword}>
                    <i className="icon icon-cross2"></i>
                </span>
            );
        }
    } else {
        loadingView = (
            <div className="flex flex-col gap-2">
                <Skeleton h="100px" />
                <Skeleton h="100px" />
                <Skeleton h="100px" />
                <Skeleton h="100px" />
            </div>
        );
    }

    return (
        <Box p={3} className="ps-panel__search-results">
            <form
                className="ps-form--search-mobile mb-[13px]"
                action="/"
                method="get"
                onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group--nest">
                    <input
                        className="form-control"
                        type="text"
                        value={keyword}
                        placeholder="Хайх..."
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button>
                        <i className="icon-magnifier"></i>
                    </button>
                </div>
            </form>
            <div>
                <div className="overflow-hidden">{productItemsView}</div>
                {loadingView}
                {loadMoreView}
            </div>
        </Box>
    );
};

export default PanelSearch;
