import React from 'react';
import Menu from '../../elements/menu/Menu';

// import menuData from '../../../public/static/data/menu';
import MenuCategoriesDropdown from '~/components/shared/menus/MenuCategoriesDropdown';
import useGetHomeContent from '~/apiCall/strapi/useGetHomeContent';

const NavigationDefault = ()=>{

    const {data} = useGetHomeContent();
    const topCats = data?.data.attributes.featured_categories;

    return (
            <nav className="navigation">
                <div className="ps-container">
                    <div className="navigation__left">
                        <MenuCategoriesDropdown />
                    </div>
                    <div className="navigation__right whitespace-nowrap">
                        <Menu
                        isMega={false}
                        source={
                            topCats?.map(cat=>({
                                text: cat.name!,
                                url:`/shop?catId=${cat.category_id}`
                            }))
                        }
                            className="menu"
                        />
                        {/* <ul className="navigation__extra" style={{
                            display:"none"
                        }}>
                            <li>
                                <Link href="/vendor/become-p-vendor">
                                    Sell on Martfury
                                </Link>
                            </li>
                            <li>
                                <Link href="/account/order-tracking">
                                    Tract your order
                                </Link>
                            </li>
                            <li>
                                <CurrencyDropdown />
                            </li>
                            <li>
                                <LanguageSwicher />
                            </li>
                        </ul> */}
                    </div>
                </div>
            </nav>
        );
}

export default NavigationDefault;
