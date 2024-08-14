import React from "react";

const Footer = () => {
  return (
    <footer className="text-center text-lg-start bg-body-tertiary text-muted">
      <section className="pt-3">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">May Coffee</h6>
              <p>
              Hãy đến với May Coffee & Tea để có những trải nghiệm tuyệt vời nhất. 
              May Coffee & Tea – nơi gửi gắm những khoảng khắc bình yên. 
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Sản phẩm</h6>
              <p>
                <a href="#!" className="nav-link">
                  Cà phê đá
                </a>
              </p>
              <p>
                <a href="#!" className="nav-link">
                  Cà phê sữa
                </a>
              </p>
              <p>
                <a href="#!" className="nav-link">
                  Matcha Latte 
                </a>
              </p>
              <p>
                <a href="#!" className="nav-link">
                  Trà Đào Cam Sả
                </a>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Liên Kết</h6>
              <p>
                <a href="#!" className="nav-link">
                  Menu
                </a>
              </p>
              <p>
                <a href="#!" className="nav-link">
                  Đơn hàng
                </a>
              </p>
              <p>
                <a href="#!" className="nav-link">
                  Orders
                </a>
              </p>
              <p>
                <a href="#!" className="nav-link">
                  Help
                </a>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Liên hệ</h6>
              <p>
                <i className="fa fa-home me-3"></i> 50e4, Tân Hưng Thuận, q12
              </p>
              <p>
                <i className="fa fa-envelope me-3"></i>
                baonguyen21072k3@gmail.com
              </p>
              <p>
                <i className="fa fa-phone me-3"></i> 0925684669
              </p>
              <p>
                <i className="fa fa-print me-3"></i> 0925684669
              </p>
            </div>
          </div>
        </div>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2024 Copyright:
        <a href="#" style={{ textDecoration: "none", color: "#333" }}>
          <span> </span>May Coffee Shop
        </a>
      </div>
    </footer>
  );
};

export default Footer;
