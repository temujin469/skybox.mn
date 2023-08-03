import React from 'react';
import { connect, useSelector } from 'react-redux';
import Link from 'next/link';
import AccountQuickLinksMobile from './AccountQuickLinksMobile';
import type { RootState } from '~/store/store';


const MobileHeaderActions = () => {
      const cart = useSelector((state: RootState) => state.cart);
  const auth = useSelector((state: RootState) => state.auth);

    return (
      <div className="navigation__right">
        <Link href="/account/shopping-cart" className="header__extra">
          <i className="icon-bag2"></i>
          <span>
            <i>{cart.cartItems ? cart.cartItems.length : 0}</i>
          </span>
        </Link>

        {auth.user && Boolean(auth.user) === true ? (
          <AccountQuickLinksMobile />
        ) : (
            <Link href="/account/login" className="header__extra">
              <i className="icon-user"></i>
            </Link>
        )}
      </div>
    );
};

export default MobileHeaderActions
