import React from "react";
import LogoAT from "../../assets/img/logo-auto-travel.png";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header
            className="container-fluid d-flex align-items-center justify-content-between"
            style={{ height: "145px", marginTop: "-15px", background: "rgb(108 108 109)" }}
        >
            <Link to="/">
                <div className="col-7" onClick={() => setPassageiro(false)}>
                    <div className="logo">
                        <img
                            src={LogoAT}
                            alt="Logo"
                            style={{ height: "100px" }}
                        />
                    </div>
                </div>
            </Link>
        </header>
    )
}
export default Header;