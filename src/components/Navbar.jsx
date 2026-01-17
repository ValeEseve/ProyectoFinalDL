import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Logo</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={"/"}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/prints"}>Prints</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/artists"}>Artists</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/login"}>Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/register"}>Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/cart"}>Carrito</Link>
                            </li>
                        </ul>
                        {/* <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form> */}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
