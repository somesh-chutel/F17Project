import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css'
import { useEffect } from 'react';




const JobsitemDetails = ()=>{

    const {id} = useParams();

    const token = Cookies.get("jwtToken")

    useEffect(()=>{

        const fetchJobsDetails = ()=>{

            const url = `https://apis.ccbp.in/jobs/${id}`

            const options = {
                method: 'GET',
                headers : {
                    Authorization : `Bearer ${token}`
                }
              }

        }

        fetchJobsDetails;


    },[])


    return(
        <>

        <h1>Jobs Items Details</h1>

        <h1>{id}</h1>

        </>
    )
}


export default JobsitemDetails;