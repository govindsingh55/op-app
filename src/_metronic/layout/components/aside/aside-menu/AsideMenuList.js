/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu &&
          "menu-item-active custom-menu-item-ative active"} menu-item-open menu-item-not-hightlighted`
      : "";
  };

  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        {/* <li
          className={`menu-item ${getMenuItemActive("/dashboard", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/dashboard">
            <span
              className="svg-icon menu-icon"
              style={{ color: "red !important" }}
            >
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span>Dashboard</span>
          </NavLink>
        </li> */}
        {/*end::1 Level*/}

        <li
          className={`custom-menu-item ${getMenuItemActive(
            "/dashboard",
            false
          )}`}
        >
          <NavLink to="/dashboard">
            <span>
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li
          className={`custom-menu-item ${getMenuItemActive(
            "/user-profile",
            false
          )}`}
        >
          <NavLink to="/user-profile">
            <span>
              <SVG
                src={toAbsoluteUrl(
                  "/media/svg/icons/Communication/Add-user.svg"
                )}
              />
            </span>
            <span>User Profile</span>
          </NavLink>
        </li>

        {/*begin::1 Level*/}
        {/* <li
          className={`menu-item ${getMenuItemActive("/user-profile", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/user-profile">
            <span className="svg-icon menu-icon">
              <SVG
                src={toAbsoluteUrl(
                  "/media/svg/icons/Communication/Add-user.svg"
                )}
              />
            </span>
            <span>User Profile</span>
          </NavLink>
        </li> */}
        {/*end::1 Level*/}
      </ul>

      {/* end::Menu Nav */}
    </>
  );
}
