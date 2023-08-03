import React, { Component, useState } from 'react';
import { Collapse, Menu } from 'antd';
import Link from 'next/link';
import categories from '../../../public/static/data/static-categories.json';
// import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { CollapseProps, MenuProps } from 'antd';
import useGetMenu from '~/apiCall/strapi/useGetMenu';

const { SubMenu } = Menu;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}



const PanelCategories = () => {
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  const [openKeys, setOpenKeys] = useState<string[]>();

  const { data } = useGetMenu();

  // const items: MenuProps["items"] = data?.data.map((item) => {
  //   return getItem(item.attributes.name, item.attributes.category_id, <i className={item.attributes.icon} />,
  //     item.attributes.categories.map((cat) => getItem(<Link href={`/shop?cat=${cat.category_id}`}>{cat.name}</Link>, cat.category_id, null,
  //       cat.subCategories.map((subCat) => getItem(<Link href={`/shop?cat=${subCat.category_id}`}>{subCat.name}</Link>,subCat.category_id,null))
  //     )
  //     )
  //   )
  // })


  const rootSubmenuKeys = data?.data?.map(({attributes})=>attributes.category_id);

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys?.indexOf(key) === -1);
    if (rootSubmenuKeys?.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

  const itemsNest: CollapseProps['items'] = [
    {
      key: '1',
      label: 'This is panel nest panel',
      children: <p>{text}</p>,
    },
  ];

  const items: CollapseProps['items'] =data?.data?.map(menu =>({
    key:menu.id,
    label:menu.attributes.name,
    children:<Collapse ghost items={
      menu.attributes.categories.map(cat=>({
        key:cat.id,
        label:cat.name,
        children:<div className='flex flex-col'>
          {
            cat.subCategories.map(sub=>(
              <Link className='pb-2' key={sub.id} href={`/shop?catId=${sub.category_id}`}>{sub.name}</Link>
            ))
          }
        </div>
        // children:<Collapse collapsible="icon" ghost items={
        //   cat.subCategories.map(sub=>({
        //     key:sub.category_id,
        //     label:sub.name,
        //   }))
        // }/>
      }))
    }/>
  }))
  // return (
  //   <Menu
  //     onClick={onClick}
  //     // style={{ width: 256 }}
  //     onOpenChange={onOpenChange}
  //     openKeys={openKeys}
  //     mode="inline"
  //     items={items}
  //   />
  // );
  return <Collapse className='bg-white' bordered={false}  items={items} />;
}

export default PanelCategories;
