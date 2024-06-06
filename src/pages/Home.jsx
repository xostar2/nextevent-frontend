import BackgroundImage from "../components/BackgroundImage"
import "../styles/Home.css"
import { Link } from "react-router-dom"
const Home = () => {
  return (
    <>
      <main>
          <section className="section-hero-home">
              <div className="container-grid-grid-two-cols-home">
                <div className="hero-content-home">
                  <p>We are the Worlds Best Event Management Company</p>
                  <h1>Welcome to NexEvent</h1>
                  <p>
                  Welcome to <span id="NexEvent-title-name">NexEvent</span>! We offer innovative solutions for all your event management needs. Experience the future of event planning with our user-friendly platform. Join us and let's create memorable events together!

                  </p>
                  <div className="btn-btn-group-home">
                    <Link to="/contact">
                      <button className="btn-btn-home">
                        connect now
                      </button>
                    </Link>
                    <Link to="/about">
                      <button className="btn-btn-home" >
                        leran more
                      </button>
                    </Link>
                  </div>
                </div>
                {/* hero images */}

                <div className="hero-image-home">
                  <img src="/images/home.png" alt="Great to have you here" width="400" height="400" />
                </div>
              </div>
          </section>

      </main>
    </>
  )
}

export default Home
