import React, { useEffect, useRef, useState } from 'react';
import ProductSearchResult from '~/components/elements/products/ProductSearchResult';
import useGetBrandInfoList from '~/apiCall/otapi/useGetBrandInfoList';
import { useRouter } from 'next/router';
import searchItemsFrame from '~/apiCall/otapi/searchItemsFrame';
import { CircularProgress } from '@chakra-ui/react';


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

const SearchHeader = () => {
    const router = useRouter()
    const inputEl = useRef(null);
    const [isSearch, setIsSearch] = useState(false);
    const [keyword, setKeyword] = useState<string | undefined>(router.query.keyword as string);
    const [brand, setBrand] = useState<string | undefined>(router.query.brandId as string)
    const [loading, setLoading] = useState(false);
    const [resultItems, setResultItems] = useState<ProductInfo[] | undefined>()
    const debouncedSearchTerm = useDebounce(keyword!,1000);

    const brandData = useGetBrandInfoList();

    const brands = brandData?.data?.BrandInfoList?.Content;

    function handleClearKeyword() {
        setKeyword('');
        setIsSearch(false);
        setLoading(false);
    }

    const searchUrl = brand && keyword ? `/shop?brandId=${brand}&keyword=${keyword}` : brand && !keyword ? `/shop?brandId=${brand}` : `/shop?keyword=${keyword}`

    function handleSubmit(e: any) {
        e.preventDefault();
        router.push(searchUrl)
        setIsSearch(false)
    }

    const fetchProducts = async () => {
        const data = await searchItemsFrame({
            start: 0, limit: 5, filters: {
                ItemTitle: debouncedSearchTerm,
                BrandId: brand
            }
        })
        const items = data?.Result?.Items?.Content;
        setResultItems(items);
        setLoading(false);
        setIsSearch(true);

    }

    useEffect(() => {
        if (debouncedSearchTerm) {
            setLoading(true);
            if (keyword) {
                fetchProducts()
            } else {
                setIsSearch(false);
                setKeyword('');
            }
            if (loading) {
                setIsSearch(false);
            }
        } else {
            setLoading(false);
            setIsSearch(false);
        }
    }, [debouncedSearchTerm]);

    // Views
    let productItemsView,
        clearTextView,
        selectOptionView,
        loadingView;
    if (!loading) {
        if (resultItems && resultItems?.length > 0) {
            // if (resultItems.length >= 5) {
            //     loadMoreView = (
            //         <div className="ps-panel__footer text-center">
            //             <Link href={searchUrl}>
            //                 <p>Цааш үзэх</p>
            //             </Link>
            //         </div>
            //     );
            // }
            productItemsView = <div className='p-2'>
                {
                    resultItems.map((product) => (
                        <ProductSearchResult product={product} key={product.Id} />
                    ))
                }
            </div>
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
            <span className="ps-form__action">
                <CircularProgress isIndeterminate size={5} color='brand.1'/>
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
                <select className="form-control" onChange={(e) => setBrand(e.target.value)}>
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
                    onClick={()=>setIsSearch(true)}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                {clearTextView}
                {loadingView}
            </div>
            <button onClick={handleSubmit}>Хайх</button>
            <div
            onMouseLeave={()=>setIsSearch(false)}
                className={`ps-panel--search-result${isSearch ? ' active ' : ''
                    }`}>
                <div className="overflow-hidden">{productItemsView}</div>
                {/* {loadMoreView} */}
            </div>
        </form>
    );
};

export default SearchHeader;
