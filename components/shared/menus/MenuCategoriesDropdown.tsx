import React from 'react';

import Menu from '~/components/elements/menu/Menu';
import { CgMenu } from "react-icons/cg"
import { Box } from '@chakra-ui/react';

const MenuCategoriesDropdown = () => {
   
    return (
        <div className="menu--product-categories">
            <div className="menu__toggle">
                <div style={{
                    fontSize:"20px",
                    marginRight:"5px",
                    color:"black"
                }}>
                    <CgMenu />
                </div>
                <Box style={{
                    fontWeight:"bold",
                    fontSize:"15px"
                }}>Ангилал</Box>
            </div>
            <div className="menu__content">
                <Menu
                    isMega
                    className="menu--dropdown"
                />
            </div>
        </div>
    );
};

export default MenuCategoriesDropdown;
