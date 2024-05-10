import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Header from "../Header";
import DisplayAllJobs from "../displayAllJobs";
import FilterSection from "../filterSection";
import './index.css'

const AllJobs = ()=> {

    const token = Cookies.get("jwtToken");

    const [allValues,setValues] = useState({
        jobsList:[]
    });

    useEffect(()=>{

        const fetchJobsData = async()=>{

            const url = "https://apis.ccbp.in/jobs";

            const options = {
                method: 'GET',
                headers : {
                    Authorization : `Bearer ${token}`
                }
              }

              const response = await fetch(url,options);
              const jobsData = await response.json();

              if(response.ok===true){
                setValues({...allValues,jobsList:jobsData.jobs});
              }

        }

        fetchJobsData();
    },[])

    return (

        <div>
            <Header/>
            <div className="filter-allJobs-cont">

                <div className="filter-cont">

                        <FilterSection/>

                </div>

                <div className="display-all-jobs-cont">

                    <DisplayAllJobs/>
                </div>

            </div>

        </div>

    )
}




export default AllJobs;