import React from 'react';
import { Navbar } from "../components";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-5 py-3">
        <h1 className="text-center">About Us</h1>
        <hr />
        <div className="text-center">
          <h2 className="mb-4" style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>Project Members</h2>
          <ul className="list-unstyled">
            <li style={{ fontSize: '1.3rem' }}>Mohammed Zaid Kadanthodi</li>
            <li style={{ fontSize: '1.3rem' }}>Pratham M Battawale</li>
          </ul>
        </div>
        <hr className="my-4" />
        <div className="text-center">
          <h2 className="mb-4" style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>Supervisor</h2>
          <ul className="list-unstyled">
            <li style={{ fontSize: '1.3rem' }}>Prof. Christopher Uzhuthuval</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default AboutPage;

