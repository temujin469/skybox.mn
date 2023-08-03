import React from 'react';
import {  useDispatch } from 'react-redux';
import Link from 'next/link';
import { Dropdown, Menu } from 'antd';

import { logout } from '~/store/auth/authSlice';
import { AppDispatch } from '~/store/store';
const AccountQuickLinks = () => {
    const dispatch:AppDispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }

    const accountLinks = [
        {
            text: "Бүртгэлийн мэдээлэл",
            url: "/account/user-information",
        },
        {
            text: "Нэхэмжлэл",
            url: "/account/invoices",
        },
        {
            text: "Хаяг",
            url: "/account/addresses",
        },
        
        {
            text: "Хүслийн жагсаалт",
            url: "/account/wishlist",
        },
    ];
    const menu = (
        <Menu>
            {accountLinks.map(link => (
                <Menu.Item key={link.url}>
                    <Link href={link.url}>
                        {link.text}
                    </Link>
                </Menu.Item>
            ))}

            <Menu.Item>
                <a href="#" onClick={handleLogout}>
                    Гарах
                </a>
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown dropdownRender={()=>menu} placement="bottomLeft" className='z-[10000]'>
            <div className="header__extra ps-user--mobile">
                <i className="icon-user"></i>
            </div>
        </Dropdown>
    );
}
export default AccountQuickLinks
