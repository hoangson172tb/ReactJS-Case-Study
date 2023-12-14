import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { categoryList, companyList, statusList } from "../../../services/common";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { editProductThunkAction } from "../../../slices/manageProductSlice";
const schema = yup.object({
    title: yup.string().required(),
    newPrice: yup.number().positive().required().typeError('price is a required field'),
    category: yup.string().required(),
    status: yup.string().required(),
    company: yup.string().required(),
    img: yup.string().required(),
})

function EditProductModel({selectProduct,setSelectProduct}) {
    const dispatch = useDispatch()
    const [currentProduct, setCurrentProduct]=useState({})
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        setLoading(true)
        async function getProductById(){
            let productRes = await fetch(`https://json-sever-api-drab.vercel.app/productList/${selectProduct?.id}`)
            let product = await productRes.json()
            setCurrentProduct(product)
            setLoading(false)
            setValue('title', product.title)
            setValue('newPrice', product.newPrice)
            setValue('category', product.category)
            setValue('status', product.status)
            setValue('company', product.company)
            setValue('img', product.img)
        }
        getProductById()
    },[selectProduct?.id])

    const handleCloseEditModel = ()=>{
        setSelectProduct({})
        reset()
    }
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    })
    const handleSaveProduct = (data) => {
     
    let editProduct = {
        ...currentProduct,
        ...data,
        prevPrice: Number(data.newPrice) !== Number(currentProduct.newPrice) ? currentProduct.newPrice : currentProduct.prevPrice
    }
    dispatch(editProductThunkAction(editProduct))
    toast.success('Product updated success')
    setSelectProduct({})
        
        }

    return (
    <>
      <div className="modal fade show" style={{ display: `${selectProduct?.id ? 'block' : 'none'}` }}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <form onSubmit={handleSubmit(handleSaveProduct)}>
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Modidy Product
              </h5>
              <button
              onClick={handleCloseEditModel}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
                {
                    loading ? <p>Loading...</p> : (
                    <div className="row">
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
                    </div>

                    )
                }
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              onClick={handleCloseEditModel}
              >
                Cancel
              </button>
              <button type="submit"
              
              className="btn btn-primary">
                Save
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default EditProductModel;
