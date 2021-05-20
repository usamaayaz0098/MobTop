import React from "react";
import { Col, Container, Row, Footer } from "mdbreact";
import LaptopIcon from "@material-ui/icons/Laptop";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import TabIcon from "@material-ui/icons/Tab";
import HeadsetIcon from "@material-ui/icons/Headset";
import VideogameAssetIcon from "@material-ui/icons/VideogameAsset";
import { Button } from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import PermContactCalendarOutlinedIcon from "@material-ui/icons/PermContactCalendarOutlined";
export class FooterPage extends React.Component {
  render() {
    return (
      <Footer
        style={{ backgroundColor: " gray" }}
        className="page-footer font-small pt-4 mt-4"
      >
        <Container className="text-left">
          <Row>
            <Col md="6">
              <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">
                How <b style={{ color: "Black" }}>MobTop</b> Transformed Online
                Shopping of Electro-Tech
              </h5>
              <h5>Associate Linked with Al-HAFEEZ_CENTER</h5>
              <p>
                The growing world of technology has impacted our lives in many
                aspects, one of which is the way we conduct business. The
                invention of e-commerce introduced a whole new style of shopping
                to businessmen and shoppers all around the world. For the
                everyday shopper, online shopping is a means to save time and
                money as they can access all the items a shop has to offer with
                the click of a button, whilst being able to find the best deal
                by scouring the internet for all related retailers. Due to this
                very reason retail e-commerce sales have approximately increased
                three folds in the past six years . Another reason the
                e-commerce industry is expanding greatly is due to the
                advantages business owners have from it. Business owners have a
                greater customer reach due to online shopping. There has been a
                significant amount of mobile conversion of business as
                e-commerce reduces the need for a physical store, hence reducing
                the cost of employees and other bills.
              </p>
              <hr></hr>
              <h6 style={{ color: "Black" }}>Give Us FeedBack</h6>
              <Row>
                <input
                  placeholder="FeedBack"
                  style={{ marginLeft: "14px" }}
                ></input>

                <button
                  onClick="#"
                  type="button"
                  class="btn btn-secondary"
                  style={{ marginLeft: "10px" }}
                >
                  Submit
                </button>
              </Row>
            </Col>
            <hr className="clearfix w-100 d-md-none" />
            <Col md="2"></Col>
            <hr className="clearfix w-100 d-md-none" />
            <Col md="2">
              <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">
                Products
              </h5>
              <ul className="list-unstyled">
                <li>
                  <a
                    exect
                    href="/category/1"
                    target="_blank"
                    style={{ color: "black" }}
                  >
                    <LaptopIcon />
                    <span> Laptops</span>
                  </a>
                </li>
                <br></br>
                <li>
                  <a
                    href="/category/2"
                    target="_blank"
                    style={{ color: "black" }}
                  >
                    <PhoneAndroidIcon />
                    <span> Mobiles</span>
                  </a>
                </li>
                <br></br>

                <li>
                  <a
                    href="/category/3"
                    target="_blank"
                    style={{ color: "black" }}
                  >
                    <TabIcon />
                    <span> Tabs</span>
                  </a>
                </li>
                <br></br>
                <li>
                  <a
                    href="/category/4"
                    target="_blank"
                    style={{ color: "black" }}
                  >
                    <HeadsetIcon />
                    <span> Accessories</span>
                  </a>
                </li>
                <br></br>
                <li>
                  <a
                    href="/category/5"
                    target="_blank"
                    style={{ color: "black" }}
                  >
                    <VideogameAssetIcon />
                    <span> Gaming</span>
                  </a>
                </li>
                <br></br>
              </ul>
            </Col>
            <hr className="clearfix w-100 d-md-none" />
            <Col md="2">
              <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">
                <span> About MobTop</span>
              </h5>
              <ul className="list-unstyled">
                <li style={{ marginBottom: "22px" }}>
                  <a href="#!" style={{ color: "black" }}>
                    <InfoOutlinedIcon />
                    <span> About</span>
                  </a>
                </li>
                <li>
                  <a href="#!" style={{ color: "black" }}>
                    <PermContactCalendarOutlinedIcon />
                    <span> Contact Us</span>
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
        <hr />
        <div className="text-center py-3">
          <ul className="list-unstyled list-inline mb-0">
            <li className="list-inline-item">
              <h5 className="mb-1">Register for free</h5>
            </li>
            <li className="list-inline-item">
              <a href="/login/1" className="btn btn-danger btn-rounded">
                Sign up!
              </a>
            </li>
          </ul>
        </div>
        <hr />
        <div className="text-center">
          <ul className="list-unstyled list-inline">
            <li className="list-inline-item">
              <a
                className="btn-floating btn-xl btn-fb mx-1"
                href="https://www.facebook.com/mobtop2020/"
              >
                <i className="fa fa-facebook"> </i>
              </a>
            </li>
            <li className="list-inline-item">
              <a className="btn-floating btn-xl btn-xl mx-1">
                <i className="fa fa-twitter"> </i>
              </a>
            </li>
            <li className="list-inline-item">
              <a className="btn-floating btn-xl btn-gplus mx-1">
                <i className="fa fa-google-plus"> </i>
              </a>
            </li>
            <li className="list-inline-item">
              <a className="btn-floating btn-xl btn-li mx-1">
                <i className="fa fa-linkedin"> </i>
              </a>
            </li>
            <li className="list-inline-item">
              <a className="btn-floating btn-xl btn-dribbble mx-1">
                <i className="fa fa-dribbble"> </i>
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-copyright text-center">
          <Container fluid>
            &copy; {new Date().getFullYear()} Copyright:{" "}
            <a
              href="http://localhost:3000"
              target="_blank"
              style={{ color: "black" }}
            >
              {" "}
              www.MobTop.com{" "}
            </a>
          </Container>
        </div>
      </Footer>
    );
  }
}

export default FooterPage;
