import React, { useState } from "react";
import { signupService } from "../service/service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [resume, setResume] = useState(null);
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Name is required";
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Email address is invalid";
        }
        break;
      case "phone":
        if (!value.trim()) {
          error = "Phone number is required";
        } else if (!/^\d{10}$/.test(value)) {
          error = "Phone number is invalid. It should be 10 digits.";
        }
        break;
      case "resume":
        if (!value) {
          error = "Resume file is required";
        } else {
          const fileType = value.type;
          const fileSize = value.size;

          if (fileType !== "application/pdf") {
            error = "Only PDF files are allowed";
          } else if (fileSize > 2 * 1024 * 1024) {
            error = "File size should not exceed 2 MB";
          }
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResume(file);

    const error = validateField("resume", file);
    setErrors((prevErrors) => ({
      ...prevErrors,
      resume: error,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    const resumeError = validateField("resume", resume);
    if (resumeError) newErrors.resume = resumeError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("resume", resume);

    try {
      await signupService(data);

      Swal.fire({
        title: "Success!",
        text: "Signup successful! Your resume has been uploaded.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/confirmation");
      });
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.error || "Something went wrong. Please try again later.";

      Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "OK",
      });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Form onSubmit={handleSubmit} encType="multipart/form-data" className="p-4 border rounded shadow-sm">
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
                placeholder="Enter your name"
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
                placeholder="Enter your email"
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPhone" className="mb-3">
              <Form.Label>Phone:</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone}
                placeholder="Enter your phone number"
              />
              <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formResume" className="mb-3">
              <Form.Label>Resume:</Form.Label>
              <Form.Control
                type="file"
                name="resume"
                onChange={handleFileChange}
                isInvalid={!!errors.resume}
              />
              <Form.Control.Feedback type="invalid">{errors.resume}</Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignupForm;
