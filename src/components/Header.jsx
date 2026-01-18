import placeholderimage from "../assets/img/dummy_1500x400_ffffff_cccccc.png"
import hero1 from "../assets/img/hero1.jpg"
import hero2 from "../assets/img/hero2.jpeg"
import hero3 from "../assets/img/hero3.jpeg"
import { Link } from 'react-router-dom'
import "./Header.css"

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
            <Link to={"/prints"}><img src={hero2} className="d-block w-100 h-50 hero-image" alt="First slide image"/></Link>
              <div className="carousel-caption d-none d-md-block">
                <h1>Your art collection starts here</h1>
                <h4>Buy and sell art prints to other fellow artists</h4>
              </div>
          </div>
          <div className="carousel-item">
            <Link to={"/artists"}><img src={hero1} className="d-block w-100 h-50 hero-image" alt="Second slide image"/></Link>
              <div className="carousel-caption d-none d-md-block">
                <h2>Take a look of our beloved artists</h2>
                <h4>We have amazing art waiting to be hanged in your wall</h4>
              </div>
          </div>
          <div className="carousel-item">
            <Link to={"/register"}><img src={hero3} className="d-block w-100 h-50 hero-image" alt="Third slide image"/></Link>
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
