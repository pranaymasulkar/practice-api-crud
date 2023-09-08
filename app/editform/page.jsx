"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

const page = () => {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const router = useRouter();

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleCity = (e) => {
    setCity(e.target.value);
  };

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setName(localStorage.getItem("name"));
    setCity(localStorage.getItem("city"));
  }, []);

  const handleUpdate = (e) => {
    axios
      .put(`https://64f9e7eb4098a7f2fc152712.mockapi.io/users/${id}`, {
        name: name,
        city: city,
      })
      .then(() => {
        toast.success("update Data Succsessfully.", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log("Added");
      })
      .then(() => {
        setTimeout(() => {
          router.push("/home");
        }, 3000);
      });
  };
  return (
    <>
      <section className="p-5 ">
        <Container className="pt-5">
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={7} lg={5}>
              <Form className="border p-3 rounded">
                <Form.Control
                  className="mb-4 text-capitalize"
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={handleName}
                />
                <Form.Control
                  className="mb-4 text-capitalize"
                  type="text"
                  placeholder="Enter City"
                  value={city}
                  onChange={handleCity}
                />
                <Button
                  variant="primary"
                  className="w-100"
                  onClick={handleUpdate}
                >
                  Submit
                </Button>
              </Form>
              <div className="mt-3 text-end">
                <Link href="/home">
                  <Button variant="info">Back</Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <ToastContainer />
    </>
  );
};

export default page;
