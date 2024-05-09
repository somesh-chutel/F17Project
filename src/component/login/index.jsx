import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css'


const Login = () => {

  const navigate = useNavigate();

  const token = Cookies.get("jwtToken");

    const [allValues,setValues] = useState({
        username:"",
        password:"",
        showErrorMsg:false,
        errorMsg:""
    });
    
    const onSubmitUserDetails = async(e)=>{
        e.preventDefault();

        

        const url = "https://apis.ccbp.in/login"

        const userDetails = {
            username: allValues.username,
            password: allValues.password
        }

        const option = {
            method: 'POST',
            body: JSON.stringify(userDetails)
        }

        const response = await fetch(url, option);

        const fetchData = await response.json()

        console.log(response);
        console.log(fetchData);

        if(response.ok===true){
          setValues({...allValues,showErrorMsg:false});
          navigate("/");
          Cookies.set("jwtToken",fetchData.jwt_token);
        }
        else{
          setValues({...allValues,showErrorMsg:true,errorMsg:fetchData.error_msg});
        }
    }


    const onChangeUserName = (e)=>{

        setValues({...allValues,username:e.target.value}) //----->{username,password}---->username:"",password:""--->update
    }

    const onChangePassword = (e)=>{

        setValues({...allValues,password:e.target.value})
    }

  useEffect(()=>{
    if(token !== undefined){
      navigate("/");
    }
  })

  return (
    <div className="login-cont">
      <form className="form-cont" onSubmit={onSubmitUserDetails}>
        <div className="img-cont">
          <img
            className="web-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={onChangeUserName}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={onChangePassword}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <br />
        {allValues.showErrorMsg?<p className='text-danger'>{allValues.errorMsg}</p> : null}
      </form>
    </div>
  );
};

export default Login;
