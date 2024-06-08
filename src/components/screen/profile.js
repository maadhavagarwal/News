import React, { useContext, useEffect } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import coursesContext from "../context/coursesContext";
import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();
    const context = useContext(coursesContext);
    const { getUserDetail, enrollCourses, userdetail, getCoursesEnrollments, getCourses } = context;

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (localStorage.getItem("token")) {
                    await getUserDetail();
                    await getCoursesEnrollments();
                    await getCourses();
                } else {
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <Container>
                <br />
            </Container>
            <Row>
                <Col md={3}>
                    <h3 className="bg-success text-white text-center">PERSONAL DETAILS</h3>
                    <Table responsive="sm">
                        <tr className="bg-primary text-white">
                            <th>Name</th>
                            <td>{userdetail.name}</td>
                        </tr>
                        <tr className="bg-primary text-white">
                            <th>Email</th>
                            <td>{userdetail.email}</td>
                        </tr>
                        <tr className="bg-primary text-white">
                            <th>Phone Number</th>
                            <td>{userdetail.mobile}</td>
                        </tr>
                    </Table>
                </Col>
               
            </Row>
        </>
    );
}

export default Profile;
