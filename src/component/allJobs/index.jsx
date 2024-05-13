import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Header from "../Header";
import DisplayAllJobs from "../displayAllJobs";
import FilterSection from "../filterSection";
import './index.css'

const AllJobs = ()=> {

    const token = Cookies.get("jwtToken");

    const [allValues,setValues] = useState({
        jobsList:[],
        searchInput:"",
        empType:[],
        sallryRange : ""
    });

    useEffect(()=>{

        const fetchJobsData = async()=>{

            console.log(allValues.empType);

            const url = `https://apis.ccbp.in/jobs?employment_type=${allValues.empType}&minimum_package=${allValues.sallryRange}&search=${allValues.searchInput}`;

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
    },[allValues.searchInput,allValues.empType])



    const onChangeSearchInput = (e)=>{
        if(e.key==="Enter"){

            setValues({...allValues,searchInput:e.target.value});

        }
        
    }

    const onChangeEmpType = (value,isCheked)=>{

        if(isCheked){

            setValues({...allValues,empType:[...allValues.empType,value]});

        }
        else{

            setValues({...allValues,empType:allValues.empType.filter(each=> each!==value)});

        }

    }

    return (

        <div>
            <Header/>
            <div className="filter-allJobs-cont">

                <div className="filter-cont">

                        <FilterSection empTypeChange = {onChangeEmpType}/>

                </div>

                <div className="display-all-jobs-cont">
                    
                    <input onKeyDown={onChangeSearchInput} type="search" className="form-control w-75"/>

                    <br />

                    <ul>

                        {allValues.jobsList.map(each=>
                            <DisplayAllJobs key={each.id} jobsData = {each}/>
                        )}

                    </ul>

                    
                </div>

            </div>

        </div>

    )
}




export default AllJobs;