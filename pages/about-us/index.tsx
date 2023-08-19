import Image from 'next/image';
import React from 'react';
import { marked } from 'marked';
import useSiteConfiguration from '~/apiCall/strapi/useSiteConfiguration';
import PageContainer from '~/components/layouts/PageContainer';
import BreadCrumb from '~/components/elements/BreadCrumb';
import { Box, CircularProgress } from '@chakra-ui/react';

function AboutUs() {
  const {data,isLoading} = useSiteConfiguration()

  const aboutUs = data?.data?.attributes?.aboutUs;
  const breadCrumb = [
    {
      text: 'Бидний тухай',
    },
  ];

  if(isLoading) return <div className='flex w-full justify-center py-[20px]'>
    <CircularProgress isIndeterminate color='brand.1' />
  </div>


  return (
    <PageContainer title="Бидний тухай">
          <BreadCrumb breadcrumb={breadCrumb} />
          <Box mb="100px" className='ps-container'>
            {
              aboutUs ? (
                <div className='max-w-[900px] mx-auto mt-[20px]'>
                  <div className='aspect-video relative rounded-lg overflow-hidden mb-5'>
                    <Image className='object-contain' src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${aboutUs.image.data.attributes.url}`} fill alt={"aboutUs"} />
                  </div>
                  {
                    aboutUs.content ? (
                      <article className='prose prose-sm sm:prose mx-auto'
                        dangerouslySetInnerHTML={{ __html: marked.parse(aboutUs?.content) }}
                      />
                    ) : null
                  }

                </div>
              ) : null
            }
          </Box>
      </PageContainer>
  );
}

export default AboutUs;
