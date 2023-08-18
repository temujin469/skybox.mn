import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Spin } from 'antd';
import ProductSearchResult from '~/components/elements/products/ProductSearchResult';
import useGetBrandInfoList from '~/apiCall/otapi/useGetBrandInfoList';
import { useRouter } from 'next/router';


function useDebounce(value, delay) {
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

const SearchHeader = () => {
    const router = useRouter()
    const inputEl = useRef(null);
    const [isSearch, setIsSearch] = useState(false);
    const [keyword, setKeyword] = useState<string | undefined>(router.query.keyword as string);
    const [brand, setBrand] = useState<string | undefined>(router.query.brandId as string)
    const [resultItems, setResultItems] = useState(null);
    const [loading, setLoading] = useState(false);
    const debouncedSearchTerm = useDebounce(keyword, 300);

    const { data } = useGetBrandInfoList();

    const brands = data?.BrandInfoList?.Content;


    function handleClearKeyword() {
        setKeyword('');
        setIsSearch(false);
        setLoading(false);
    }

    function handleSubmit(e:any) {
        e.preventDefault();
        router.push(
            brand && keyword ? `/shop?brandId=${brand}&keyword=${keyword}` : brand && !keyword ? `/shop?brandId=${brand}` : `/shop?keyword=${keyword}`
            );
    }

    // useEffect(() => {
    //     if (debouncedSearchTerm) {
    //         setLoading(true);
    //         if (keyword) {
    //             const queries = {
    //                 _limit: 5,
    //                 title_contains: keyword,
    //             };
    //             const products = ProductRepository.getRecords(queries);
    //             products.then((result) => {
    //                 setLoading(false);
    //                 setResultItems(result);
    //                 setIsSearch(true);
    //             });
    //         } else {
    //             setIsSearch(false);
    //             setKeyword('');
    //         }
    //         if (loading) {
    //             setIsSearch(false);
    //         }
    //     } else {
    //         setLoading(false);
    //         setIsSearch(false);
    //     }
    // }, [debouncedSearchTerm]);

    // Views
    let productItemsView,
        clearTextView,
        selectOptionView,
        loadingView,
        loadMoreView;
    if (!loading) {
        if (resultItems && resultItems.length > 0) {
            if (resultItems.length > 5) {
                loadMoreView = (
                    <div className="ps-panel__footer text-center">
                        <Link href="/search">
                            <p>See all results</p>
                        </Link>
                    </div>
                );
            }
            productItemsView = resultItems.map((product) => (
                <ProductSearchResult product={product} key={product.id} />
            ));
        } else {
            productItemsView = <p>No product found.</p>;
        }
        if (keyword !== '') {
            clearTextView = (
                <span className="ps-form__action" onClick={handleClearKeyword}>
                    <i className="icon icon-cross2"></i>
                </span>
            );
        }
    } else {
        loadingView = (
            <span className="ps-form__action">
                <Spin size="small" />
            </span>
        );
    }

    selectOptionView = brands?.map((brand) => (
        <option value={brand.Id} key={brand.Id}>
            {brand.Name.split("/")[0]}
        </option>
    ));

    return (
        <form
            className="ps-form--quick-search"
            method="get"
            action="/"
            onSubmit={handleSubmit}>
            <div className="ps-form__categories">
                <select className="form-control" onChange={(e)=>setBrand(e.target.value)}>
                    <option>
                        Брэнд
                    </option>
                    {
                        selectOptionView
                    }</select>
            </div>
            <div className="ps-form__input">
                <input
                    ref={inputEl}
                    className="form-control"
                    type="text"
                    value={keyword}
                    placeholder="хайх..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                {clearTextView}
                {loadingView}
            </div>
            <button onClick={handleSubmit}>Хайх</button>
            <div
                className={`ps-panel--search-result${isSearch ? ' active ' : ''
                    }`}>
                <div className="ps-panel__content">{productItemsView}</div>
                {loadMoreView}
            </div>
        </form>
    );
};

export default SearchHeader;
