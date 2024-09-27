import './index.css'
import {FaStar, FaSuitcase} from 'react-icons/fa'
import {IoLocation} from 'react-icons/io5'
import {Link} from 'react-router-dom'

const JobItemDetails = props => {
  const {jobDetails} = props
  console.log(jobDetails)
  const {
    company_logo_url,
    employment_type,
    id,
    job_description,
    location,
    package_per_annum,
    rating,
    title,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="link-items">
      <li className="job-items">
        <div className="job-items-container">
          <img
            src={company_logo_url}
            alt="job details company logo"
            className="company-logo-image"
          />
          <div>
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <FaStar className="star-icon" />
              <p className="rating-value">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-type-container">
          <div className="location-and-employment">
            <div className="location-container">
              <IoLocation className="location-section " />
              <p className="location-section ">{location}</p>
            </div>
            <div className="location-container">
              <FaSuitcase className="location-section " />
              <p className="location-section ">{employment_type}</p>
            </div>
          </div>
          <p className="location-section">{package_per_annum}</p>
        </div>
        <hr className="line-section1" />
        <h1 className="description-heading">Description</h1>

        <p className="job-description">{job_description}</p>
      </li>
    </Link>
  )
}

export default JobItemDetails
