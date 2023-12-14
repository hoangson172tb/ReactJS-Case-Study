import React from "react";
import { BsFillTelephoneInboundFill } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import { PiSignOut } from "react-icons/pi";
import { TbAddressBook, TbAddressBookOff } from "react-icons/tb";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className="d-flex align-items-center justify-content-between py-3 border-bottom">
      <div style={{ minWidth: "180px" }} className="d-flex align-items-center">
        <Link to={"/"} className="logo">
          <img
            alt=""
            src="https://nhaccutienmanh.vn/wp-content/uploads/2019/11/logo-nhaccutienmanhvn.jpg"
            width={150}
          />
        </Link>
      </div>
      <div className="d-flex flex-column justify-content-center align-content-center ">
        <div className="d-flex">
          <BsFillTelephoneInboundFill size={20}/>
          <p className="ms-3 fw-bold">HotLine:0395023929</p>
        </div>
        <div className="d-flex">
          <TbAddressBook size={25}/>
          <p className="ms-3 fw-bold far fa-map-marker-check">
            301 Hoàng Văn Thụ, P.2, Tân Bình, HCM
          </p>
        </div>
      </div>
      <div>
        <Link to={"/guzheng"}>
            <img className="me-3" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToXQyMQ9Ac190ETtc0jmEaq1oe18eE_i_8E2guDvpjAprNsPMpJBbGa1Ce79mtGGh4eSg&usqp=CAU" width={50}/>
          Admin <PiSignOut />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
