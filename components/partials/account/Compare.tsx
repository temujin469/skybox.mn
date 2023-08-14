import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
// import { Rate } from 'antd';
import { RootState } from '~/store/store';
import { addToCompare, removeCompareItem } from '~/store/slices/compareSlice';
import { formatCurrency } from '~/utilities/product-helper';
import { Box, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi';

const Compare = () => {

    const { compareItems } = useSelector((state: RootState) => state.compare)
    const dispatch = useDispatch()

    // function handleAddItemToCart(e: any, product: ProductItem) {
    //     e.preventDefault();
    //     addToCompare(dispatch, product)
    // }
    function handleRemoveCompareItem(e: any, cId: string) {
        e.preventDefault();
        removeCompareItem(dispatch, cId)
    }

    return (
        <div className="ps-compare ps-section--shopping">
            <div className="container">
                <div className="ps-section__header">
                    <h3>Бүтээгдэхүүн харьцуулах</h3>
                </div>
                <div className="ps-section__content">
                    {compareItems && compareItems.length === 0 ? (
                        <div className="alert alert-danger" role="alert">
                            Харьцуулах жагсаалт хоосон байна!
                        </div>
                    ) : (
                            // <div className="table-responsive">

                        <div>
                                <TableContainer className='w-fit mx-auto'>
                                    <Table variant='simple'>
                                        <Tbody className='w-fit'>
                                            <Tr bg="yellow.100">
                                                <Th >Бүтээгдэхүүн</Th>
                                                {compareItems && compareItems.length > 0 ? (
                                                    compareItems.map((product) => (
                                                        <Td key={product.cId} className='w-[200px] md:w-[300px]'>
                                                            <a
                                                                href="#"
                                                                className='flex items-center gap-1 hover:text-red-500'
                                                                onClick={(e) =>
                                                                    handleRemoveCompareItem(
                                                                        e,
                                                                        product.cId
                                                                    )
                                                                }>
                                                                <FiTrash2 size={17} />
                                                                Хасах
                                                            </a>
                                                        </Td>
                                                    ))
                                                ) : (
                                                    <Td></Td>
                                                )}
                                            </Tr>
                                            <Tr>
                                                <Td className='w-[200px]'></Td>
                                                {compareItems && compareItems.length > 0 ? (
                                                    compareItems.map((product) => (
                                                        <Td w={"200px"} className='w-[200px] md:w-[300px]' key={product.cId}>
                                                            <Box className='w-[200px] md:w-[300px]'>
                                                                <div className="mb-2">
                                                                    <Link
                                                                        href={`/product/${product.pId}?cId=${product.cId}`}>
                                                                            <div className='aspect-square rounded-md overflow-hidden'>
                                                                            <img src={product.image} className='w-full h-full' />
                                                                            </div>
                                                                    </Link>
                                                                </div>
                                                                <div className="ps-product__content">
                                                                    <Link
                                                                        href={`/product/${product.pId}?cId=${product.cId}`}>
                                                                        <p className="overflow-hidden text-ellipsis">
                                                                            {
                                                                                product.title
                                                                            }
                                                                        </p>
                                                                    </Link>
                                                                </div>
                                                            </Box>
                                                        </Td>
                                                    ))
                                                ) : (
                                                    <Td></Td>
                                                )}
                                                {/* <Td isNumeric>25.4</Td> */}
                                            </Tr>
                                        </Tbody>
                                        <Tfoot>
                                            <Tr bg="yellow.100">
                                                <Th>Үнэ</Th>
                                                {compareItems && compareItems.length > 0 ? (
                                                    compareItems.map((product) => {
                                                        if (product.salePrice) {
                                                            return (
                                                                <Th key={product.cId} className='w-[200px]'>
                                                                    <h4 className="price sale">
                                                                        {formatCurrency(product.salePrice)}₮
                                                                        {" "}
                                                                        <del>
                                                                            {formatCurrency(product.price)}₮
                                                                        </del>
                                                                    </h4>
                                                                </Th>
                                                            );
                                                        } else
                                                            return (
                                                                <Th key={product.cId} className='w-[200px]'>
                                                                    <h4 className="price">
                                                                        {formatCurrency(product.price)}₮
                                                                    </h4>
                                                                </Th>
                                                            );
                                                    })
                                                ) : (
                                                    <Th></Th>
                                                )}
                                            </Tr>
                                        </Tfoot>
                                    </Table>
                                </TableContainer>
                            {/* <table className="table ps-table--compare"
                            >
                                <tbody  >
                                    <tr>
                                        <td className="heading whitespace-nowrap w-[200px]" rowSpan={2}>
                                            Бүтээгдэхүүн
                                        </td>
                                        {compareItems && compareItems.length > 0 ? (
                                            compareItems.map((product) => (
                                                <td key={product.cId}>
                                                    <a
                                                        href="#"
                                                        onClick={(e) =>
                                                            handleRemoveCompareItem(
                                                                e,
                                                                product.cId
                                                            )
                                                        }>
                                                        Хасах
                                                    </a>
                                                </td>
                                            ))
                                        ) : (
                                            <td></td>
                                        )}
                                    </tr>
                                    <tr>
                                        {compareItems && compareItems.length > 0 ? (
                                            compareItems.map((product) => (
                                                <td key={product.cId}>
                                                    <div className="ps-product--compare" style={{
                                                        height:"300px"
                                                    }}>
                                                        <div className="ps-product__thumbnail md:h-full">
                                                            <Link
                                                                href={`/product/${product.pId}?cId=${product.cId}`}>
                                                                <img src={product.image} className='lg:h-full'/>
                                                            </Link>
                                                        </div>
                                                        <div className="ps-product__content">
                                                            <Link
                                                                href={`/product/${product.pId}?cId=${product.cId}`}>
                                                                <p className="ps-product__title">
                                                                    {
                                                                        product.title
                                                                    }
                                                                </p>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </td>
                                            ))
                                        ) : (
                                            <td></td>
                                        )}
                                    </tr>
                                    <tr>
                                        <td className="heading">Rating</td>
                                        {compareItems && compareItems.length > 0 ? (
                                            compareItems.map((product) => (
                                                <td key={product.id}>
                                                    <Rate
                                                        disabled
                                                        defaultValue={4}
                                                    />
                                                </td>
                                            ))
                                        ) : (
                                            <td></td>
                                        )}
                                    </tr>
                                    <tr>
                                        <td className="heading w-[200px]">
                                            Үнэ</td>
                                        {compareItems && compareItems.length > 0 ? (
                                            compareItems.map((product) => {
                                                if (product.salePrice) {
                                                    return (
                                                        <td key={product.cId}>
                                                            <h4 className="price sale">
                                                                {formatCurrency(product.salePrice)}₮
                                                                {" "}
                                                                <del>
                                                                    {formatCurrency(product.price)}₮
                                                                </del>
                                                            </h4>
                                                        </td>
                                                    );
                                                } else
                                                    return (
                                                        <td key={product.cId}>
                                                            <h4 className="price">
                                                                {formatCurrency(product.price)}₮
                                                            </h4>
                                                        </td>
                                                    );
                                            })
                                        ) : (
                                            <td></td>
                                        )}
                                    </tr>
                                    <tr>
                                        <td className="heading">Sold By</td>
                                        {compareItems && compareItems.length > 0 ? (
                                            compareItems.map((compareItems) => (
                                                <td key={product.id}>
                                                    <Link href="/vendor/store-list">
                                                        <p>{product.}</p>
                                                    </Link>
                                                </td>
                                            ))
                                        ) : (
                                            <td></td>
                                        )}
                                    </tr>
                                    <tr>
                                        <td className="heading"></td>
                                        {compareItems && compareItems.length > 0 ? (
                                            compareItems.map((product) => (
                                                <td key={product.id}>
                                                    <button
                                                        className="ps-btn"
                                                        onClick={(e) =>
                                                            handleAddItemToCart(
                                                                e,
                                                                product
                                                            )
                                                        }>
                                                        Add To Cart
                                                    </button>
                                                </td>
                                            ))
                                        ) : (
                                            <td></td>
                                        )}
                                    </tr>
                                </tbody>
                            </table> */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Compare
