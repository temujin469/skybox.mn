import { AspectRatio, Box, Grid, GridItem, Skeleton, SkeletonText, Stack } from "@chakra-ui/react";
import React from "react";

const SkeletonProductDetail = () => {
  return (
      <Grid templateColumns="repeat(12,1fr)" mb={10} className=" p-[10px] md:p-[30px]">
        <GridItem colSpan={{base:12,md:5}} mb={5}>
          <AspectRatio ratio={1} mb={3}>
            <Skeleton />
          </AspectRatio>
          <Grid gap={3} templateColumns="repeat(6,1fr)" w="full">
            {Array(6).fill(null).map((_,i)=>(
              <GridItem colSpan={1}>
                <AspectRatio ratio={1} key={i}>
                  <Skeleton />
                </AspectRatio>
              </GridItem>
            ))}
          </Grid>
        </GridItem >
        <GridItem colSpan={{base:12,md:7}} pl={{md:"30px"}}>
            <Skeleton height="40px" maxW="500px" mb="20px"/>
          <SkeletonText spacing={6} noOfLines={17} skeletonHeight="20px"/>
        </GridItem>
      </Grid>
  );
};

export default SkeletonProductDetail;
