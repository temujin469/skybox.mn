/*
 * React template helpers
 * Author: Nouthemes
 * Developed: diaryforlife
 * */

import React from 'react';
import cookies from 'js-cookie';

export function getCartItemsFromCookies() {
    const cartItems = cookies.get('cart');
    if (cartItems) {
        return JSON.parse(cartItems);
    } else {
        return null;
    }
}

// export function updateCartToCookies(payload:ProductItem[]) {
//     cookies.set("cart", JSON.stringify(payload), {
//       path: "/",
//       expires: 24 * 7,
//     });
// }


export function calculateAmount(items:ProductItem[]) {
    return Object.values(items)
        .reduce((acc, { quantity, price }) => acc + quantity * price, 0)

}

export function calculateCartQuantity(items: ProductItem[]) {
  return Object.values(items).reduce((acc, { quantity }) => acc + quantity, 0);
}

export function caculateArrayQuantity(items: ProductItem[]) {
  return Object.values(items).reduce((acc) => acc + 1, 0);
}
