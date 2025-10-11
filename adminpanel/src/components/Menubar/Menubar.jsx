import React from "react";

const Menubar = ({ toggleSidebar }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom shadow-sm py-2">
      <div className="container-fluid">

        {/* Mobile Toggler */}
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={toggleSidebar}
          id="sidebarToggle"
          style={{ borderRadius: "0.5rem", transition: "0.3s" }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#e0f0ff")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
};

export default Menubar;
