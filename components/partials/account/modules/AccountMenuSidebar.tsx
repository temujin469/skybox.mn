import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '~/store/store';
import { useRouter } from 'next/router';
import useUserInfo from '~/apiCall/strapi/useUserInfo';
import { FiLogOut } from 'react-icons/fi';
import { logout } from '~/store/auth/authSlice';
import { Heading, useToast } from '@chakra-ui/react';
import {  FaRegHeart, FaRegUser } from 'react-icons/fa';
import { RiArticleLine } from 'react-icons/ri';
import { TbMapPinPlus } from 'react-icons/tb';



const AccountMenuSidebar = () => {

  const auth = useSelector((state: RootState) => state.auth);

  const { data: user, isLoading } = useUserInfo({ variables: { jwt: auth.token! } });
  const toast = useToast()

  const router = useRouter()
  const path = router.pathname.split('/')[2];

  const dispatch: AppDispatch = useDispatch()

  const handleLogout = () => {
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
      text: "Хэрэглэгчийн мэдээлэл",
      url: "/account/user-information",
      icon: <FaRegUser size={20} />,
      active: path === "user-information"
    },

    {
      text: "Захиалга",
      url: "/account/invoices",
      icon: <RiArticleLine size={20} />,
      active: path === "invoices"

    },
    {
      text: "Хаяг",
      url: "/account/addresses",
      icon: <TbMapPinPlus size={20} />,
      active: path === "addresses"
    },
    // {
    //     text: 'Саяхан үзсэн бүтээгдэхүүн',
    //     url: '/account/recent-viewed-product',
    //     icon: 'icon-store',
    // },
    {
      text: "Хүслийн жагсаалт",
      url: "/account/wishlist",
      icon: <FaRegHeart size={20} />,
      active: path === "wishlist"
    },
  ];

  if (!auth.user && !auth.isLoading ) {
    return <aside className="ps-widget--account-dashboard">
      <div className="ps-widget__content">
        <ul>
          <li  className={"active"}>
            <Link href="/account/wishlist" className='text-gray-700'>
              <Heading fontWeight={500} color={"white" } fontSize={{ base: "16px", md: "17px" }} className='flex items-center gap-2'>
                <FaRegHeart size={20} />
                Хүслийн жагсаалт
              </Heading>
            </Link>
          </li>
          <li>
            <Link className="cursor-pointer text-gray-700" href={"/account/register"}>
              <Heading fontWeight={500} color="inherit" fontSize={{ base: "16px", md: "17px" }} className='flex items-center gap-2'>
                <FaRegUser size={20} />
                Бүртгүүлэх
              </Heading>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  }

  return (
    <aside className="ps-widget--account-dashboard">
      <div className="ps-widget__header">
        <img src="/static/img/users/defaultUser.png" />
        <figure>
          <figcaption>{user?.username}</figcaption>
          <p>{user?.email}</p>
        </figure>
      </div>
      <div className="ps-widget__content">
        <ul>
          {accountLinks.map((link) => (
            <li key={link.text} className={link.active ? "active" : ""}>
              <Link href={link.url} className='text-gray-700'>
                <Heading fontWeight={500} color={link.active ? "white" : "inherit"} fontSize={{ base: "16px", md: "17px" }} className='flex items-center gap-2'>
                  {link.icon}
                  {link.text}
                </Heading>
              </Link>
            </li>
          ))}
          <li>
            <a className="cursor-pointer text-gray-700" onClick={handleLogout}>
              <Heading fontWeight={500} color="inherit" fontSize={{ base: "16px", md: "17px" }} className='flex items-center gap-2'>
                <FiLogOut size={20} />
                Системээс гарах
              </Heading>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default AccountMenuSidebar;
