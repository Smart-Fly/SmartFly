import React, { useState, useEffect, useRef } from "react";
import "./MyNavbar.css";
import AccountCircleSharpIcon from "@material-ui/icons/AccountCircleSharp";
import ExpandMoreSharpIcon from "@material-ui/icons/ExpandMoreSharp";
function MyNavbar() {
  return (
    <CostumNavbar>
      <CostumNavItem costumIcon={<AccountCircleSharpIcon fontSize="large" />}>
        <CostumDropdownMenu />
      </CostumNavItem>
    </CostumNavbar>
  );
}

function CostumDropdownMenu() {
  function CostumDropdownItem(props) {
    return (
      <button className="costumMenu-item">
        <span className="costumIcon-button">{props.costumLeftIcon}</span>
        {props.children}
        <span className="costumIcon-right">{props.costumRightIcon}</span>
      </button>
    );
  }

  return (
    <div className="costumDropdown">
      {/* <CostumDropdownItem>Login</CostumDropdownItem>
      <CostumDropdownItem costumLeftIcon={}>Login</CostumDropdownItem>
      <CostumDropdownItem>Login</CostumDropdownItem> */}
    </div>
  );
}

function CostumNavbar(props) {
  return (
    <nav className="costumNavbar">
      <ul className="costumNavbar-nav">{props.children}</ul>
    </nav>
  );
}

function CostumNavItem(props) {
  const [drop, setDrop] = useState(false);
  return (
    <>
      <li className="costumNavItem">
        <button onClick={() => setDrop(!drop)} className="costumIcon-button">
          {props.costumIcon}
        </button>

        {drop && props.children}
      </li>
      <li>
        <span className="costumLoginText">
          Log In
          {/* <i>
          <ExpandMoreSharpIcon />
        </i> */}
        </span>
      </li>
    </>
  );
}

export default MyNavbar;
