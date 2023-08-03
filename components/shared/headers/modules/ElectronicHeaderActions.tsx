import React from 'react';
import { connect, useSelector } from 'react-redux';
import Link from 'next/link';

import MiniCart from './MiniCart';
import AccountQuickLinks from './AccountQuickLinks';
import type { RootState } from '~/store/store';

const ElectronicHeaderActions = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const wishlist = useSelector((state: RootState) => state.wishlist);

    return (
        <div className="header__actions">
            <Link href="/account/wishlist">
                <div className="header__extra">
                    <i className="icon-heart"></i>
                    <span>
                        <i>{wishlist.wishlistItems.length}</i>
                    </span>
                </div>
            </Link>
            <MiniCart />
            {auth.token && Boolean(auth.token) === true ? (
                <AccountQuickLinks isLoggedIn={true} />
            ) : (
                <AccountQuickLinks isLoggedIn={false} />
            )}
        </div>
    );
};

export default ElectronicHeaderActions
