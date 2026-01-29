import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import "./Navbar.css"

const Navbar = () => {
    const { getTotalItems } = useCart();
    const { token, logout, profileImgUrl } = useContext(UserContext)


    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">PRINTSxPRINTS</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 g-4">
                        <li className="nav-item">
                            <Link to={"/"}> <button className='btn btn-secondary'>Home</button> </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/prints"}><button className='btn btn-secondary'>Prints</button></Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/artists"}><button className='btn btn-secondary'>Artists</button></Link>
                        </li>

                        <li className="nav-item">
                            {token ? (
                                <button
                                    onClick={logout}
                                    className="btn btn-primary"
                                    type="button"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link to="/register" className="btn btn-primary">
                                    Register
                                </Link>
                            )}
                        </li>

                        <li className="nav-item">
                            <Link to={token ? "/profile" : "/login"}
                                className="btn btn-success nav-login-btn" >
                                {token ? (
                                    <div className="nav-avatar">
                                        <img
                                            className="nav-avatar__img"
                                            src={profileImgUrl}
                                            alt="Profile"
                                        />
                                        <li className="nav-item nav-avatar-dropdown">
                                            <div className="nav-avatar-trigger">
                                                <div className="nav-avatar">
                                                    <img
                                                        className="nav-avatar__img"
                                                        src={profileImgUrl}
                                                        alt="Profile"
                                                    />
                                                </div>
                                            </div>

                                            <div className="nav-avatar-menu">
                                                <Link to="/profile">Profile</Link>
                                                <Link to="/profile/settings">Settings</Link>
                                                <button onClick={logout}>Logout</button>
                                            </div>
                                        </li>

                                    </div>
                                ) : (
                                    "Login"
                                )}
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/cart"}><button className='btn btn-warning'><i className="fa-solid fa-cart-shopping"></i> <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info">
                                {getTotalItems()}
                            </span> </button></Link>
                        </li>
                    </ul>
                    {/* <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form> */}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
