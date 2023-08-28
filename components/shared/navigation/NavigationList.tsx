import React, { useState } from "react";
import { Drawer } from "antd";
import PanelMenu from "../panel/PanelMenu";
import PanelCartMobile from "../panel/PanelCartMobile";
import PanelSearch from "../panel/PanelSearch";
import PanelCategories from "../panel/PanelCategories";
import Link from "next/link";
import {TbSmartHome} from "react-icons/tb"
import { RiSearch2Line } from "react-icons/ri";
import { VscLayoutMenubar } from "react-icons/vsc";
import { FiHeart, FiShoppingCart, FiUser} from "react-icons/fi";
import { Box, Text } from "@chakra-ui/react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "~/store/store";
import useMyScroll from "~/hooks/useMyScroll";



const NavigationList = (props:any)=> {

  const [menuDrawer, setMenuDrawer] = useState(false);
  const [cartDrawer, setCartDrawer] = useState(false);
  const [searchDrawer, setSearchDrawer] = useState(false);
  const [categoriesDrawer, setCategoriesDrawer] = useState(false);

  const router = useRouter()
  const token = useSelector((state:RootState)=>state.auth.token);
  const isAuth = Boolean(token)
 
 const handleDrawerClose = () => {
    setMenuDrawer(false);
    setCartDrawer(false);
   setSearchDrawer(false);
   setCategoriesDrawer(false);
  };

 const handleShowMenuDrawer = () => {
    setMenuDrawer(!menuDrawer);
  };

 const handleShowCartDrawer = () => {
    setCartDrawer(!cartDrawer)
  };
 const handleShowSearchDrawer = () => {
    setSearchDrawer(!searchDrawer);
  };
 const handleShowCategoriesDrawer = () => {
    setCategoriesDrawer(!categoriesDrawer)
  };

  const { scrollDirection } = useMyScroll()

  // console.log(router)

  

    return (
      <div
      className={
        clsx("navigation--list transition-all duration-500 left-0 fixed",
          router.route === "/shop" && scrollDirection === "down" ? "bottom-[-100%]" : "bottom-0",
          router.route === "/product/[pid]" && "hidden"
        )
      }>
        <Drawer
          className="ps-panel--mobile"
          placement="right"
          closable={false}
          onClose={handleDrawerClose}
          open={menuDrawer}
        >
          <div className="ps-panel--wrapper">
            <div className="ps-panel__header">
              <h3>Цэс</h3>
              <span
                className="ps-panel__close"
                onClick={handleDrawerClose}
              >
                <i className="icon-cross"></i>
              </span>
            </div>
            <div className="ps-panel__content">
              <PanelMenu />
            </div>
          </div>
        </Drawer>
        <Drawer
          className="ps-panel--mobile"
          placement="right"
          closable={false}
          onClose={handleDrawerClose}
          open={cartDrawer}
        >
          <div className="ps-panel--wrapper">
            <div className="ps-panel__header">
              <h3>Сагс</h3>
              <span
                className="ps-panel__close"
                onClick={handleDrawerClose}
              >
                <i className="icon-cross"></i>
              </span>
            </div>
            <div className="ps-panel__content">
              <PanelCartMobile />
            </div>
          </div>
        </Drawer>
        <Drawer
          className="ps-panel--mobile"
          placement="right"
          closable={false}
          onClose={handleDrawerClose}
          open={searchDrawer}
        >
          <div className="ps-panel--wrapper">
            <div className="ps-panel__header">
              <h3>Хайлт</h3>
              <span
                className="ps-panel__close"
                onClick={handleDrawerClose}
              >
                <i className="icon-cross"></i>
              </span>
            </div>
            <div className="ps-panel__content">
              <PanelSearch handleClose={handleDrawerClose}/>
            </div>
          </div>
        </Drawer>
        <Drawer
          className="ps-panel--mobile"
          placement="right"
          closable={false}
          onClose={handleDrawerClose}
          open={categoriesDrawer}
        >
          <div className="ps-panel--wrapper">
            <div className="ps-panel__header">
              <h3>Ангилал</h3>
              <span
                className="ps-panel__close"
                onClick={handleDrawerClose}
              >
                <i className="icon-cross"></i>
              </span>
            </div>
            <div className="ps-panel__content">
              <PanelCategories  />
            </div>
          </div>
        </Drawer>
        <div className="navigation__content">
          {/* <div
            className={`navigation__item ${
              menuDrawer === true ? "active" : ""
            }`}
            onClick={this.handleShowMenuDrawer}
          >
            <i className="icon-home"></i>
            <span>Нүүр</span>
          </div> */}
          <Link
            href={"/"}
            // className="b"
            className={clsx("navigation__item", router.route === "/" && "active")}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              color="gray.600"
            >
              <TbSmartHome size={26} />
              <Text fontSize="11px">Нүүр</Text>
            </Box>
          </Link>
          <div
            className={clsx("navigation__item", categoriesDrawer && "active")}
            onClick={handleShowCategoriesDrawer}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              color="gray.600"
            >
              <VscLayoutMenubar size={26} />
              <Text fontSize="11px">Ангилал</Text>
            </Box>
          </div>
         
          <div
            className={clsx("navigation__item", cartDrawer && "active")}
            onClick={handleShowCartDrawer}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              color="gray.600"
            >
              <FiShoppingCart size={26} />
              <Text fontSize="11px">Сагс</Text>
            </Box>
          </div>
          <Link
          href={"/account/wishlist"}
            className={clsx("navigation__item", router.route === "/account/wishlist" && "active")}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              color="gray.600"
            >
              <FiHeart size={26} />
              <Text fontSize="11px">Хадгалсан</Text>
            </Box>
          </Link>
          <Link
            href={isAuth ? "/account/user-information" : "/account/register"}
            className={clsx("navigation__item", router.route === "/account/user-information" && "active" )}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              color="gray.600"
            >
              <FiUser size={26} />
              <Text fontSize="11px">Профайл</Text>
            </Box>
          </Link>
          <div
             className={clsx("navigation__item", searchDrawer && "active" )}
            onClick={handleShowSearchDrawer}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              color="gray.600"
            >
              <RiSearch2Line size={26} />
              <Text fontSize="11px">Хайлт</Text>
            </Box>
            <span></span>
          </div>
        </div>
      </div>
    );
}

export default NavigationList;
