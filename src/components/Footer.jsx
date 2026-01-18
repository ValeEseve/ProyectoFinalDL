import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer bg-dark text-white mt-5">
      <div className="container py-5">
        <div className="row">
          {/* About Section */}
          <div className="col-md-4 mb-4">
            <h5 className="mb-3">PRINTSxPRINTS</h5>
            <p className="text-light">
              Discover unique art prints from talented artists around the world. 
              Transform your space with beautiful, high-quality artwork.
            </p>
            <div className="social-icons mt-3">
              <a href="#" className="text-white me-3" aria-label="Facebook">
                <i class="fa-brands fa-facebook"></i>
              </a>
              <a href="#" className="text-white me-3" aria-label="Instagram">
                <i class="fa-brands fa-square-instagram"></i>
              </a>
              <a href="#" className="text-white me-3" aria-label="X">
                <i class="fa-brands fa-square-x-twitter"></i>
              </a>
              <a href="#" className="text-white" aria-label="Pinterest">
                <i class="fa-brands fa-square-pinterest"></i>
              </a>
            </div>
          </div>


          <div className="col-md-2 mb-4">
            <h6 className="mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none footer-link text-white">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/prints" className="text-decoration-none footer-link text-white">
                  Prints
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/artists" className="text-decoration-none footer-link text-white">
                  Artists
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/cart" className="text-decoration-none footer-link text-white">
                  Cart
                </Link>
              </li>
            </ul>
          </div>


          <div className="col-md-3 mb-4">
            <h6 className="mb-3">Newsletter</h6>
            <p className="small">
              Subscribe to get special offers and updates.
            </p>
            <div className="input-group">
              <input 
                type="email" 
                className="form-control" 
                placeholder="Your email"
                aria-label="Email subscription"
              />
              <button className="btn btn-primary" type="button">
                Subscribe
              </button>
            </div>
          </div>
        </div>


        <hr className="border-secondary my-4" />
        
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="small mb-0">
              © {currentYear} PRINTSxPRINTS. Made with ❤️ by and for art lovers.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <a href="#" className="text-decoration-none small me-3 footer-link">
              Privacy Policy
            </a>
            <a href="#" className="text-decoration-none small me-3 footer-link">
              Terms of Service
            </a>
            <a href="#" className="text-decoration-none small footer-link">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;