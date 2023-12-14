import React from "react";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import filtersSlice from "../../slices/filterSlice";
import { cartSelector, searchTextSelector } from "../../redux-Tollkit/selector";
import { BsFillTelephoneInboundFill } from "react-icons/bs";
import { TbAddressBook } from "react-icons/tb";

function Navbar() {
  const cart = useSelector(cartSelector);
  const searchText = useSelector(searchTextSelector);
  const dispatch = useDispatch();
  return (
    <div className="container d-flex align-items-center border-bottom py-2 mt-2">
      <div
        className="d-flex align-items-center navbar-text"
        style={{ minWidth: "180px"}}
      >
        <Link to={"/"} className="logo">
          <img alt=""
            src="https://nhaccutienmanh.vn/wp-content/uploads/2019/11/logo-nhaccutienmanhvn.jpg"
            width={150}
          />
        </Link>
      </div>
      <div className="d-flex flex-grow-1 justify-content-between ">
        <form className="w-50 d-flex align-items-center ">
          <input
            value={searchText}
            type="search"
            placeholder="Enter your search shoes"
            className="form-control "
            style={{ paddingRight: "25px" }}
            onInput={(e) =>
              dispatch(filtersSlice.actions.setSearchText(e.target.value))
            }
          />
          <FaSearch
            size={15}
            style={{ marginLeft: "-25px", color: "rgba(0,0,0)" }}
          />
        </form>
        <div className="d-flex flex-column justify-content-center align-content-center ">
          <div className="d-flex">
            <BsFillTelephoneInboundFill size={20} />
            <p className="ms-3 fw-bold">HotLine:0395023929</p>
          </div>
          <div className="d-flex">
            <TbAddressBook size={25}/>
            <p className="ms-3 fw-bold far fa-map-marker-check">301 Hoàng Văn Thụ, P.2, Tân Bình, HCM</p>
          </div>
        </div>
        <div className="d-flex justify-content-center align-content-center">
          {cart.cartDetails.length ? (
            <Link to={"/cart"} className="position-relative me-3 ">
              <FaShoppingCart size={20} className="me-2 mt-3 " role="button" />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger mt-3">
                {cart.cartDetails.length}
              </span>
            </Link>
          ) : (
            <div className="d-flex justify-content-center align-content-center">
              <FaShoppingCart size={20} className="me-3 mt-3 " />
            </div>
          )}
          <Link to={"/dashboard/order-list"}>
            <FaUser size={20} role="button" className="mt-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
