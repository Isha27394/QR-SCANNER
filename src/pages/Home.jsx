import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="app">

      <nav className="navbar">

        <div className="logo">
          <img
            src="/logo.png.jpeg"
            alt="Hi-Tech Power Saver"
            style={{
              height: "75px",
              width: "auto",
              maxWidth: "220px",
              objectFit: "contain",
              display: "block"
            }}
          />
        </div>

        <div className="nav-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/add-installation">
            Add Installation
          </Link>

          <Link to="/records">
            Records
          </Link>

          <Link to="/scanner">
            Scan QR
          </Link>

        </div>

      </nav>

      <section className="hero">

        <div className="hero-content">

          <div className="badge">
            DEVICE INSTALLATION MANAGEMENT
          </div>

          <h1>
            Smart Installation
            <br />
            <span>QR Scanner System</span>
          </h1>

          <p>
            Store installation details securely and
            access complete device information instantly
            by scanning the QR code.
          </p>

          <div className="hero-buttons">

            <Link
              to="/add-installation"
              className="primary-btn"
            >
              + Add Installation
            </Link>

            <Link
              to="/scanner"
              className="secondary-btn"
            >
              ◉ Scan QR Code
            </Link>

          </div>

        </div>

      </section>

      <section className="features">

        <div className="feature-card">
          <div className="feature-icon">📝</div>
          <h3>Easy Entry</h3>
          <p>
            Add installation information quickly.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">▣</div>
          <h3>QR Generation</h3>
          <p>
            Every installation gets a unique QR code.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h3>Instant Scan</h3>
          <p>
            Scan and view complete device details.
          </p>
        </div>

      </section>

    </div>
  );
}

export default Home;