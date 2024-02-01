import React, { useState, useEffect } from "react";
import "./page.css";
import Modal from "react-modal";
import styled from "styled-components";
import axios from "axios";
import "./page.css";

const Button = styled.button``;

const CustomModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 10, 10, 12);
  background-color: lightblue;
`;

const Heading = styled.h3`
  color: #333;
`;

const InputContainer = styled.div`
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const ErrorMessage = styled.small`
  color: #ff0000;
  font-size: 12px;
`;

const FileInputLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #333;
`;

export const Courses = () => {
  const [data, setData] = useState([]); //for fetching data
  const [loading, setLoading] = useState(true); //for fetching data
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [courseTitle, setcourseTitle] = useState("");
  const [courseDescription, setcourseDescription] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const openEditModal = (course) => {
    setEditingCourse(course);
    setcourseTitle(course.courseTitle);
    setcourseDescription(course.courseDescription);
    setPrice(course.price);
    setThumbnail(null);
    setEditModalIsOpen(true);
  };
  const closeEditModal = () => {
    setEditingCourse(null);
    setEditModalIsOpen(false);
    setcourseTitle("");
    setcourseDescription("");
    setPrice("");
    setThumbnail(null);
    setError({
      courseTitleError: "",
      courseDescriptionError: "",
      priceError: "",
      thumbnailError: "",
    }); // Clear errors
  };

  const [error, setError] = useState({
    courseTitleError: "",
    courseDescriptionError: "",
    priceError: "",
    thumbnailError: "",
  });

  const appendFormData = () => {
    try {
      const data = {
        courseTitle: courseTitle,
        courseDescription: courseDescription,
        price: price,
      };

      const formData = new FormData();
      formData.append("course", JSON.stringify(data));
      formData.append("file", thumbnail);
      return formData;
    } catch (error) {
      console.error("Error serializing JSON data:", error);
      return null;
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const formData = appendFormData();
    try {
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const url = "http://localhost:8080/admin/courses/add";
      const response = await axios.post(url, formData, config);
      console.log("Successful response:", response);
      setcourseTitle("");
      setcourseDescription("");
      setPrice("");
      setThumbnail("");
      alert("Course added successfully");
      closeModal();
    } catch (err) {
      console.error("Error response:", err);
      console.error("Error response:", err.response);
      if (err.response.data === "Course name is already exist") {
        setError({ ...error, courseTitleError: err.response.data });
      }
    }
  };

  //this is code for delete the course

  const deleteCourse = async (courseId) => {
    try {
      const url = `http://localhost:8080/admin/courses/delete/${courseId}`;
      const response = await axios.delete(url);
      console.log("Successful response:", response);
      alert("Course deleted successfully");
      fetchData(); // Refresh the data after deleting a course
    } catch (err) {
      console.error("Error response:", err);
    }
  };

  //this code for retriving data form the api.....

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/admin/courses`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data);

      setLoading(false);
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
      setLoading(false);
    }
  };

  //this code for editing the course form

  const updateCourse = async (e) => {
    e.preventDefault();
    const formData = appendFormData();
    try {
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const url = `http://localhost:8080/admin/courses/update/${editingCourse.id}`;
      const response = await axios.post(url, formData, config);
      console.log("Successful response:", response);
      alert("Course updated successfully");
      closeEditModal();
      fetchData(); // Refresh the data after updating a course
    } catch (err) {
      console.error("Error response:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div>
        <CustomModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Add Course Modal"
        >
          <Container>
            <button onClick={closeModal}>X</button>
            <Heading>Add Course Here</Heading>
            <form onSubmit={submit}>
              <InputContainer>
                <div>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Course Name"
                    value={courseTitle}
                    onChange={(e) => setcourseTitle(e.target.value)}
                  />
                  <ErrorMessage>{error.courseTitleError}</ErrorMessage>
                </div>
                <div>
                  <div>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Course Description"
                      value={courseDescription}
                      onChange={(e) => setcourseDescription(e.target.value)}
                    />
                    <ErrorMessage>{error.courseDescriptionError}</ErrorMessage>
                  </div>
                </div>
              </InputContainer>
              <div className="">
                <Input
                  type="number"
                  className="form-control"
                  placeholder="Price in word"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <ErrorMessage>{error.priceError}</ErrorMessage>
              </div>
              <div className="">
                <FileInputLabel htmlFor="formFile" className="form-label">
                  Thumbnail
                </FileInputLabel>
                <Input
                  className="form-control"
                  type="file"
                  accept="image/jpg,image/jpeg,image/png,image/svg"
                  onChange={(e) => setThumbnail(e.target.files[0])}
                />
                <ErrorMessage>{error.thumbnailError}</ErrorMessage>
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </Container>
        </CustomModal>

        {/* Edit Course Modal */}
        <CustomModal
          isOpen={editModalIsOpen}
          onRequestClose={closeEditModal}
          contentLabel="Edit Course Modal"
        >
          <Container>
            <button onClick={closeEditModal}>X</button>
            <Heading>Edit Course Here</Heading>
            <form onSubmit={editingCourse ? updateCourse : submit}>
              <InputContainer>
                <div>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Course Name"
                    value={courseTitle}
                    onChange={(e) => setcourseTitle(e.target.value)}
                  />
                  <ErrorMessage>{error.courseTitleError}</ErrorMessage>
                </div>
                <div>
                  <div>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Course Description"
                      value={courseDescription}
                      onChange={(e) => setcourseDescription(e.target.value)}
                    />
                    <ErrorMessage>{error.courseDescriptionError}</ErrorMessage>
                  </div>
                </div>
              </InputContainer>
              <div className="">
                <Input
                  type="number"
                  className="form-control"
                  placeholder="Price in word"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <ErrorMessage>{error.priceError}</ErrorMessage>
              </div>
              <div className="">
                <FileInputLabel htmlFor="formFile" className="form-label">
                  Thumbnail
                </FileInputLabel>
                <Input
                  className="form-control"
                  type="file"
                  accept="image/jpg,image/jpeg,image/png,image/svg"
                  onChange={(e) => setThumbnail(e.target.files[0])}
                />
                <ErrorMessage>{error.thumbnailError}</ErrorMessage>
              </div>
              <Button type="submit">
                {editingCourse ? "Update" : "Submit"}
              </Button>
            </form>
          </Container>
        </CustomModal>
      </div>
      <div>
        <div className="courses">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <Button onClick={openModal}>AddCourse</Button>
              <h1>Table of database</h1>
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Course Name</th>
                    <th>CourseTitle</th>
                    <th>price</th>
                    <th>thumbnail</th>
                    <th>Operation</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from(data).map((course) => (
                    <tr key={course.id}>
                      <td>{course.id}</td>
                      <td>{course.courseTitle}</td>
                      <td>{course.courseDescription}</td>
                      <td>{course.price}</td>
                      <td>
                        {course.thumbnail && (
                          <img
                            style={{ height: "100px", width: "100px" }}
                            src={`http://localhost:8080${course.thumbnail}`}
                            alt="CourseImage"
                          />
                        )}
                      </td>
                      <td>
                        <button onClick={() => openEditModal(course)}>
                          Edit
                        </button>
                        <button onClick={() => deleteCourse(course.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
