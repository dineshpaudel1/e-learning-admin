import React, { useState, useEffect } from "react";
import "./page.css";
import styled from "styled-components";

const CardContainer = styled.div`
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 40px;
  transition: transform 0.3s ease-in-out;
  float: right;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardHeader = styled.div`
  background-color: #f0f0f0;
  padding: 16px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;

const CardContent = styled.div`
  font-size: 50px;
  text-align: center;
`;

export const Dashboard = () => {
  const [data, setData] = useState([]); //for fetching data
  const itemCount = data.length;

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/admin/courses`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data);

      const thumbnail = await Promise.all(
        data.map(async (data) => {
          const thumbnailResponse = await data.get(
            `http://localhost:8080/admin/courses/${data.id}`
          );
          return { ...data, thumbnail: thumbnailResponse.data.url };
        })
      );
      setData(thumbnail);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  });
  return (
    <>
      <div className="dashboard">
        <CardContainer>
          <CardHeader>Total Courses</CardHeader>
          <CardContent>{itemCount}</CardContent>
          <button>View Details</button>
        </CardContainer>
        <CardContainer>
          <CardHeader>Total Tutor</CardHeader>
          <CardContent>{itemCount}</CardContent>
          <button>View Details</button>
        </CardContainer>
        <CardContainer>
          <CardHeader>Total Student</CardHeader>
          <CardContent>{itemCount}</CardContent>
          <button>View Details</button>
        </CardContainer>
      </div>
    </>
  );
};
