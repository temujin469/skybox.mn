import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { useRouter } from 'next/router';
import useUserInfo from '~/apiCall/strapi/useUserInfo';



const AccountMenuSidebar = () =>{

  const { token } = useSelector((state: RootState) => state.auth);

  const { data: user, isLoading } = useUserInfo({ variables: { jwt: token! } });
    const router = useRouter()
  const path = router.pathname.split('/')[2]

  const accountLinks = [
    {
      text: "Хэрэглэгчийн мэдээлэл",
      url: "/account/user-information",
      icon: "icon-user",
      active: path === "user-information"
    },
   
    {
      text: "Захиалга",
      url: "/account/invoices",
      icon: "icon-papers",
      active: path === "invoices"

    },
    {
      text: "Хаяг",
      url: "/account/addresses",
      icon: "icon-map-marker",
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
      icon: "icon-heart",
      active: path === "wishlist"
    },
  ];

    return (
      <aside className="ps-widget--account-dashboard bg-white p-10 mb-20">
        <div className="ps-widget__header">
          <img src="/static/img/users/3.jpg" />
          <figure>
            <figcaption>{user?.username}</figcaption>
            <p>{user?.email}</p>
          </figure>
        </div>
        <div className="ps-widget__content">
          <ul>
            {accountLinks.map((link) => (
              <li key={link.text} className={link.active ? "active" : ""}>
                <Link href={link.url}>
                  <p>
                    <i className={link.icon}></i>
                    {link.text}
                  </p>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/account/my-account">
                <p>Системээс гарах</p>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    );
}

export default AccountMenuSidebar;
