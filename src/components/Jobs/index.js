import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'

import {FaSearch} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import JobItemDetails from '../JobItemDetails'
import Header from '../Header'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatus = {
  initial: 'INITIAL',
  inProcess: 'INPROCESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    profileItems: {},
    jobsList: [],
    selectedEmploymentTypeIds: [],
    activeSalaryRange: salaryRangesList[0].salaryRangeId,
    searchInput: '',
    apiStatusResponse: apiStatus.initial,
  }

  componentDidMount() {
    this.getProfile()
    this.getJobitems()
  }

  getProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.setState({
        profileItems: data.profile_details,
        apiStatusResponse: apiStatus.success,
      })
    } else {
      this.setState({apiStatusResponse: apiStatus.failure})
    }
  }

  getJobitems = async () => {
    const {
      selectedEmploymentTypeIds,
      activeSalaryRange,
      searchInput,
    } = this.state
    const employmentTypeQuery = selectedEmploymentTypeIds.join(',')

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeQuery}&minimum_package=${activeSalaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      if (data.jobs.length === 0) {
        this.setState({jobsList: [], apiStatusResponse: apiStatus.inProcess})
      } else {
        this.setState({
          jobsList: data.jobs,
          apiStatusResponse: apiStatus.success,
        })
      }
    } else {
      this.setState({apiStatusResponse: apiStatus.failure})
    }
  }

  onClickEmployementTypeId = event => {
    const {id, checked} = event.target
    this.setState(prevState => {
      const {selectedEmploymentTypeIds} = prevState
      if (checked) {
        return {
          selectedEmploymentTypeIds: [...selectedEmploymentTypeIds, id],
        }
      }

      return {
        selectedEmploymentTypeIds: selectedEmploymentTypeIds.filter(
          typeId => typeId !== id,
        ),
      }
    }, this.getJobitems)
  }

  onClickSalaryRangeId = event => {
    if (event.target.checked) {
      this.setState({activeSalaryRange: event.target.id}, () => {
        this.getJobitems()
      })
    } else {
      this.setState(
        {activeSalaryRange: salaryRangesList[0].salaryRangeId},
        () => {
          this.getJobitems()
        },
      )
    }
  }

  onChangeSearchInput = () => {
    const searchInputElement = document.getElementById('search')
    this.setState({searchInput: searchInputElement.value}, () => {
      this.getJobitems()
    })
  }

  onClickRetry = () => {
    this.getProfile()
    this.getJobitems()
  }

  renderFailureView = () => (
    <div className="failure-view-section">
      <button onClick={this.onClickRetry}>Retry</button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {profileItems} = this.state
    const {name, profile_image_url, short_bio} = profileItems
    return (
      <div className="profile-bg">
        <img className="profile-image" src={profile_image_url} alt="profile" />
        <h1 className="name-section">{name}</h1>
        <p className="bio-description">{short_bio}</p>
      </div>
    )
  }

  renderNoJobs = () => (
    <div className="no-jobs-section">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  renderJobFailureView = () => (
    <div className="failure-view-section">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button className="retry-btn" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderAllViewSection = () => {
    const {apiStatusResponse} = this.state
    switch (apiStatusResponse) {
      case apiStatus.success:
        return this.renderSuccessView()
      case apiStatus.failure:
        return this.renderFailureView()
      case apiStatus.initial:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderAllJobListView = () => {
    const {apiStatusResponse} = this.state
    switch (apiStatusResponse) {
      case apiStatus.success:
        return this.renderJoblistViewSection()
      case apiStatus.initial:
        return this.renderLoader()
      case apiStatus.inProcess:
        return this.renderNoJobs()
      case apiStatus.failure:
        return this.renderJobFailureView()
      default:
        return null
    }
  }

  renderJoblistViewSection = () => {
    const {jobsList} = this.state
    return (
      <ul>
        {jobsList.map(eachItem => (
          <JobItemDetails jobDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="side-bar">
            {this.renderAllViewSection()}
            <hr className="line-section1" />
            <ul className="sorting-section">
              <p>Types of Employment</p>
              {employmentTypesList.map(eachItem => (
                <li
                  key={eachItem.employmentTypeId}
                  className="checkbox-container1"
                >
                  <input
                    type="checkbox"
                    id={eachItem.employmentTypeId}
                    onChange={this.onClickEmployementTypeId}
                  />
                  <label
                    htmlFor={eachItem.employmentTypeId}
                    key={eachItem.label}
                  >
                    {eachItem.label}
                  </label>
                </li>
              ))}
              <hr className="line-section" />

              <h1>Salary Range</h1>
              {salaryRangesList.map(eachItem => (
                <li key={eachItem.salaryRangeId} className="checkbox-container">
                  <input
                    onChange={this.onClickSalaryRangeId}
                    type="checkbox"
                    id={eachItem.salaryRangeId}
                  />
                  <label htmlFor={eachItem.salaryRangeId} key={eachItem.label}>
                    {eachItem.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="job-list-section">
            <div className="search-box">
              <input
                id="search"
                type="search"
                className="input-section"
                placeholder="search"
              />
              <button
                data-testid="searchButton"
                onClick={this.onChangeSearchInput}
                className="search-btn"
              >
                <FaSearch />
              </button>
            </div>
            {this.renderAllJobListView()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
