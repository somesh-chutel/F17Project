import Cookies from "js-cookie";
import { AiFillStar } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";

import Header from "../Header";
import SimilarJobCard from "../SimilarJobCard";
import "./index.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const JobItemDetails = () => {
  const [allValues, setValues] = useState({
    jobDetailsApiStatus: apiStatusConstants.initial,
    jobDetails: {},
    similarJobs: [],
  });

  const { id } = useParams();

  useEffect(() => {
    getJobItemDetails();
  }, []);

  const getCamelCasedData = (data) => {
    const jobDetails = data.job_details;

    const updatedJobDetails = {
      companyLogoUrl: jobDetails.company_logo_url,
      companyWebsiteUrl: jobDetails.company_website_url,
      employmentType: jobDetails.employment_type,
      jobDescription: jobDetails.job_description,
      location: jobDetails.location,
      rating: jobDetails.rating,
      title: jobDetails.title,
      packagePerAnnum: jobDetails.package_per_annum,
      skills: jobDetails.skills.map((eachSkill) => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      })),
      lifeAtCompnay: {
        description: jobDetails.life_at_company.description,
        imageUrl: jobDetails.life_at_company.image_url,
      },
    };

    const similarJobs = data.similar_jobs.map((eachJob) => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      rating: eachJob.rating,
      title: eachJob.title,
    }));

    return { updatedJobDetails, similarJobs };
  };

  const getJobItemDetails = async () => {
    setValues({
      ...allValues,
      jobDetailsApiStatus: apiStatusConstants.inProgress,
    });

    const jwtToken = Cookies.get("jwtToken");

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`;
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const response = await fetch(apiUrl, options);
    const data = await response.json();
    if (response.ok === true) {
      const { updatedJobDetails, similarJobs } = getCamelCasedData(data);

      setValues({
        ...allValues,
        jobDetails: updatedJobDetails,
        similarJobs,
        jobDetailsApiStatus: apiStatusConstants.success,
      });
    } else {
      setValues({
        ...allValues,
        jobDetailsApiStatus: apiStatusConstants.failure,
      });
    }
  };

  const renderLoaderView = () => (
    <div class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  );

  const renderApiFailureView = () => (
    <div className="jobs-api-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-api-failure-image"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={() => getJobItemDetails()}
      >
        Retry
      </button>
    </div>
  );

  const renderJobDetails = () => {
    const { jobDetails, similarJobs } = allValues;
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      rating,
      title,
      packagePerAnnum,
      companyWebsiteUrl,
      skills,
      lifeAtCompnay,
    } = jobDetails;

    return (
      <div className="job-details-content-container">
        <div className="job-details">
          <div className="logo-title-container-card">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
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
          <div className="location-package-container-card">
            <div className="icon-type-container-card">
              <IoLocationSharp className="type-icon" />
              <span className="type-text">{location}</span>
              <BsFillBriefcaseFill className="type-icon" />
              <span className="type-text">{employmentType}</span>
            </div>
            <p className="package-text">{packagePerAnnum}</p>
          </div>

          <hr className="separator" />
          <div className="description-visit-link-container">
            <h1 className="description-heading-card">Description</h1>
            <a href={companyWebsiteUrl} className="company-link">
              Visit
              <FiExternalLink className="external-link-logo" />
            </a>
          </div>
          <p className="job-description-card">{jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-list">
            {skills.map((eachSkill) => {
              const { imageUrl, name } = eachSkill;
              return (
                <li className="skill-item" key={name}>
                  <img src={imageUrl} alt={name} className="skill-image" />
                  <p className="skill-name">{name}</p>
                </li>
              );
            })}
          </ul>
          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="company-life-container">
            <p className="life-description">{lifeAtCompnay.description}</p>
            <img
              className="life-image"
              src={lifeAtCompnay.imageUrl}
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobs.map((eachJob) => (
            <SimilarJobCard key={eachJob.id} jobDetails={eachJob} />
          ))}
        </ul>
      </div>
    );
  };

  const renderJobDetailsPage = () => {
    const { jobDetailsApiStatus } = allValues;
    switch (jobDetailsApiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoaderView();
      case apiStatusConstants.success:
        return renderJobDetails();
      case apiStatusConstants.failure:
        return renderApiFailureView();
      default:
        return null;
    }
  };

  return (
    <div className="job-details-page">
      <Header />
      {renderJobDetailsPage()}
    </div>
  );
};

export default JobItemDetails;
