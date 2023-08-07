import React from 'react';
import Link from 'next/link';
import { AspectRatio, Box, Heading } from '@chakra-ui/react';
import BlurImage from '../BlurImage';

type Props = {
  brand:BrandInfoContent
}

const BrandCard = ({ brand }: Props) => {

  return (
    <Box border="1px" _hover={{
      shadow:"sm",
      borderColor:"gray.400"
    }} borderRadius="full" overflow="hidden" p="5px" borderColor="gray.200" mx="4px">
        <Link href={`/shop?brandId=${brand.Id}`}>
          <AspectRatio ratio={1}>
            <BlurImage fill src={brand.PictureUrl!} />
          </AspectRatio>
        </Link>
    </Box>
  );
};


export default BrandCard;
