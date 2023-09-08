"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

const page = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const router = useRouter();

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleCity = (e) => {
    setCity(e.target.value);
  };
  const handleSubmite = (e) => {
    axios
      .post(`https://64f9e7eb4098a7f2fc152712.mockapi.io/users`, {
        name: name,
        city: city,
        headers: {
          // Add any auth token here
          authorization: "your token comes here",
        },
      })
      .then(() => {
        toast.success("Added Data Succsessfully.", {
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
  useEffect(() => {});
  return (
    <>
      <section className="p-5 ">
        <div className="pt-5 text-center">
          <h2>Add New User</h2>
        </div>
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
                  onClick={handleSubmite}
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
