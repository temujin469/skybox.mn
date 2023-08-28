import { Button, HStack, Heading } from '@chakra-ui/react';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import useMyScroll from '~/hooks/useMyScroll';

type Props = {
  handleAddItemToCart: () => void
  handleBuynow: () => void
  target:Element
  handleDecreaseItemQty: (e:any) => void
  quantity:number
  handleIncreaseItemQty: (e:any) => void
}



function ProductDetailMobileAction({ handleAddItemToCart, handleBuynow,target,handleDecreaseItemQty,handleIncreaseItemQty,quantity}: Props) {


  // const [isIntersecting, setIsIntersecting] = useState(false);
  // const [toggle, setToggle] = useState<boolean>(false);
  const {scrollTop} = useMyScroll()

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       setIsIntersecting(entry.isIntersecting);
  //     },
  //   );
  //   console.log(isIntersecting);
  //   observer.observe(target);
  //   return () => observer.disconnect();
  // }, []);

  // if (window.screenTop + window.innerHeight >= hiddenRef?.current?.offsetTop) console.log(`Hidden element is now visible`);

  return (

    <div
      className={
        clsx("transition-all md:hidden gap-[10px] p-[10px] z-[900] bg-white w-full shadow-[0_-1px_8px_#00000015] flex duration-500 left-0 fixed",
          scrollTop >= 1500 ? "bottom-0" : "bottom-[-100%]"
        )
      }
    >
      <HStack w="fit" rounded={5} bgColor="gray.100">
        <Button variant="ghost" borderRightRadius={0} bgColor="gray.200" onClick={(e)=>handleDecreaseItemQty(e)}>-</Button>
        <Heading size="sm" w="100%" minW="45px" color="gray.600" textAlign="center">{quantity}</Heading>
        <Button variant="ghost"  borderLeftRadius={0} bgColor="gray.200" onClick={(e) => handleIncreaseItemQty(e)}>+</Button>
      </HStack>
      <Button className='flex-[1]' variant="brand" onClick={handleAddItemToCart}>
        Сагслах
      </Button>
      {/* <Button className='flex-[1]' variant="brand" onClick={handleBuynow}>
        Авах
      </Button> */}
    </div >
  );
}

export default ProductDetailMobileAction;
