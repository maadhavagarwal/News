import React from 'react'
import {Form,Button} from  'react-bootstrap'
import FormContainer from '../FormContainer'
import Messages from '../messages'
import {useState} from 'react'
import {  useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  
  const [email,setEmail]=useState('');
const [Pass1,setPass1]=useState('');
const [message,setMessage]=useState('');
const [isAdmin, setIsAdmin] = useState("");
 
const submitHandler = async (e) => {
  e.preventDefault(); // Uncomment this line to prevent the default form submission behavior

  try {
    const response = await fetch("http://localhost:5000/api/auth/loginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({
        email: email,
        password: Pass1,
        isAdmin:isAdmin,
            
      }),
    });

    const jsonData = await response.json();
console.log(jsonData);
    if (!jsonData.success) {
      setMessage(jsonData.error); // Corrected typo here
    } else {
      localStorage.setItem("token", jsonData.authToken);
      localStorage.setItem("name", jsonData.name);
      localStorage.setItem("success", jsonData.success);
      localStorage.setItem("isAdmin", jsonData.isAdmin);   
            
      setMessage("Login Success");
      navigate("/");
      setEmail("");
      setPass1("");
      setIsAdmin("")
    }
  } catch (error) {
    setMessage(error.message); // Extract error message from caught error object
  }
};
  return (
     <>
   <FormContainer>
        <Form onSubmit={submitHandler}>
            <h1 className='text-centre'>Login </h1>
            {message && <Messages varient='sucess'>{message}</Messages>}
            <i className="fa-regular fa-envelope"></i>
            <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></Form.Control>
           </Form.Group>
          <i className="fa-regular fa-lock"></i>
          <Form.Group>
            <Form.Label>password</Form.Label>
            <Form.Control
              name="Pass1"
              type="text"
              placeholder="Password"
              value={Pass1}
              onChange={(e) => setPass1(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group>
          <Form.Check
    
    label="Are you a admin"
    checked={isAdmin} // Ensure that the checkbox state is controlled by the isAdmin state
    onChange={(e) => setIsAdmin(e.target.checked)} // Set isAdmin to true or false based on checkbox state
    feedbackType="invalid"
    id="isAdmin"
/>
</Form.Group>
          <Button className='mt-3' type='submit' variant='success'>login</Button>
        </Form>
    </FormContainer>
   </>
  )
}

export default Login