import React, { useState } from "react";
import { Link } from "react-router-dom";

import { MainHeader } from "./MainHeader";
import { NavLinks } from "./NavLinks";
import { SideDrawer } from "./SideDrawer";
import BackDrop from "../UIElements/Backdrop";
import "./MainNavigation.css";

export const MainNavigation = props => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawer = () => {
    setDrawerIsOpen(!drawerIsOpen);
  };

  return (
    <>
      {drawerIsOpen && <BackDrop onClick={() => openDrawer()} />}

      <SideDrawer show={drawerIsOpen} onClick={openDrawer}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={() => openDrawer()}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};
