"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

const page = () => {
  const [alldata, setAlldata] = useState([]);

  const getData = () => {
    axios
      .get(`https://64f9e7eb4098a7f2fc152712.mockapi.io/users`)
      .then((res) => {
        const row = res.data;
        setAlldata(row);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`https://64f9e7eb4098a7f2fc152712.mockapi.io/users/${id}`)
      .then(() => {
        getData();
        toast.success("Delete Data Succsesfully", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  const handleEdit = (id, name, city) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("city", city);
  };
  return (
    <div>
      <section className="p-5">
        <Container>
          <Row>
            <Col className="text-center">
              <h1>All User Data</h1>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="">
        <Container className="pb-5">
          <Row className="d-flex justify-content-center align-items-center">
            <Col lg={8}>
              <Table striped bordered hover className="text-capitalize">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>City</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {alldata.map((items, index) => {
                    return (
                      <>
                        <tr>
                          <td>{index}</td>
                          <td>{items.name}</td>
                          <td>{items.city}</td>
                          <td className="text-center">
                            <Link href="/editform">
                              <Button
                                variant="primary"
                                size="sm"
                                className="me-3"
                                onClick={() => {
                                  handleEdit(items.id, items.name, items.city);
                                }}
                              >
                                Edit
                              </Button>
                            </Link>
                            <Button
                              variant="danger"
                              size="sm"
                              className="me-3"
                              onClick={() => {
                                handleDelete(items.id);
                              }}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </Table>
              <div className="text-end">
                <Link href="/addform">
                  <Button variant="info">Add New User</Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <ToastContainer />
    </div>
  );
};

export default page;
