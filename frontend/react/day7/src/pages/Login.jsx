import React, { useState } from "react";

const Login = () => {

  const [val, setVal] = useState(0);

  const [show, setShow] = useState("")


  const formHandle = (e) => {
    setVal(e.target.value)
  };

  const handleClick = (e)=> {
    e.preventDefault()  
    if(val% 2 === 0) {
        setShow(val)
    }
  }


  return (
    <div>
      <div>
        <h1>this is form</h1>
        <form>
          <input type="text" onChange={formHandle} placeholder="enter name" className=" border-2" />
          <button onClick={handleClick} className="bg-amber-200">submit</button>
          <p >{show} is even</p>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
