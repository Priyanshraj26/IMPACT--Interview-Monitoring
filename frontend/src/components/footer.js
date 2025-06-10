import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

const FooterDisplay = () => {
  return (
    <MDBFooter bgColor='rgb(18, 18, 18)' className='text-center text-lg-start text-light'>

  <section className='mt-4 border-top border-secondary'>
    <MDBContainer className='text-center text-md-start mt-5'>
      <MDBRow className='mt-3'>
        <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
          <h5 className='text-uppercase fw-bold mb-4'>
            <img src="./logo.png" alt="Logo" style={{ width: '70px' }} />
            IMPACT
          </h5>
          <p>
          Interview Monitoring with Posture, Audio, and Confidence Tracking
          </p>
        </MDBCol>

        <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
          <h6 className='text-uppercase fw-bold mb-4'>Developed By</h6>
          <p className='text-white'> Maitri Gupta</p>
          <p className='text-white'> Priyansh Raj</p>
        </MDBCol>

        <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
          <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
          <p><a href='https://github.com/Priyanshraj26' className='text-white-50'>GitHub</a></p>
          <p><a href='https://www.reactbits.dev/' className='text-white-50'>Frontend</a></p>

        </MDBCol>

        <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
          <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
          <p>maitrigupta298@gmail.com</p>
          <p>26priyanshraj@gmail.com</p>

        </MDBCol>
      </MDBRow>
    </MDBContainer>
  </section>

  <div className='text-center p-4' style={{ backgroundColor: 'rgb(18, 18, 18)' }}>
    © 2025 IMPACT
  </div>
</MDBFooter>
    );
}

export default FooterDisplay;