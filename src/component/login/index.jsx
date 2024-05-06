import { useState } from 'react';
import './index.css'


const Login = () => {

    const [allValues,setValues] = useState({
        username:"",
        password:""
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

        console.log(fetchData);
    }


    const onChangeUserName = (e)=>{

        setValues({...allValues,username:e.target.value}) //----->{username,password}---->username:"",password:""--->update
    }

    const onChangePassword = (e)=>{

        setValues({...allValues,password:e.target.value})
    }



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
      </form>
    </div>
  );
};

export default Login;
