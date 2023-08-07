import React from 'react';
import Link from 'next/link';
import { QueryClient, dehydrate } from '@tanstack/react-query';
// import MegaMenuCol from './MegaMenuCol';
import useGetMenu from '~/apiCall/strapi/useGetMenu';
import { GetStaticProps } from 'next';
import useBreadCrumb from '~/hooks/useBreadCrumb';
import useFilter from '~/hooks/useFilter';
import { Heading, Text } from '@chakra-ui/react';
import Icon from '../Icon';


const MegaMenu = () => {

    const { data } = useGetMenu();
    // console.log("data",data)
    const { setLinks } = useBreadCrumb()
    const { setFilter } = useFilter()

    const handleBreadCrumb = (cats: { name: string, category_id: string }[], catId: string) => {
        const links: BreadCrumb[] = cats.map((cat) => ({
            text: cat.name,
            url: `/shop?catId=${cat.category_id}`,
        }));
        setLinks(links);
        setFilter({ CategoryId:catId })
    }

    return data?.data?.map(({ attributes: menu }) => (
        <li className="menu-item-has-children has-mega-menu">
            <Link href={`/shop?catId=${menu.category_id}`} onClick={() => handleBreadCrumb([menu], menu.category_id)}>
                <Heading fontSize="16px" color="gray.600" display="flex" alignItems="center" gap="3px">
                    {menu.icon &&
                        <Icon iconName={menu.icon} size={17} color='#4d5560'/>
                    }
                    {menu.name}
                </Heading>
            </Link>
            <div className="mega-menu">
                {menu.categories.map((cat) => (
                    <div className="mega-menu__column">
                        <Link href={`/shop?catId=${cat.category_id}`} onClick={() => handleBreadCrumb([menu, cat], cat.category_id)}>
                            <Heading fontSize="16px">
                                {cat.name}
                            </Heading>
                        </Link>
                        <ul className="mega-menu__list">
                            {cat.subCategories?.slice(0, 10)?.map((sub) => (
                                <li key={sub.id}>
                                    <Link href={`/shop?catId=${sub.category_id}`}
                                        onClick={() => handleBreadCrumb([menu, cat, sub], sub.category_id)}>
                                        <Text _hover={{ color: "gray.800" }}>
                                            {sub.name}
                                        </Text>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </li>
    ));
};

export default MegaMenu;

export const getStaticProps: GetStaticProps = async () => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery(useGetMenu.getKey(), useGetMenu.queryFn);

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}
