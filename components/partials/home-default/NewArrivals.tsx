import React from 'react';
import Link from 'next/link';
import ProductHorizontal from '~/components/elements/products/ProductHorizontal';
import useGetProductsByFilter from '~/apiCall/otapi/useGetProductsByFilter';
import { Box, Grid, GridItem, Heading } from '@chakra-ui/react';

const NewArrivals = ({ collection }: { collection: string }) => {

    const { data, isLoading } = useGetProductsByFilter({ variables: { start: 0, limit: 12, filters: undefined, catId: "otc-4" } });

    const productItems = data?.OtapiItemInfoSubList?.Content;

    // Views
    let productItemView;
    if (!isLoading) {
        if (productItems && productItems.length > 0) {
            productItemView = productItems.map((item) => (
                <GridItem key={item.Id} colSpan={[12,6,6,4,3]}>
                    <ProductHorizontal product={item} />
                </GridItem>
            ));
        } else {
            productItemView = <p>No product found.</p>;
        }
    } else {
        productItemView = <p>Loading...</p>;
    }
    return (
        <div className="ps-product-list ps-new-arrivals">
            <div className="ps-container">
                <Box p={3} borderRadius={5} my={[10,0]}
                    sx={{
                        backgroundImage: "url('/static/img/bg/abstract.png')",
                        bgPosition: "right bottom",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "70%"
                    }}
                    backgroundColor={"brand.1"}
                >
                    <Box
                        // sx={{
                        //     backgroundImage:"url('https://w0.peakpx.com/wallpaper/163/132/HD-wallpaper-blue-yellow-cubes-yellow-background.jpg')"
                        // }}  
                        className="ps-section__header"

                    >
                        <Heading textTransform="uppercase">Бэлэн бараанууд</Heading>
                        {/* <ul className="ps-section__links">
                        <li>
                            <Link href="/shop">
                                Technologies
                            </Link>
                        </li>
                        <li>
                            <Link href="/shop">
                                Electronic
                            </Link>
                        </li>
                        <li>
                            <Link href="/shop">
                                Furnitures
                            </Link>
                        </li>
                        <li>
                            <Link href="/shop">
                               Clothing & Apparel
                            </Link>
                        </li>
                        <li>
                            <Link href="/shop?category=health-and-beauty">
                                Health & Beauty
                            </Link>
                        </li>
                        <li>
                            <Link href="/shop">
                                View All
                            </Link>
                        </li>
                    </ul> */}
                    </Box>
                    <div className="ps-section__content"

                    >
                        <Grid px={[0,10]} pb={[5,10]} gap={3} templateColumns={"repeat(12,1fr)"}>
                            {productItemView}
                        </Grid>
                    </div>
                </Box>

            </div>
        </div>
    );
};

export default NewArrivals;
