import React from "react";
import "../Contact/Contact.css";

export const Contact = () => {
  return (
    <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="contact-form p-5 shadow-lg rounded-4 bg-white">
              <h2 className="text-center mb-4 fw-bold" style={{ color: "#212529" }}>
                Get in Touch
              </h2>
              <p className="text-center text-muted mb-4">
                We'd love to hear from you! Fill out the form below and we'll get back to you soon.
              </p>
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control rounded-pill py-2 px-3 shadow-sm"
                      placeholder="First Name"
                      style={{
                        border: "1px solid #dee2e6",
                        transition: "0.3s",
                      }}
                      onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 8px rgba(0,123,255,0.4)")}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control rounded-pill py-2 px-3 shadow-sm"
                      placeholder="Last Name"
                      style={{
                        border: "1px solid #dee2e6",
                        transition: "0.3s",
                      }}
                      onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 8px rgba(0,123,255,0.4)")}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="email"
                      className="form-control rounded-pill py-2 px-3 shadow-sm"
                      placeholder="Email Address"
                      style={{
                        border: "1px solid #dee2e6",
                        transition: "0.3s",
                      }}
                      onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 8px rgba(0,123,255,0.4)")}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </div>
                  <div className="col-12">
                    <textarea
                      className="form-control rounded-4 py-3 px-3 shadow-sm"
                      rows="5"
                      placeholder="Your Message"
                      style={{
                        border: "1px solid #dee2e6",
                        transition: "0.3s",
                      }}
                      onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 8px rgba(0,123,255,0.4)")}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn w-100 py-3 fw-semibold"
                      type="submit"
                      style={{
                        background: "linear-gradient(90deg, #ff7b00, #ffb347)",
                        color: "#fff",
                        borderRadius: "50px",
                        transition: "0.3s",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.background =
                          "linear-gradient(90deg, #ff9a00, #ffc97d)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.background =
                          "linear-gradient(90deg, #ff7b00, #ffb347)")
                      }
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
