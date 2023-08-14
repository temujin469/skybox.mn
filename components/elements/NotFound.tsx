import { Heading } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

function NotFoundState({ message }: { message?: string }) {
  return (
    <div className='text-center mb-20'>
      <div className='relative aspect-square max-w-[500px] mx-auto'>
        <Image fill src="https://static-00.iconduck.com/assets.00/404-page-not-found-illustration-2048x1462-azn7c8sp.png" alt='not-found' className='object-contain' />
      </div>
      {message && <Heading color="gray.300">{message}</Heading> }
      
    </div>
  );
}

export default NotFoundState;
