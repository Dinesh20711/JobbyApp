import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import {FaStar, FaSuitcase, FaExternalLinkAlt} from 'react-icons/fa'
import {IoLocation} from 'react-icons/io5'

class SpecificJobItem extends Component {
  state = {specificJob: {}, skills: [], companyDetails: {}, similarJobs: []}

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data.similar_jobs)
    if (response.ok === true) {
      this.setState({
        specificJob: data.job_details,
        skills: data.job_details.skills,
        companyDetails: data.job_details.life_at_company,
        similarJobs: data.similar_jobs,
      })
    }
  }

  render() {
    const {specificJob, skills, companyDetails, similarJobs} = this.state
    const {description, image_url} = companyDetails

    const {
      id,
      company_logo_url,
      company_website_url,
      employment_type,
      job_description,
      location,
      package_per_annum,
      rating,

      title,
    } = specificJob
    console.log(specificJob)

    return (
      <div className="specific-product-bg">
        <div className="job-items">
          <div className="job-items-container">
            <img
              src={company_logo_url}
              alt="website logo"
              className="job details company logo"
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
          <div className="description-company-website">
            <h1 className="description-heading">Description</h1>
            <div className="link-section">
              <a
                href={company_website_url}
                className="visit-page"
                id="websiteLink"
              >
                Visit
              </a>
              <FaExternalLinkAlt className="link-icon" htmlFor="websiteLink" />
            </div>
          </div>
          <p className="job-description">{job_description}</p>

          <ul className="skills-section-container">
            <h1 className="skills-heading">Skills</h1>
            <li className="skill-details">
              {skills.map(eachItem => (
                <li className="inner-skill-section" key={eachItem.name}>
                  <img
                    src={eachItem.image_url}
                    alt={eachItem.name}
                    className="skill-image"
                  />
                  <p className="skill-name">{eachItem.name}</p>
                </li>
              ))}
            </li>
          </ul>

          <ul className="life-at-company-section">
            <h1 className="life-at-heading">Life at Company</h1>
            <li className="life-at-company-container">
              <p>{description}</p>
              <img src={image_url} alt="life at company" />
            </li>
          </ul>

          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-container">
            {similarJobs.map(eachItem => (
              <li className="list-items" key={eachItem.id}>
                <div className="rating-section">
                  <img
                    src={eachItem.company_logo_url}
                    alt="similar job company logo"
                    className="company-logo-image"
                  />
                  <div>
                    <h1 className="job-title">{eachItem.title}</h1>
                    <div className="rating-container">
                      <FaStar className="star-icon" />
                      <p className="rating-value">{eachItem.rating}</p>
                    </div>
                  </div>
                </div>
                <div className="description-company-website">
                  <h1 className="description-heading">Description</h1>
                </div>
                <p className="job-description">{eachItem.job_description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SpecificJobItem
