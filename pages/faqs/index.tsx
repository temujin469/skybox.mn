import Image from 'next/image';
import React from 'react';
import { marked } from 'marked';
import useSiteConfiguration from '~/apiCall/strapi/useSiteConfiguration';
import PageContainer from '~/components/layouts/PageContainer';
import BreadCrumb from '~/components/elements/BreadCrumb';
import { Box, CircularProgress } from '@chakra-ui/react';

function Faqs() {
  const { data, isLoading } = useSiteConfiguration()

  const faqs = data?.data?.attributes?.faqs;
  const breadCrumb = [
    {
      text: 'Их асуудаг асуултууд',
    },
  ];

  if (isLoading) return <div className='flex w-full justify-center py-[20px]'>
    <CircularProgress isIndeterminate color='brand.1' />
  </div>


  return (
    <PageContainer title="Үйлчилгээний нөхцөл">
      <BreadCrumb breadcrumb={breadCrumb} />
      <Box my="30px" className='ps-container'>
        {
          faqs ? (
            <div className='max-w-[900px] mx-auto'>
              {
                <article className='prose prose-sm sm:prose mx-auto'
                  dangerouslySetInnerHTML={{ __html: marked.parse(faqs) }}
                />
              }

            </div>
          ) : null
        }
      </Box>
    </PageContainer>
  );
}

export default Faqs;
