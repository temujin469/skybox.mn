import React from 'react';
import Link from 'next/link';
import useGetHomeContent from '~/apiCall/strapi/useGetHomeContent';
import { Heading } from '@chakra-ui/react';

const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;



const HomeDefaultTopCategories = () => {

    const {data} = useGetHomeContent()
    const topCategories = data?.data.attributes.featured_categories
    return (
      <div className="ps-top-categories">
        <div className="ps-container">
          <Heading  mb={5}>ОНЦЛОХ АНГИЛАЛ</Heading>
          <div className="row ">
            {
              topCategories?.map((category) => (
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 group">
                  <div className="ps-block--category">
                    <Link href={`/shop?catId=${category.category_id}`} className="ps-block__overlay">
                    </Link>

                      <img className='group-hover:scale-105 duration-200' src={`${baseUrl}${category.image.data.attributes.url}`} alt={category.name} />
                    <Heading>{category.name}</Heading>

                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
}

export default HomeDefaultTopCategories;
