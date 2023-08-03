import React, { useEffect } from 'react';
import Link from 'next/link';
import menuData from '~/public/static/data/menu';
import CurrencyDropdown from '~/components/shared/headers/modules/CurrencyDropdown';
import LanguageSwicher from '~/components/shared/headers/modules/LanguageSwicher';
import SearchHeader from '~/components/shared/headers/modules/SearchHeader';
import ElectronicHeaderActions from '~/components/shared/headers/modules/ElectronicHeaderActions';
import Menu from '~/components/elements/menu/Menu';
import { stickyHeader } from '~/utilities/common-helpers';

const HeaderMarketPlace2 = () => {
    useEffect(() => {
        if (process.browser) {
            window.addEventListener('scroll', stickyHeader);
        }
    }, []);

    const menuMarket2 = [
        {
            text: 'All Categories',
            url: '/shop',
        },
        {
            text: 'Today Deals',
            url: '/shop',
        },
        {
            text: 'Electronics',
            url: '/shop',
        },
        {
            text: 'Clothing',
            url: '/shop',
        },
        {
            text: 'Computers',
            url: '/shop',
        },
        {
            text: 'Furnitures',
            url: '/shop',
        },
        {
            text: 'Mom & baby',
            url: '/shop',
        },
        {
            text: 'Book & More',
            url: '/shop',
        },
    ];
    return (
        <header
            className="header header--standard header--market-place-2"
            id="headerSticky">
            <div className="header__top">
                <div className="container">
                    <div className="header__left">
                        <p>Welcome to Martfury Online Shopping Store !</p>
                    </div>
                    <div className="header__right">
                        <ul className="header__top-links">
                            <li>
                                <Link href="/vendor/store-list">
                                    <p>Store Location</p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/page/blank">
                                    <p>Track Your Order</p>
                                </Link>
                            </li>
                            <li>
                                <CurrencyDropdown />
                            </li>
                            <li>
                                <LanguageSwicher />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="header__content">
                <div className="container">
                    <div className="header__content-left">
                        <Link href="/home/market-place-2">
                            <div className="ps-logo">
                                <img
                                    src="/static/img/logo.png"
                                    alt="martfury"
                                />
                            </div>
                        </Link>
                        <div className="menu--product-categories">
                            <div className="menu__toggle">
                                <i className="icon-menu"></i>
                                <span> Shop by Department</span>
                            </div>
                            <div className="menu__content">
                                <Menu
                                    source={menuData.product_categories}
                                    className="menu--dropdown"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="header__content-center">
                        <SearchHeader />
                        <div>
                            <Link href="/shop">
                                <p>iphone x</p>
                            </Link>
                            <Link href="/shop">
                                <p>virtual</p>
                            </Link>
                            <Link href="/shop">
                                <p>apple</p>
                            </Link>
                            <Link href="/shop">
                                <p>wireless</p>
                            </Link>
                            <Link href="/shop">
                                <p>simple chair</p>
                            </Link>
                            <Link href="/shop">
                                <p>classic watch</p>
                            </Link>
                            <Link href="/shop">
                                <p>macbook</p>
                            </Link>
                        </div>
                    </div>
                    <div className="header__content-right">
                        <ElectronicHeaderActions />
                    </div>
                </div>
            </div>
            <nav className="navigation">
                <div className="container">
                    <Menu
                        source={menuMarket2}
                        className="menu menu--market-2"
                    />
                </div>
            </nav>
        </header>
    );
};

export default HeaderMarketPlace2;
