import React from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { logout } from '~/store/auth/authSlice';
import { AppDispatch } from '~/store/store';
import { Menu, MenuButton, MenuDivider, MenuItem, MenuList, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';

type Props = {
  isLoggedIn: boolean;
}

const AccountQuickLinks = (props: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter()
  const toast = useToast()
  const handleLogout = (e: any) => {
    e.preventDefault();
    dispatch(logout());
    toast({
      title: "Амжилттай гарлаа",
      status: "success",
      isClosable: true,
    })
    router.push("/")
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
    <MenuItem key={item.text}>
      <a className='text-gray-700 hover:text-gray-700 text-[15px]' href={item.url}>{item.text}</a>
    </MenuItem>
  ));

  if (isLoggedIn === true) {
    return (
      // <div className="ps-block--user-account mt-1">
      <Menu >
        <MenuButton>
          <i className="icon-user mt-2 text-[30px]"></i>
        </MenuButton>
        <MenuList>
          {linksView}
          <MenuDivider/>
          <MenuItem fontSize="15px" onClick={(e) => handleLogout(e)}>
            Системээс гарах
          </MenuItem>
        </MenuList>
      </Menu>
      // </div>

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
