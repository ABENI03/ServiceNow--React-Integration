import {Link} from "react-router-dom";

const NavBar = () => {
    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
            <Link className="navbar-brand" to='/'>Dengene Custome Servicenow</Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-item nav-link active" to={'/'}>Home</Link>

                </div>
                <div className="navbar-nav">
                    <Link className="nav-item nav-link active" to={'/new'}>CreateNew  </Link>

                </div>
            </div>
        </nav>
    );
}

export default NavBar;