import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaStar,
  FaEdit,
  FaEye,
  FaTrash,
  FaTimes,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProductThunkAction,
  fetchProductThunkAction,
} from "../../../slices/productsSlice";
import {
  productListSelector,
  productPaginationSelector,
} from "../../../redux-Tollkit/selector";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  categoryList,
  companyList,
  statusList,
} from "../../../services/common";
import { toast } from "react-toastify";
import EditProductModel from "./EditProductModel";
import { fetchProductPaginationThunkAction, removeProductByIdThunkActon } from "../../../slices/manageProductSlice";
import Swal from "sweetalert2";

const schema = yup.object({
  title: yup.string().required(),
  newPrice: yup
    .number()
    .positive()
    .required()
    .typeError("price is a required field"),
  category: yup.string().required(),
  status: yup.string().required(),
  company: yup.string().required(),
  img: yup.string().required(),
});
function ProductList() {
  const [openAddProductArea, setOpenAddProductArea] = useState(false);
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const dispatch = useDispatch();
  const { products, pagination } = useSelector(productPaginationSelector);
  const [direction, setDirection] =useState('next')
  useEffect(() => {
    dispatch(fetchProductPaginationThunkAction({
      _page:page,
      _limit:pageSize
    }));
  }, [dispatch,page,pageSize]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [selectProduct, setSelectProduct] = useState({});

  const handleAddNewProduct = (data) => {
    let newProduct = {
      ...data,
      prevPrice: 0,
      star: 4,
      reviews: 130,
    };
    dispatch(addNewProductThunkAction(newProduct));
    reset();
    
    toast.success("Product added success!");
  };
  const handleCloseAddProductArea = () => {
    setOpenAddProductArea(false);
    reset();
  };
  const handleSelectProduct = (product) => {
    setSelectProduct(product);
  };
  const handleRemoveProduct = (product) => {
    Swal.fire({
        title: "Confirm remove product",
        text: `Are you sure to remove product: ${product.title}?`,
        showCancelButton: true,
        confirmButtonColor: '#d33'
    }).then((result) => {
        if (result.isConfirmed) {
            dispatch(removeProductByIdThunkActon(product))
            toast(`Product ${product.title} removed success!`)
        }
    })
  };
  const handleNextPage = () =>{
    if (page < pagination.totalPage) {
      setPage(page + 1)
      setDirection('next')
  }
  }
  const handlePreviousPage = () =>{
    if (page > 1) {
      setPage(page - 1)
      setDirection('prev')
  }
  };
  const handleChangePageSize = (e) =>{
    setPageSize(Number(e.target.value))
    setPage(1)
  }
  return (
    <div className="container">
      <EditProductModel
        selectProduct={selectProduct}
        setSelectProduct={setSelectProduct}
      />
      <div className="row product-title">
        <div className="col-lg-12 d-flex align-content-center justify-content-between">
          <h5>Product List </h5>
          <button
            className="btn btn-dm btn-warning d-flex align-items-center"
            onClick={() => setOpenAddProductArea(!openAddProductArea)}
          >
            <FaPlus size={15} className="me-2" />
            Add new Product
          </button>
        </div>
      </div>
      {openAddProductArea && (
        <div className=" product-form my-1">
          <form onSubmit={handleSubmit(handleAddNewProduct)} className="row">
            <div className="col-md-4">
              <div className="form-group mb-2">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className={`form-control form-control-sm ${
                    errors?.title?.message ? "is-invalid" : ""
                  }`}
                  placeholder="Title"
                  {...register("title")}
                />
                <span className="invalid-feedback">
                  {errors?.title?.message}
                </span>
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Price</label>
                <input
                  type="text"
                  className={`form-control form-control-sm ${
                    errors?.newPrice?.message ? "is-invalid" : ""
                  }`}
                  placeholder="Price"
                  {...register("newPrice")}
                />
                <span className="invalid-feedback">
                  {errors?.newPrice?.message}
                </span>
              </div>
              <div className="form-group mb-2">
                <label className="form-label"></label>
                <div className="d-flex">
                  <button
                    type="submit"
                    className="btn btn-success btn-sm flex-grow-1 me-2 d-flex align-items-center justify-content-center"
                  >
                    <FaPlus className="me-2 bg-success" />
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseAddProductArea}
                    className="btn btn-dark btn-sm flex-grow-1 d-flex align-items-center justify-content-center"
                  >
                    <FaTimes className="me-2 bg-black" />
                    Close
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group mb-2">
                <label className="form-label">Category</label>
                <select
                  className={`form-select form-select-sm form-control-sm ${
                    errors?.category?.message ? "is-invalid" : ""
                  }`}
                  defaultValue={""}
                  {...register("category")}
                >
                  <option value={""} disabled>
                    Please select category
                  </option>
                  {categoryList?.map((cat, id) => (
                    <option key={cat.id} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <span className="invalid-feedback">
                  {errors?.category?.message}
                </span>
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Company</label>
                <select
                  className={`form-select form-select-sm form-control-sm ${
                    errors?.company?.message ? "is-invalid" : ""
                  }`}
                  defaultValue={""}
                  {...register("company")}
                >
                  <option value={""} disabled>
                    Please select company
                  </option>
                  {companyList?.map((company) => (
                    <option key={company.id} value={company.value}>
                      {company.name}
                    </option>
                  ))}
                </select>
                <span className="invalid-feedback">
                  {errors?.company?.message}
                </span>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group mb-2">
                <label className="form-label">Status</label>
                <select
                  className={`form-select form-select-sm form-control-sm ${
                    errors?.status?.message ? "is-invalid" : ""
                  }`}
                  defaultValue={""}
                  {...register("status")}
                >
                  <option value={""} disabled>
                    Please select status
                  </option>
                  {statusList?.map((item, id) => (
                    <option key={item.id} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <span className="invalid-feedback">
                  {errors?.status?.message}
                </span>
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Img</label>
                <input
                  type="text"
                  className={`form-control form-control-sm`}
                  placeholder="img"
                  {...register("img")}
                />
                <span className="invalid-feedback">{errors?.img?.message}</span>
              </div>
            </div>
          </form>
        </div>
      )}
      <div className="row product-list">
        <table className="table table-striped table-product">
          <thead>
            <tr>
              <th className="text-center">Title</th>
              <th className="text-start">Status</th>
              <th className="text-start">Category</th>
              <th className="text-start">Company</th>
              <th className="text-end">Price</th>
              <th className="text-center">Rate</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {products?.map((product) => (
              
              <tr className="bg-black">
                <td className="text-start " style={{ minWidth: "250px" }}>
                  <div className="d-flex align-items-center">
                    <img src={product.img} alt="" style={{ width: "50px" }} />
                    <span className="ms-2">{product.title}</span>
                  </div>
                </td>
                <td className="text-start align-middle">
                  <span
                    className={`badge px-2 py-1 ${
                      product.status === "Còn Hàng"
                        ? " text-success"
                        : " text-danger"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="text-start align-middle">{product.category}</td>
                <td className="text-start align-middle">{product.company}</td>
                <td className="text-end align-middle">
                  <div className="d-flex flex-column">
                    <del>${product.prevPrice}</del>
                    <span>${product.newPrice}</span>
                  </div>
                </td>
                <td className="text-center align-middle">
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <div className="d-flex align-items-center">
                      <span className="me-1">{product.star}</span>
                      <FaStar color="yellow" />
                    </div>
                    <div>
                      <span className="me-1">{product.reviews}</span>
                      <FaEye color="green" />
                    </div>
                  </div>
                </td>
                <td className="text-center align-middle">
                  <div className="d-flex align-items-center justify-content-center">
                    <FaEdit
                      className="text-success me-1"
                      role="button"
                      onClick={() => handleSelectProduct(product)}
                    />
                    <FaTrash
                      className="text-danger"
                      role="button"
                       onClick={() => handleRemoveProduct(product)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex align-items-center justify-content-between">
          <ul className="pagination my-0">
                        <li className=
                        {`page-item ${direction === 'prev' ? 'active' : ''} ${page <= 1 ? 'disabled' : ''}`}
                        >
                            <button className="page-link"
                             onClick={handlePreviousPage}
                             >Previous</button>
                        </li>
                        <li className=
                        {`page-item ${direction === 'next' ? 'active' : ''} ${page >= pagination.totalPage ? 'disabled' : ''}`}
                        >
                            <button className="page-link" 
                            onClick={handleNextPage}
                            >Next</button>
                        </li>
          </ul>
          <div className="d-flex align-items-center">
                            <span style={{ width: '120px' }}>Items per page</span>
                            <select style={{ width: '50px' }} className="form-control" defaultValue={10}
                                onChange={handleChangePageSize}
                            >
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={30}>30</option>
                                <option value={40}>40</option>
                            </select>
          </div>
      </div>
      </div>
    </div>
  );
}

export default ProductList;
