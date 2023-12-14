import React from "react";
import { FaMailBulk, FaMapMarked, FaMobile } from "react-icons/fa";
function Footer() {
  return (
    <div className="container border-top pt-5 footers ">
      <div className="row d-flex ">
        <div className="col-sm-12 col-md-6 ps-5 ">
          <h5>VỀ CHÚNG TÔI</h5>
          <div className="d-flex ">
            <FaMapMarked />
            <p className="ms-2">
              Showroom & Mua Hàng: 301 Hoàng Văn Thụ, Phường 2, Tân Bình, TP
              HCM.
            </p>
          </div>
          <div className="d-flex ">
            <FaMapMarked />
            <p className="ms-2">
              Cửa hàng TPHCM: 547 Điện Biên Phủ, Phường 3, Quận 3, TPHCM.
            </p>
          </div>
          <div className="d-flex ">
            <FaMapMarked />
            <p className="ms-2">
              Cửa hàng Hà Nội: 70 Hào Nam - Ô chợ Dừa - Ðống Ða - Hà Nội.
            </p>
          </div>
          <div className="d-flex ">
            <FaMapMarked />
            <p className="ms-2">
              Cửa hàng Đà Nẵng: 22 Đ. Lê Đình Dương, Phước Ninh, Hải Châu, Đà
              Nẵng.
            </p>
          </div>
          <div className="d-flex ">
            <FaMapMarked />
            <p className="ms-2">
              Cửa hàng Đà Nẵng: 255 Hải Phòng - Tân Chính - Thanh Khê, Đà Nẵng.
            </p>
          </div>
          <div className="d-flex ">
            <FaMobile />
            <p className="ms-2"> Hotline: 0967 255 485 | 0943 683 790.</p>
          </div>
          <div className="d-flex ">
            <FaMailBulk />
            <p className="ms-2"> Email: nhaccutienmanh.vn@gmail.com</p>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 fw-light ">
          <h5>Chính Sách</h5>
          <p>CHÍNH SÁCH BẢO MẬT</p>
          <p>CHÍNH SÁCH VẬN CHUYỂN</p>
          <p>QUY ĐỊNH ĐỔI TRẢ</p>
          <p>QUY ĐỊNH VÀ HÌNH THỨC THANH TOÁN</p>
          <p>ĐIỀU KHOẢN VÀ ĐIỀU KIỆN GIAO DỊCH</p>
          <p>---------------------------------</p>
        </div>
      </div>
    </div>
  );
}
export default Footer;
