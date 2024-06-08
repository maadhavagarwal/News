import React, { useState,useEffect } from "react";
import CoursesContext from "./coursesContext";

const CoursesState = (props) => {
  const coursesInitial=[]
  const [courses, setCourses] = useState(coursesInitial);
  const[userdetail,setUserdetail]=useState(coursesInitial)
  const getNews = async () => {
    try {
      const response = await fetch("https://newsapi.org/v2/everything?q=tesla&from=2024-05-07&sortBy=publishedAt&apiKey=54aa4d61a86145c5bb234d41395f76d3");
      const jsn = await response.json();
  
      setCourses(jsn);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  
  // Assuming setCourses is a state update function provided by useState hook
  // This effect will run every time courses changes
  useEffect(() => {
    console.log(courses);
  }, [courses]); // Only re-run the effect if courses changes
  
   const getUserDetail = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/getUser", {
        method: "GET",
        headers: {
            "auth-token": localStorage.getItem('token')
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const jsonUserdata = await response.json();
    setUserdetail(jsonUserdata);
} catch (error) {
    console.error("Error fetching user details:", error);
}
  };

  return (
    <CoursesContext.Provider value={{ courses,  userdetail, getNews,   getUserDetail }}>
      {props.children}
    </CoursesContext.Provider>
  );
};

export default CoursesState;
