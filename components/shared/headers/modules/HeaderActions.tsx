import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import MiniCart from '~/components/shared/headers/modules/MiniCart';
import AccountQuickLinks from '~/components/shared/headers/modules/AccountQuickLinks';
import type { RootState } from '~/store/store';



const HeaderActions = () => {
   const compare = useSelector((state:RootState)=>state.compare)
    const wishlist = useSelector((state: RootState) => state.wishlist);
    const auth = useSelector((state: RootState) => state.auth);
    // views
    let headerAuthView;
    if (auth.user && Boolean(auth.user) === true) {
        headerAuthView = <AccountQuickLinks isLoggedIn={true} />;
    } else {
        headerAuthView = <AccountQuickLinks isLoggedIn={false} />;
    }
    return (
        <div className="header__actions">
            <Link href="/account/compare">
                <div className="header__extra">
                    <i className="icon-chart-bars"></i>
                    <span>
                        <i>{compare ? compare.compareItems.length : 0}</i>
                    </span>
                </div>
            </Link>
            <Link href="/account/wishlist">
                <div className="header__extra">
                    <i className="icon-heart"></i>
                    <span>
                        <i>{wishlist? wishlist.wishlistItems.length : 0}</i>
                    </span>
                </div>
            </Link>
            <MiniCart />
            {headerAuthView}
        </div>
    );
};

export default HeaderActions
