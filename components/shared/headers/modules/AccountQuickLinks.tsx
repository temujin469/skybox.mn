import React from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { logout } from '~/store/auth/authSlice';
import { AppDispatch } from '~/store/store';

type Props = {
  isLoggedIn: boolean;
}

const AccountQuickLinks = (props:Props) => {
  const dispatch:AppDispatch = useDispatch();
  const handleLogout = (e:any) => {
    e.preventDefault();
    dispatch(logout());
  };
  const accountLinks = [
    {
      text: "Бүртгэлийн мэдээлэл",
      url: "/account/user-information",
    },
    // {
    //   text: "Notifications",
    //   url: "/account/notifications",
    // },
    {
      text: "Захиалга",
      url: "/account/invoices",
    },
    {
      text: "Хаяг",
      url: "/account/addresses",
    },
    // {
    //   text: "Recent Viewed Product",
    //   url: "/account/recent-viewed-product",
    // },
    {
      text: "Хүслийн жагсаалт",
      url: "/account/wishlist",
    },
  ];
  const { isLoggedIn } = props;

  // View
  const linksView = accountLinks.map((item) => (
    <li key={item.text}>
      <Link href={item.url}>{item.text}</Link>
    </li>
  ));

  if (isLoggedIn === true) {
    return (
      <div className="ps-block--user-account">
        <i className="icon-user"></i>
        <div className="ps-block__content">
          <ul className="ps-list--arrow">
            {linksView}
            <li className="ps-block__footer">
              <a href="#" onClick={(e) => handleLogout(e)}>
                Гарах
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="ps-block--user-header">
        <div className="ps-block__left">
          <i className="icon-user"></i>
        </div>
        <div className="ps-block__right">
          <Link href="/account/login">Нэвтрэх</Link>
          <Link href="/account/register">Бүртгүүлэх</Link>
        </div>
      </div>
    );
  }
};

export default AccountQuickLinks