import React, { useEffect, useRef, useState } from 'react';
import ProductSearchResult from '~/components/elements/products/ProductSearchResult';
import useGetBrandInfoList from '~/apiCall/otapi/useGetBrandInfoList';
import { useRouter } from 'next/router';
import searchItemsFrame from '~/apiCall/otapi/searchItemsFrame';
import { Box, CircularProgress, CloseButton, Input, InputGroup, InputLeftAddon, InputLeftElement, Select } from '@chakra-ui/react';
import clsx from 'clsx';
import { GoSearch } from 'react-icons/go';
import { useScrollLock } from '~/hooks/useScrollLock';


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
    const debouncedSearchTerm = useDebounce(keyword!, 1000);

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
                <CloseButton color="gray.400" size='sm' onClick={handleClearKeyword} />
            );
        }
    } else {
        loadingView = (
            <span className="ps-form__action">
                <CircularProgress isIndeterminate size={5} color='brand.1' />
            </span>
        );
    }

    selectOptionView = brands?.map((brand) => (
        <option value={brand.Id} key={brand.Id}>
            {brand.Name.split("/")[0]}
        </option>
    ));

    const { lockScroll, unlockScroll } = useScrollLock();

    const onClose = () => {
        unlockScroll();
        setIsSearch(false)
    }

    const onOpen = () => {
        lockScroll()
        setIsSearch(true)
    }

    return (
        <div className='h-[40px]'>
            <div onClick={onClose} className={
                clsx(
                    "fixed z-10  w-full h-full left-0 top-0",
                    isSearch ? "block" : "hidden"
                )
            } />
            <div
                className={
                    clsx(
                        "ease-in-out relative z-[900]  duration-200 overflow-hidden  rounded-[5px] bg-white",
                        isSearch ? "shadow-2xl max-w-[900px] 2xl:max-w-[930px] p-[10px]" : "p-[0] max-w-[500px] xl:max-w-[600px] 2xl:max-w-[700px] shadow-none"
                    )
                }
            >

                <Box className={clsx('flex w-[880px] 2xl:w-[910px] items-center transition-all duration-400 rounded-[5px] overflow-hidden', isSearch ? "bg-gray-100" : "bg-white")}>
                    <div className='bg-gray-100 pl-[10px]'>
                        <Select variant="unstyled" h="40px" w="95px" onChange={(e) => setBrand(e.target.value)}>
                            <option>
                                Брэнд
                            </option>
                            {
                                selectOptionView
                            }</Select>
                    </div>
                    <div className='px-[10px] text-gray-400 cursor-pointer'>
                        <GoSearch size={20} />
                    </div>
                    <Input h="40px" variant="unstyled" ref={inputEl}
                        className="h-[40px]"
                        type="text"
                        value={keyword}
                        placeholder="хайх..."
                        onClick={onOpen}
                        onChange={(e) => setKeyword(e.target.value)} />
                    <div className="px-[10px]">
                        {clearTextView}
                        {loadingView}
                    </div>
                </Box>


                {/* <button onClick={handleSubmit}>Хайх</button> */}
                <div
                    // onMouseLeave={() => setIsSearch(false)}
                    className={
                        clsx(
                            'transition-all w-full ease-in overflow-hidden bg-white duration-100',
                            isSearch ? 'h-full min-h-[500px]' : 'h-0'
                        )}>
                    <div className="overflow-hidden">{productItemsView}</div>
                    {/* {loadMoreView} */}
                </div>
            </div>
        </div>
    );
};

export default SearchHeader;
