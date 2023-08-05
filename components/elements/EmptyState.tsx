import { AspectRatio, Box, Heading } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

function EmptyState({text}:{text?:string}) {
  return (
    <Box textAlign="center">
      <AspectRatio ratio={1} maxW="300px" mx="auto">
        <Image src="https://static.vecteezy.com/system/resources/previews/011/537/753/original/box-empty-state-single-isolated-icon-with-flat-style-free-vector.jpg" fill alt="empty state" />
      </AspectRatio>
      <Heading color="gray.300">{text || "Хоосон байна"}</Heading>
    </Box>
      
  );
}

export default EmptyState;
