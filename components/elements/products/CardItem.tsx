import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeCartItem } from "~/store/slices/cartSlice";
import { formatCurrency } from "~/utilities/product-helper";
import { AspectRatio, Box, Text } from "@chakra-ui/react";
import useProduct from "~/hooks/useProduct";
import BlurImage from "../BlurImage";

interface Prop {
  cartItem: ProductItem;
}

function CartItem({ cartItem }: Prop) {
  const [quantity, setQuantity] = useState<number>(cartItem.quantity);
  const dispatch = useDispatch();
  const {title} = useProduct()

  const updateCartItemQuantity = () => {
    const newCartItem = { ...cartItem, quantity };
    addToCart(dispatch, newCartItem);
  };

  useEffect(() => {
    updateCartItemQuantity();
  }, [quantity]);

  const handleQuantity = (state: string) => {
    if (state === "NEMEH") {
      setQuantity((x) => (x += 1));
    } else if (state === "HASAH" && quantity > 1) {
      setQuantity((x) => (x -= 1));
    } else return;
  };

  const removeCartItemHandler = (cId: string) => {
    removeCartItem(dispatch, cId);
  };

  return (
    <div key={cartItem.cId} className="flex rounded-[5px] gap-4 border p-2 md:p-4 mb-2 hover:border-gray-500">
      <Box position="relative" width={"128px"}>
        <Link href={`/product/${cartItem.pId}?cId=${cartItem.cId}`} >
          <AspectRatio ratio={1} height="100%" width="100%">
            <BlurImage
            fill
              className="w-[93px] h-[93px] border rounded-[5px] md:w-32 md:h-32 object-cover cursor-pointer"
              src={cartItem.image}
            />
          </AspectRatio>
         
        </Link>
      </Box>
      <Box className="flex flex-col justify-between" w="full" overflow="hidden">
        <div className="flex justify-between gap-4 overflow-hidden">
          <div className="flex  flex-[1] flex-col justify-start overflow-hidden">
            <div className=" text-gray-800 max-w-[180px] md:max-w-full m-0 overflow-hidden">
              {title(cartItem)}
            </div>
            <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
              <strong>Өнгө: </strong>{cartItem.color}
            </Text>
            {
              <Text overflowX="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
                {
                  cartItem.property_name ? <div><strong>{cartItem.property_name}: </strong>{cartItem.property_value}</div> : null
                }
              </Text>
              
            }
          </div>
        
          <button
            onClick={() => removeCartItemHandler(cartItem.cId)}
            className="h-5 w-5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        
        </div>
       
        <div className="flex justify-between items-center">
          <h5 className="text-gray-800 text-lg font-bold m-0">{formatCurrency(cartItem.price)}₮</h5>
          <div className="flex  h-8 items-center border justify-between max-w-[200px] rounded">
            <button
              className=" hover:bg-white bg-gray-200 h-8 w-8 flex items-center justify-center"
              onClick={() => handleQuantity("HASAH")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
              </svg>

            </button>
            <span className="w-10 h-10 flex items-center justify-center">
              {cartItem.quantity}
            </span>
          
            <button
              className=" hover:bg-white bg-gray-200 h-8 w-8 flex items-center justify-center"
              onClick={() => handleQuantity("NEMEH")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>

            </button>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default CartItem;