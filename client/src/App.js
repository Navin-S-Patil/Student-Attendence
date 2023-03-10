import "./App.css";
import styled from "styled-components";
import logo from "./img/school_logo.png";
import axios from "axios";
import { useEffect, useState } from "react";

const Background = styled.div`
  background-color: #5bc0f8;
  height: 100vh;
  width: 100vw;
`;

//flexbox
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  /* @media screen {
    @media (max-width: 600px) {
      flex-direction: column;
       
  } */

  @media screen and (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }

`;

//logo
const Logo = styled.img`
  height: 100px;
  width: 100px;
  padding: 1rem;
`;

const StudentCount = styled.div`
  font-size: 1.7rem;
  color: #ffffff;
  text-align: center;
  display: inline;
  padding: 1.5rem;
  font-family: "Inter", sans-serif;
  @media screen and (max-width: 700px) {
    padding: 1rem;
  }
`;

const FlexBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WelcomeMessage = styled.h1`
  font-size: 3rem;
  color: #ffffff;
  text-align: center;
  display: inline;
  padding: 1rem;
  font-family: "Handlee", "cursive";
  margin: 0.4rem;
  @media screen and (max-width: 700px) {
    padding: 0.5rem;
  }
`;

const Inputroll = styled.input`
  font-size: 1.8rem;
  color: #000;
  background-color: #ffc93c;
  text-align: center;
  padding: 1rem;
  font-family: "Irish Grover", "cursive";
  border: none;
  border-radius: 1.2rem;
  margin: 1rem 1rem;
  display: inline;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  font-size: 1.8rem;
  color: #000;
  background-color: #d9d9d9;
  text-align: center;
  padding: 1rem 3rem;
  font-family: "Irish Grover", "cursive";
  border: none;
  border-radius: 1.2rem;
  margin: 1.8rem 1rem;
  display: inline;
  cursor: pointer;
`;

const CheckTime = styled.div`
  font-size: 1.8rem;
  color: #ff0000;
  text-align: center;
  display: inline;
  padding: 1.5rem;
  font-family: "Itim", "cursive";
`;

function App() {
  const [student, setStudent] = useState({ rollNo: "", name: "" });
  const [error, setError] = useState("");
  const [studentCount, setStudentCount] = useState(0);

  const [redMessage, setRedMessage] = useState("");

  useEffect(() => {
    const fetchStudentCount = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/studentCount"
        );
        setStudentCount(data.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStudentCount();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStudent({ ...student, [name]: value });
  };

  const handleClick = async (event) => {
    event.preventDefault();
    const { rollNo, name } = student;

    if(rollNo === "" || name === ""){
      setRedMessage("Roll No. or Name can't be empty !!");
      return;
    }

    

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/attendence",
        { rollNo: rollNo, name: name },
        config
      );
      console.log(data);
      const mesg = data.message;
      const time = data.time;
      
      setStudent({ rollNo: "", name: "" });
      const { data: studentCount } = await axios.get(
        "http://localhost:5000/api/studentCount"
      );
      setStudentCount(studentCount.length);
      setRedMessage(() => {
        return `${mesg} ${time!=null ? " at "+ time : ""}`;
      });
      setTimeout(() => {
        setRedMessage("");
      }, 5000);
    } catch (error) {
      console.log(error);
      setRedMessage("Please Enter Valid Roll No. and Name");
    }
  };

  return (
    <Background>
      {/* NavBar */}
      <Flex>
        <Logo src={logo} />
        <StudentCount>Student Count : {studentCount}</StudentCount>
      </Flex>

      {/* Body */}
      <FlexBody>
        <WelcomeMessage>Hello Students</WelcomeMessage>
        <Flex>
          <Inputroll
            type="text"
            placeholder="Roll No."
            name="rollNo"
            onChange={handleChange}
            value={student.rollNo}
          />
          <Inputroll
            type="text"
            placeholder="Student Name"
            name="name"
            onChange={handleChange}
            value={student.name}
          />
        </Flex>
        <SubmitButton onClick={handleClick}>Submit</SubmitButton>
        <CheckTime>{redMessage}</CheckTime>
      </FlexBody>
    </Background>
  );
}

export default App;
