import React from "react";
import "./Header.css"

function Header(props) {
  return (
    <div className="Header p-3">
      <div className="container">
        <div className="row">
          <div className="col-md-1 col-3 p-0">
            <img
              className="github-logo"
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="github-logo"
            />
          </div>
          <div className="col-md-11 col-9 ">
            <h1>Repo Finder</h1>
            <p>view Github repositories for any user or organization</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
