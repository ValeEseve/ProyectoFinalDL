import React from 'react'
import placeholderimage from "../assets/img/dummy_1500x400_ffffff_cccccc.png"
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <div id="carouselHero" className="carousel slide carousel-fade " data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselHero" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselHero" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselHero" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <Link to={"/prints"}><img src={placeholderimage} className="d-block w-100 h-50" alt="First slide image"/></Link>
              <div className="carousel-caption d-none d-md-block">
                <h2>Your art collection starts here</h2>
                <p>Buy and sell art prints to other fellow artists</p>
              </div>
          </div>
          <div className="carousel-item">
            <Link to={"/artists"}><img src={placeholderimage} className="d-block w-100 h-50" alt="Second slide image"/></Link>
              <div className="carousel-caption d-none d-md-block">
                <h2>Take a look of our beloved artists</h2>
                <p>We have amazing art waiting to be hanged in your wall</p>
              </div>
          </div>
          <div className="carousel-item">
            <Link to={"/register"}><img src={placeholderimage} className="d-block w-100 h-50" alt="Third slide image"/></Link>
              <div className="carousel-caption d-none d-md-block">
                <h2>Start selling here!</h2>
                <Link to={"/register"}><button className='btn btn-primary'>Register your artist account</button></Link>
              </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselHero" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselHero" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  )
}

export default Header
