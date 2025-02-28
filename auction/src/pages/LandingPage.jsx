import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

const LandingPage = () => {
  const [text, setText] = useState('');
  const fullText = 'Join the Excitement of Live Auctions!';
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText(prevText => prevText + fullText[index]);
        setIndex(prevIndex => prevIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });

    // Parallax effect
    const handleScroll = () => {
      const parallax = document.querySelector('.parallax-bg');
      if (parallax) {
        const scrolled = window.pageYOffset;
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Button = ({ children, className = '' }) => (
    <button className={`button ${className}`}>
      <span>{children}</span>
    </button>
  );

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(10px)'
      }}>
        <div className="container">
          <a href="#hero" className="navbar-brand">
            <i className="fas fa-gavel me-2"></i>
            BidVerse
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a href="#live-auctions" className="nav-link">
                  <i className="fas fa-clock me-1"></i>
                  Live Auctions
                </a>
              </li>
              <li className="nav-item">
                <a href="#features" className="nav-link">
                  <i className="fas fa-star me-1"></i>
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a href="#testimonials" className="nav-link">
                  <i className="fas fa-comment me-1"></i>
                  Testimonials
                </a>
              </li>
              <li className="nav-item">
                <a href="#contact" className="nav-link">
                  <i className="fas fa-envelope me-1"></i>
                  Contact
                </a>
              </li>
            </ul>
            <div className="d-flex gap-2">
              <Link to="/signin"><Button><i className="fas fa-sign-in-alt me-2"></i>Sign In</Button></Link>
              <Link to="/signup"><Button><i className="fas fa-user-plus me-2"></i>Sign Up</Button></Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="position-relative vh-100 d-flex align-items-center text-white overflow-hidden">
        <div className="parallax-bg position-absolute w-100 h-100" style={{
          backgroundImage: 'url("/api/placeholder/1920/1080")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1
        }}></div>
        <div className="position-absolute w-100 h-100" style={{
          background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7))',
          zIndex: -1
        }}></div>
        <div className="container text-center animate__animated animate__fadeIn">
          <h1 className="display-3 fw-bold mb-4">{text}</h1>
          <p className="lead mb-4">Discover unique items, exclusive deals, and a thrilling bidding experience.</p>
          <div className="d-flex justify-content-center gap-3">
            <Button><i className="fas fa-hammer me-2"></i>Start Bidding Now</Button>
            <Button><i className="fas fa-user-plus me-2"></i>Sign Up Today</Button>
          </div>
        </div>
      </section>

      {/* Live Auctions Section */}
      <section id="live-auctions" className="py-5">
        <div className="container">
          <h2 className="text-center mb-5"><i className="fas fa-gavel me-2"></i>Live Auctions</h2>
          <div className="row g-4 justify-content-center">
            {[
              { title: 'Vintage Watch', bid: 65, time: '25 minutes', image: 'https://via.placeholder.com/300', icon: 'fas fa-clock'},
              { title: 'Designer Handbag', bid: 120, time: '1 hour 45 minutes', image: 'https://via.placeholder.com/300', icon: 'fas fa-shopping-bag' },
              { title: 'Limited Edition Sneakers', bid: 200, time: '3 hours 10 minutes',  image: './assets/running-shoes-sneakers-transparent-background.png',icon: 'fas fa-shoe-prints' }
            ].map((auction, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="custom-card">
                  <img src={auction.image} alt={auction.title} className="img-fluid mb-3" style={{ borderRadius: '8px' }} />
                  <div className="card-content">
                    <p className="heading"><i className={`${auction.icon} me-2`}></i>{auction.title}</p>
                    <p><i className="fas fa-tag me-2"></i>Current Bid: ${auction.bid}</p>
                    <p><i className="fas fa-hourglass-half me-2"></i>Time Left: {auction.time}</p>
                    <Button><i className="fas fa-hand-point-up me-2"></i>Bid Now</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5 bg-dark text-white">
        <div className="container">
          <h2 className="text-center mb-5"><i className="fas fa-star me-2"></i>Why Choose Our Platform</h2>
          <div className="row g-4">
            {[
              { title: 'Real-Time Bidding', desc: 'Watch bids increase live and make your move at the perfect moment.', icon: 'fas fa-bolt' },
              { title: 'Safe & Secure', desc: 'Bid with confidence using our secure payment options.', icon: 'fas fa-shield-alt' },
              { title: 'Wide Range', desc: 'From antiques to technology, find something for every interest.', icon: 'fas fa-th-large' }
            ].map((feature, index) => (
              <div key={index} className="col-md-4">
                <div className="feature-card">
                  <div className="card-content">
                    <h4><i className={`${feature.icon} me-2`}></i>{feature.title}</h4>
                    <p>{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-5 position-relative overflow-hidden">
        <div className="parallax-bg position-absolute w-100 h-100" style={{
          backgroundImage: 'url("/api/placeholder/1920/1080")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1
        }}></div>
        <div className="position-absolute w-100 h-100" style={{
          background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7))',
          zIndex: -1
        }}></div>
        <div className="container position-relative z-index-1">
          <h2 className="text-center mb-5 text-white"><i className="fas fa-comment-dots me-2"></i>What Our Users Say</h2>
          <div className="row g-4">
            {[
              { name: 'John D.', text: "I've won several auctions here, and every experience has been smooth and fun.", icon: 'fas fa-trophy' },
              { name: 'Sarah T.', text: "A fantastic way to get rare items. The platform is easy to use, and I feel safe bidding here.", icon: 'fas fa-gem' },
              { name: 'Mike B.', text: "I was skeptical at first, but after winning my first auction, I'm hooked!", icon: 'fas fa-thumbs-up' }
            ].map((testimonial, index) => (
              <div key={index} className="col-md-4">
                <div className="testimonial-card animate__animated animate__fadeInUp">
                  <div className="testimonial-content">
                    <div className="testimonial-icon">
                      <i className={`${testimonial.icon} fa-2x`}></i>
                    </div>
                    <h5 className="testimonial-name">{testimonial.name}</h5>
                    <p className="testimonial-text">{testimonial.text}</p>
                    <div className="text-warning">
                      {'★'.repeat(5)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <h5><i className="fas fa-link me-2"></i>Quick Links</h5>
              <ul className="list-unstyled">
                <li><i className="fas fa-angle-right me-2"></i><Link to="/about" className="text-white text-decoration-none">About Us</Link></li>
                <li><i className="fas fa-angle-right me-2"></i><Link to="/how-it-works" className="text-white text-decoration-none">How It Works</Link></li>
                <li><i className="fas fa-angle-right me-2"></i><Link to="/faq" className="text-white text-decoration-none">FAQ</Link></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5><i className="fas fa-envelope me-2"></i>Contact</h5>
              <p><i className="fas fa-envelope me-2"></i>Email: support@auction.com<br />
                 <i className="fas fa-phone me-2"></i>Phone: +1 (800) 123-4567</p>
            </div>
            <div className="col-md-4">
              <h5><i className="fas fa-newspaper me-2"></i>Newsletter</h5>
              <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="Enter your email" />
                <button className="btn btn-primary"><i className="fas fa-paper-plane me-2"></i>Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <style>
  {`
    .landing-page {
      background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url("/api/placeholder/1920/1080");
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
    }

    .custom-card {
      position: relative;
      width: 100%;
      height: 400px;
      background-color: #000;
      display: flex;
      flex-direction: column;
      justify-content: end;
      padding: 20px;
      gap: 12px;
      border-radius: 8px;
      cursor: pointer;
      color: white;
    }

    .custom-card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .button {
      position: relative;
      text-decoration: none;
      color: #fff;
      background: linear-gradient(45deg, rgb(144, 203, 183), #69007f, #fc0987);
      padding: 14px 25px;
      border-radius: 10px;
      font-size: 1.25em;
      cursor: pointer;
      border: none;
    }

    .button span {
      position: relative;
      z-index: 1;
    }

    .button::before {
      content: "";
      position: absolute;
      inset: 1px;
      background: #272727;
      border-radius: 9px;
      transition: 0.5s;
    }

    .button:hover::before {
      opacity: 0.7;
    }

    .button::after {
      content: "";
      position: absolute;
      inset: 0px;
      background: linear-gradient(45deg, #0ce39a, #69007f, #fc0987);
      border-radius: 9px;
      transition: 0.5s;
      opacity: 0;
      filter: blur(20px);
    }

    .button:hover::after {
      opacity: 1;
    }

    .custom-card {
      position: relative;
      width: 100%;
      height: 320px;
      background-color: #000;
      display: flex;
      flex-direction: column;
      justify-content: end;
      padding: 20px;
      gap: 12px;
      border-radius: 8px;
      cursor: pointer;
      color: white;
    }

    .custom-card::before {
      content: '';
      position: absolute;
      inset: 0;
      left: -5px;
      margin: auto;
      width: calc(100% + 10px);
      height: calc(100% + 10px);
      border-radius: 10px;
      background: linear-gradient(-45deg, #e81cff 0%, #40c9ff 100%);
      z-index: -10;
      pointer-events: none;
      transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .custom-card::after {
      content: "";
      z-index: -1;
      position: absolute;
      inset: 0;
      background: linear-gradient(-45deg, #fc00ff 0%, #00dbde 100%);
      transform: translate3d(0, 0, 0) scale(0.95);
      filter: blur(20px);
    }

    .custom-card:hover::after {
      filter: blur(30px);
    }

    .custom-card:hover::before {
      transform: rotate(-90deg) scaleX(1.34) scaleY(0.77);
    }

    .feature-card {
      position: relative;
      width: 100%;
      height: 320px;
      background: mediumturquoise;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 15px;
      cursor: pointer;
      overflow: hidden;
    }

    .feature-card::before,
    .feature-card::after {
      position: absolute;
      content: "";
      width: 20%;
      height: 20%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 25px;
      font-weight: bold;
      background-color: lightblue;
      transition: all 0.5s;
    }

    .feature-card::before {
      top: 0;
      right: 0;
      border-radius: 0 15px 0 100%;
    }

    .feature-card::after {
      bottom: 0;
      left: 0;
      border-radius: 0 100% 0 15px;
    }

    .feature-card:hover::before,
    .feature-card:hover::after {
      width: 100%;
      height: 100%;
      border-radius: 15px;
      transition: all 0.5s;
    }

    .card-content {
      position: relative;
      z-index: 1;
      padding: 20px;
      text-align: center;
    }

    .heading {
      font-size: 24px;
      text-transform: capitalize;
      font-weight: 700;
      margin-bottom: 10px;
    }

    .navbar {
      transition: background 0.3s ease;
    }

    .navbar.scrolled {
      background: rgba(0,0,0,0.9) !important;
    }

    .nav-link {
      position: relative;
    }

    .nav-link::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: #fff;
      transition: width 0.3s ease;
    }

    .nav-link:hover::after {
      width: 100%;
    }
    
    /* New styles for testimonial cards with gradient border */
    .testimonial-card {
      position: relative;
      width: 100%;
      height: 320px;
      background-color: rgba(0, 0, 0, 0.8);
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 20px;
      gap: 12px;
      border-radius: 8px;
      cursor: pointer;
      color: white;
    }
    
    .testimonial-card::before {
      content: '';
      position: absolute;
      inset: 0;
      left: -5px;
      margin: auto;
      width: calc(100% + 10px);
      height: calc(100% + 10px);
      border-radius: 10px;
      background: linear-gradient(45deg, #0ce39a, #69007f, #fc0987);
      z-index: -10;
      pointer-events: none;
      transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .testimonial-card::after {
      content: "";
      z-index: -1;
      position: absolute;
      inset: 0;
      background: linear-gradient(45deg, #0ce39a, #69007f, #fc0987);
      transform: translate3d(0, 0, 0) scale(0.95);
      filter: blur(20px);
    }
    
    .testimonial-card:hover::after {
      filter: blur(30px);
    }
    
    .testimonial-card:hover::before {
      transform: rotate(-90deg) scaleX(1.34) scaleY(0.77);
    }
    
    .testimonial-content {
      position: relative;
      z-index: 1;
      padding: 20px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
    
    .testimonial-icon {
      margin-bottom: 15px;
      color: #fc0987;
    }
    
    .testimonial-name {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 15px;
    }
    
    .testimonial-text {
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 15px;
    }
  `}
</style>
    </div>
  );
};

export default LandingPage;