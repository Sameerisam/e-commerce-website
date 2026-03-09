


export default function Footer(){
    return <>
    
    <footer className="bg-dark text-light pt-5 pb-4">
  <div className="container">
    <div className="row">
      {/* Column 1 */}
      <div className="col-md-3 mb-4">
        <h5 className="text-uppercase mb-3">Information</h5>
        <ul className="list-unstyled">
          <li>
            <a href="#" className="text-light text-decoration-none">
              Shipping &amp; Returns
            </a>
          </li>
          <li>
            <a href="#" className="text-light text-decoration-none">
              Store Policy
            </a>
          </li>
          <li>
            <a href="#" className="text-light text-decoration-none">
              Payment Methods
            </a>
          </li>
        </ul>
      </div>
      {/* Column 2 */}
      <div className="col-md-3 mb-4">
        <h5 className="text-uppercase mb-3">Contact</h5>
        <p className="mb-1">Tel: +92 3217104112</p>
        <a
          href="mailto:info@mysite.com"
          className="text-light text-decoration-underline"
        >
          info@mysite.com
        </a>
      </div>
      {/* Column 3 */}
      <div className="col-md-3 mb-4">
        <h5 className="text-uppercase mb-3">Follow Us</h5>
        <ul className="list-unstyled">
          <li>
            <a
              href="https://facebook.com"
              target="_blank"
              className="text-light text-decoration-none"
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com"
              target="_blank"
              className="text-light text-decoration-none"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href="https://pinterest.com"
              target="_blank"
              className="text-light text-decoration-none"
            >
              Pinterest
            </a>
          </li>
        </ul>
      </div>
      {/* Column 4 */}
      <div className="col-md-3 mb-4">
        <h5 className="text-uppercase mb-3">Newsletter</h5>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="subscribeCheck"
              required
            />
            <label className="form-check-label" htmlFor="subscribeCheck">
              Yes, subscribe me to your newsletter.
            </label>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Subscribe Now
          </button>
        </form>
      </div>
    </div>
    <hr className="bg-light" />
    <div className="text-center">
      <p className="mb-0">
        © 2035 by MY. Powered and secured by
        <a
          href="https://wix.com"
          target="_blank"
          className="text-decoration-underline text-light"
        >
          Wix
        </a>
      </p>
    </div>
  </div>
</footer>
    </>
}