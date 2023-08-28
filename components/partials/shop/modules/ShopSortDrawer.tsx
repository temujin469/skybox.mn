import { CloseButton, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Heading } from '@chakra-ui/react';
import clsx from 'clsx';
import React from 'react';
import useShopState from '~/hooks/shop/useShopState';
import useFilter from '~/hooks/useFilter';

function ShopSortDrawer() {
  const { isSortDrawer, toggleSortDrawer } = useShopState();
  const { setFilter, filters } = useFilter();
  const handleChange = (value: string | undefined) => {
    setFilter({ ...filters, OrderBy: value });
  }

  const sorts = [
    { value: undefined, label: 'Энгийн' },
    { value: 'UpdatedTime:Asc', label: 'Шинэ бараа эхэндээ' },
    { value: 'UpdatedTime:Desc', label: 'Хуучин бараа эхэндээ' },
    { value: 'Price:Asc', label: 'Хямд үнтэй нь эхэндээ' },
    { value: 'Price:Desc', label: 'Үнтэй нь эхэндээ' },
  ];


  return (
    <Drawer placement="bottom" onClose={toggleSortDrawer} isOpen={isSortDrawer}>
      <DrawerOverlay />
      <DrawerContent className='rounded-t-[10px]'>
        <DrawerBody maxH="75vh" pt="15px" px={"15px"}>
          <Heading mb="15px" className='flex justify-between items-center'>
            Эрэмбэлэх
            <CloseButton onClick={toggleSortDrawer}/>
          </Heading>
          {
            sorts.map(sort => (
              <div
              className={
                clsx("p-[10px] mb-[10px] rounded-[5px] ",
                  filters?.OrderBy === sort.value ? "bg-yellow-300 text-white" : "bg-gray-100"
                )
              } onClick={()=>handleChange(sort.value)}>
                {sort.label}
              </div>
            ))
          }
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default ShopSortDrawer;
