import React, { Component } from "react";
import { connect } from "react-redux";
import { Drawer } from "antd";
import PanelMenu from "../panel/PanelMenu";
import PanelCartMobile from "../panel/PanelCartMobile";
import PanelSearch from "../panel/PanelSearch";
import PanelCategories from "../panel/PanelCategories";
import Link from "next/link";
import {TbSmartHome} from "react-icons/tb"
import { RiSearch2Line } from "react-icons/ri";
import { VscLayoutMenubar } from "react-icons/vsc";
import { FiShoppingCart } from "react-icons/fi";
import { Box, Text } from "@chakra-ui/react";

class NavigationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuDrawer: false,
      cartDrawer: false,
      searchDrawer: false,
      categoriesDrawer: false,
    };
  }

  handleDrawerClose = () => {
    this.setState({
      menuDrawer: false,
      cartDrawer: false,
      searchDrawer: false,
      categoriesDrawer: false,
    });
  };

  handleShowMenuDrawer = () => {
    this.setState({
      menuDrawer: !this.state.menuDrawer,
      cartDrawer: false,
      searchDrawer: false,
      categoriesDrawer: false,
    });
  };

  handleShowCartDrawer = () => {
    this.setState({
      menuDrawer: false,
      cartDrawer: !this.state.cartDrawer,
      searchDrawer: false,
      categoriesDrawer: false,
    });
  };
  handleShowSearchDrawer = () => {
    this.setState({
      menuDrawer: false,
      cartDrawer: false,
      searchDrawer: !this.state.searchDrawer,
      categoriesDrawer: false,
    });
  };
  handleShowCategoriesDrawer = () => {
    this.setState({
      menuDrawer: false,
      cartDrawer: false,
      searchDrawer: false,
      categoriesDrawer: !this.state.categoriesDrawer,
    });
  };

  render() {
    const { menuDrawer, searchDrawer, cartDrawer, categoriesDrawer } =
      this.state;

    return (
      <div className="navigation--list">
        <Drawer
          className="ps-panel--mobile"
          placement="right"
          closable={false}
          onClose={this.handleDrawerClose}
          open={this.state.menuDrawer}
        >
          <div className="ps-panel--wrapper">
            <div className="ps-panel__header">
              <h3>Цэс</h3>
              <span
                className="ps-panel__close"
                onClick={this.handleDrawerClose}
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
          onClose={this.handleDrawerClose}
          open={this.state.cartDrawer}
        >
          <div className="ps-panel--wrapper">
            <div className="ps-panel__header">
              <h3>Сагс</h3>
              <span
                className="ps-panel__close"
                onClick={this.handleDrawerClose}
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
          onClose={this.handleDrawerClose}
          open={this.state.searchDrawer}
        >
          <div className="ps-panel--wrapper">
            <div className="ps-panel__header">
              <h3>Хайлт</h3>
              <span
                className="ps-panel__close"
                onClick={this.handleDrawerClose}
              >
                <i className="icon-cross"></i>
              </span>
            </div>
            <div className="ps-panel__content">
              <PanelSearch handleClose={this.handleDrawerClose}/>
            </div>
          </div>
        </Drawer>
        <Drawer
          className="ps-panel--mobile"
          placement="right"
          closable={false}
          onClose={this.handleDrawerClose}
          open={this.state.categoriesDrawer}
        >
          <div className="ps-panel--wrapper">
            <div className="ps-panel__header">
              <h3>Ангилал</h3>
              <span
                className="ps-panel__close"
                onClick={this.handleDrawerClose}
              >
                <i className="icon-cross"></i>
              </span>
            </div>
            <div className="ps-panel__content">
              <PanelCategories handleDrawerClose={this.handleDrawerClose} />
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
            className={`navigation__item `}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              color="gray.600"
            >
              <TbSmartHome size={28} />
              <Text fontSize="12px">Нүүр</Text>
            </Box>
          </Link>
          <div
            className={`navigation__item ${
              categoriesDrawer === true ? "active" : ""
            }`}
            onClick={this.handleShowCategoriesDrawer}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              color="gray.600"
            >
              <VscLayoutMenubar size={28} />
              <Text fontSize="12px">Ангилал</Text>
            </Box>
          </div>
          <div
            className={`navigation__item ${
              searchDrawer === true ? "active" : ""
            }`}
            onClick={this.handleShowSearchDrawer}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              color="gray.600"
            >
              <RiSearch2Line size={28} />
              <Text fontSize="12px">Хайлт</Text>
            </Box>
            <span></span>
          </div>
          <div
            className={`navigation__item ${
              cartDrawer === true ? "active" : ""
            }`}
            onClick={this.handleShowCartDrawer}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              color="gray.600"
            >
              <FiShoppingCart size={28} />
              <Text fontSize="12px">Сагс</Text>
            </Box>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state.setting;
};
export default connect(mapStateToProps)(NavigationList);
