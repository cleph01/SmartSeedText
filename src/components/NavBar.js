import "../lib/css/nav-bar.scss";

function NavBar({ authUser }) {
    return (
        <div className="navbar-container">
            <div className="logo-wrapper">
                {/* <img className="logo" src={logo} alt="logo" /> */}
                Logo
            </div>
            <div className="navbar__body">
                <div className="nav__btn">
                    <a href="https://valleyroofingandsidinginc">Back</a>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
