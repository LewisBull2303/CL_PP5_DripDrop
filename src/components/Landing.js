import React from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import HomeImage from "../assets/home-page-image.jpg";
import styles from "../styles/Landing.module.css";
import appStyles from "../App.module.css";

/*
  Landing page with app description and links to social media in footer
*/
const Landing = () => {
    return (
      <>
        <Row className="text-center">
          <Col sm={12}>
            <Container>
              <Card>
                <Card.Body>
                  <Card.Title>
                    <h1 className="mb-4">DripDrop - Get started</h1>
                  </Card.Title>
                  <Card.Text className="font-weight-bold">
                    DripDrop is a Fashion Photo Sharing Website. If you’re looking for
                    an inspiration for your next outfit, you’re in the right place.
                    <br />
                    <br />
                    Join our community!
                  </Card.Text>
                </Card.Body>
                <img
                  src={HomeImage}
                  className={styles.HomeImage}
                  alt="3 Women in stylish clothes"
                />
                <Card.Body>
                  <Link to="/signup">
                    <Button
                      className={`${appStyles.button} ${styles.LandingButtonMargin} mb-3`}
                    >
                      Sign Up!
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button className={`${appStyles.button} mb-3`}>
                      I’m already a member, log me in!
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Container>
          </Col>
        </Row>
        <Container>
          <footer className={styles.footer}>
            <div className="float-left">
              <p>Created by Lewis Bull.</p>
            </div>
  
            <div className="float-right pb-3">
              <a
                href="https://github.com/LewisBull2303/CL_PP5_DripDrop"
                aria-label="Check the website GitHub page"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github" />
              </a>
              <a
                href="linkedin.com/in/lewis-bull-3a465a229"
                aria-label="Visit me on LinkedIn (opens in new tab)"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin" />
              </a>
            </div>
          </footer>
        </Container>
      </>
    );
  };
  
  export default Landing;