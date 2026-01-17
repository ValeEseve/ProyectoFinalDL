import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Logo</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link to={"/"}>Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link to={"/prints"}>Prints</Link>
                            </li>
                            <li class="nav-item">
                                <Link to={"/artists"}>Artists</Link>
                            </li>
                            <li class="nav-item">
                                <Link to={"/login"}>Login</Link>
                            </li>
                            <li class="nav-item">
                                <Link to={"/register"}>Register</Link>
                            </li>
                            <li class="nav-item">
                                <Link to={"/cart"}>Carrito</Link>
                            </li>
                        </ul>
                        {/* <form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form> */}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
