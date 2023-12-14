import React from "react";
import MainLayout from "../layouts/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector } from "../redux-Tollkit/selector";
import cartSlice, { checkoutThunkAction } from "../slices/cartSlice";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuid } from "uuid";

const schema = yup.object({
  fullname: yup.string().required(),
  address: yup.string().required(),
  email: yup.string().required(),
  mobile: yup.string().required(),
});
function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector(cartSelector);
  const { cartInfo, cartDetails } = cart;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleIncrementQuantity = (cartItem) => {
    dispatch(cartSlice.actions.incrementQuantity(cartItem));
    toast.success(`${cartItem.title} Đã thêm`);
  };
  const handleDescrementQuantity = (cartItem) => {
    dispatch(cartSlice.actions.decrementQuantity(cartItem));
    toast.success(`${cartItem.title} Đã thêm`);
  };
  const handleRemoveCartItem = (cartItem) => {
    Swal.fire({
      title: "Bạn có muốn xóa không?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Confirm",
      icon: "question",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(cartSlice.actions.removeCartItem(cartItem));
        toast.info(`${cartItem.title} has been removed`);
      }
    });
  };
  const handleCheckoutCart = (data) => {
    Swal.fire({
        title: "Confirm checkout",
        text: 'Are you sure checkout',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: "Confirm"
    }).then((result) => {
        if (result.isConfirmed) {
            const order = {
                orderId: uuid(),
                orderInfo: {
                    ...cartInfo,
                    orderDate: Math.floor(Date.now() / 1000)
                },
                orderDetails: [...cartDetails],
                customerInfo: {
                    ...data
                }
            }
            dispatch(checkoutThunkAction(order))
            reset()
            
            toast.success('Checkout success')
        }
        
    })
}
  
  return (
    <MainLayout>
      <div className="container mt-1">
        <div className="row">
          <div className="col-sm-12 col-md-12">
            <h3 className=" py-2">Giỏ Hàng</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-8">
            <table className="table cart-table">
              <thead>
                <tr>
                  <th>Sản Phẩm</th>
                  <th className="text-end">Giá</th>
                  <th className="text-center">Số Lượng</th>
                  <th className="text-end">Tổng</th>
                  <th className="text-center">Hủy Bỏ</th>
                </tr>
              </thead>
              <tbody>
                {cartDetails?.map((cartItem) => (
                  <tr key={cartItem.id}>
                    <td style={{ maxWidth: "200px" }}>
                      <div className="d-flex align-items-center">
                        <img
                          className="product-image"
                          src={cartItem.img}
                          alt=""
                        />
                        <div className="d-inline">
                          <div className="d-block fw-bolder mb-2">
                            {cartItem.title}
                          </div>
                          <div
                            className="badge py-2"
                            style={{ backgroundColor: cartItem.color }}
                          >
                            {cartItem.color}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-end">${cartItem.newPrice}</td>
                    <td>
                      <div className="cart-quantity-wrap">
                        <div className="cart-quantity">
                          {cartItem.quantity > 1 ? (
                            <span
                              onClick={() => handleDescrementQuantity(cartItem)}
                            >
                              -
                            </span>
                          ) : (
                            <span>-</span>
                          )}

                          <span>{cartItem.quantity}</span>
                          <span
                            onClick={() => handleIncrementQuantity(cartItem)}
                          >
                            +
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="text-end">${cartItem.amount}</td>
                    <td>
                      <div className="action-wrap">
                        <span
                          className="btn-remove"
                          onClick={() => handleRemoveCartItem(cartItem)}
                        >
                          &times;
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="row col-md-12">
              <Link to={"/"}>
                <FaArrowAltCircleLeft /> Quay Lại
              </Link>
            </div>
          </div>

          <div className="col-md-12 col-lg-4 col-sm-12" style={{ minWidth: "300px" }}>
          <form onSubmit={handleSubmit(handleCheckoutCart)}>
                            <div className="order-summary p-3">
                                <h3 className="border-bottom py-2">Order Summary</h3>
                                <div className="d-flex flex-column">
                                    <div className="d-flex align-items-center justify-content-between py-2">
                                        <span>Subtotal</span>
                                        <span className="fw-bolder">${cartInfo.subTotal}</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between py-2">
                                        <span>Shipping</span>
                                        <span className="fw-bolder">{`${cartInfo.shipping ? '$' + cartInfo.shipping : 'Free'}`}</span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between border-top mt-2 py-2">
                                    <span className="fs-6">Total</span>
                                    <span className="fw-bolder fs-6">${cartInfo.total}</span>
                                </div>
                            </div>
                            <div className="customer-info p-3">
                                <h3 className="border-bottom py-2">Customer Info</h3>
                                <div className="form-group mb-3">
                                    <label className="form-label">Fullname</label>
                                    <input type="text"
                                        className={`form-control ${errors?.fullname?.message ? 'is-invalid' : ''}`}
                                        placeholder="Fullname"
                                        {...register('fullname')}
                                    />
                                    <span className="invalid-feedback">{errors?.fullname?.message}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Address</label>
                                    <input type="text"
                                        className={`form-control ${errors?.address?.message ? 'is-invalid' : ''}`}
                                        placeholder="Address"
                                        {...register('address')}
                                    />
                                    <span className="invalid-feedback">{errors?.address?.message}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="text"
                                        className={`form-control ${errors?.email?.message ? 'is-invalid' : ''}`}
                                        placeholder="Email"
                                        {...register('email')}
                                    />
                                    <span className="invalid-feedback">{errors?.email?.message}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Mobile</label>
                                    <input type="text"
                                        className={`form-control ${errors?.mobile?.message ? 'is-invalid' : ''}`}
                                        placeholder="Mobile"
                                        {...register('mobile')}
                                    />
                                    <span className="invalid-feedback">{errors?.mobile?.message}</span>
                                </div>
                            </div>
                            <div className="py-3 bg-success mt-2 d-flex align-items-center justify-content-center text-white btn-checkout">
                                <button className="btn btn-block fw-bold text-white" type="submit">Thanh Toán</button>
                            </div>
                        </form>
          </div>
        </div>
       
      </div>
    </MainLayout>
  );
}

export default CartPage;
