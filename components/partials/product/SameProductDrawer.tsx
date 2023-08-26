import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/react';
import React from 'react';
import useSearchItemsFrame from '~/apiCall/otapi/useSearchItemsFrame';
import Product from '~/components/elements/products/Product';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import useAppState from '~/hooks/useAppState';

type Props = {
  isOpen: boolean
  onClose: () => void,
  filters: Partial<ProductFilter>
}

function SameProductDrawer({ isOpen, onClose, filters }: Props) {


  const { data, isLoading } = useSearchItemsFrame({ variables: { start: 0, limit: 20, filters: filters } });

  const productItems = data?.Result?.Items?.Content;

  return (
    <div>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
      // variant=""
      // size="lg"
      // finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent maxW={"850px"} w="full">
          <DrawerHeader position="relative" borderBottom="1px" borderColor="gray.200">
            Төстэй бараанууд
            <DrawerCloseButton sx={{
              top: "50%",
              transform: "translate(0, -50%)"
            }} />
          </DrawerHeader>

          <DrawerBody>
            <div className="grid grid-cols-12 ">
              {
                isLoading ? (
                  <div className="col-span-3">
                    <SkeletonProduct/>
                  </div>
                ) : (
                  productItems?.map((product) => (
                    <div className="col-span-3">
                      <Product product={product} />
                    </div>
                  ))
                )
              }
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default SameProductDrawer;
