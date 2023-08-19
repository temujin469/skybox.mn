import Image from 'next/image';
import React from 'react';
import { marked } from 'marked';
import useSiteConfiguration from '~/apiCall/strapi/useSiteConfiguration';
import PageContainer from '~/components/layouts/PageContainer';
import BreadCrumb from '~/components/elements/BreadCrumb';
import { Box, CircularProgress } from '@chakra-ui/react';

function HemjeeRazmer() {
  const { data, isLoading } = useSiteConfiguration()

  const hemjeeRazmer = data?.data?.attributes?.hemjeeRazmer;
  const breadCrumb = [
    {
      text: 'Хэмжээ размерын хүснэгт',
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
          hemjeeRazmer ? (
            <div className='max-w-[900px] mx-auto'>
              {
                <article className='prose prose-sm sm:prose mx-auto'
                  dangerouslySetInnerHTML={{ __html: marked.parse(hemjeeRazmer) }}
                />
              }

            </div>
          ) : null
        }
      </Box>
    </PageContainer>
  );
}

export default HemjeeRazmer;
