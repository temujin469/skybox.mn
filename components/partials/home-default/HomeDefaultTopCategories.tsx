import React from 'react';
import Link from 'next/link';
import useGetHomeContent from '~/apiCall/strapi/useGetHomeContent';
import { AspectRatio, Grid, GridItem, Heading } from '@chakra-ui/react';
import BlurImage from '~/components/elements/BlurImage';

const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;



const HomeDefaultTopCategories = () => {

  const { data } = useGetHomeContent()
  const topCategories = data?.data?.attributes.featured_categories
  return (
    <div className="ps-top-categories">
      <div className="ps-container">
        <Heading borderBottom="1px" borderColor="gray.100" pb="8px" mb={5}>ОНЦЛОХ АНГИЛАЛ</Heading>
        <Grid templateColumns="repeat(24,1fr)" gap={3}>
          {
            topCategories?.map((category) => (
              <GridItem textAlign="center" overflow="hidden" colSpan={[12, 12, 8, 6, 4, 3]} className="group">
                <Link href={`/shop?catId=${category.category_id}`} >
                  <AspectRatio ratio={1}>
                    <BlurImage fill className='group-hover:scale-100 scale-90 duration-100' src={`${baseUrl}${category.image.data.attributes.url}`} alt={category.name} />
                  </AspectRatio>
                  <Heading>{category.name}</Heading>
                </Link>
              </GridItem>
            ))
          }
        </Grid>
      </div>
    </div>
  );
}

export default HomeDefaultTopCategories;
