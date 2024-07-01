import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails

  return (
    <li className="similar-job-card">
      <div className="logo-title-container-card">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo-card"
        />
        <div className="title-rating-container-card">
          <h1 className="job-title-card">{title}</h1>
          <div className="rating-container-card">
            <AiFillStar className="star-icon-card" />
            <span className="rating-number-card">{rating}</span>
          </div>
        </div>
      </div>
      <h1 className="description-heading-card">Description</h1>
      <p className="job-description-card">{jobDescription}</p>
      <div className="location-package-container-card">
        <div className="icon-type-container-card">
          <IoLocationSharp className="type-icon" />
          <span className="type-text">{location}</span>
        </div>
        <div className="icon-type-container-card">
          <BsFillBriefcaseFill className="type-icon" />
          <span className="type-text">{employmentType}</span>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobCard