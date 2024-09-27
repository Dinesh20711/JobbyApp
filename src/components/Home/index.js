import './index.css'
import {withRouter, Link} from 'react-router-dom'
import Header from '../Header'

const Home = props => (
  <div className="Home-bg-container">
    <Header />
    <div className="home-content-container">
      <div className="home-content-section">
        <h1 className="home-page-heading">
          Find The Job That <br /> Fits Your Life
        </h1>
        <p className="home-page-description">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button className="find-job-btn">Find Jobs</button>
        </Link>
      </div>
    </div>
  </div>
)

export default withRouter(Home)
