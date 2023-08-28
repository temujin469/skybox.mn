import { Button } from '@chakra-ui/react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React  from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { LuSettings2 } from 'react-icons/lu';
import { TbArrowsSort } from 'react-icons/tb';
import useShopState from '~/hooks/shop/useShopState';
import useMyScroll from '~/hooks/useMyScroll';

function ShopMobileHeader() {

  const { scrollDirection } = useMyScroll();
  const router = useRouter();
  const {toggleFilterDrawer,toggleSortDrawer} = useShopState()

  return (
    <div className={clsx("w-full z-[900] lg:hidden transition-all duration-400 sticky left-0", scrollDirection === "down" ? "top-[-100%]" : "top-0")}>
      <div className='bg-white p-[10px] gap-[10px] items-center flex shadow-[0_1px_5px_#00000013]'>
        <div className='pr-[5px]'>
          <FiArrowLeft onClick={router.back} size={20}/>
        </div>
        <Button className='flex-[1] gap-1' onClick={toggleSortDrawer}>
          Эрэмбэлэх
          <div>
            <TbArrowsSort size={18} />
          </div>
        </Button>
        <Button className='flex-[1] gap-1' onClick={toggleFilterDrawer}>
          Шүүлт 
          <div>
            <LuSettings2 size={18} />
          </div>
        </Button>
      </div>
    </div>
  );
}

export default ShopMobileHeader;
