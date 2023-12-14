import React from "react";
import { useDispatch, useSelector } from "react-redux";
import filtersSlice from "../../slices/filterSlice";
import { categorySelector } from "../../redux-Tollkit/selector";

const categories = [
    "All", "17 dây", "19 dây", "21 dây",
]
function Category() {
    const category= useSelector(categorySelector)
    const dispatch = useDispatch()
    return (
        <div className="py-2 d-flex flex-column justify-content-center">
            <h5>Kiểu Loại</h5>
            <div className="form-group ms-5">
                {
                    categories.map((cat,index) => (
                        <div key={cat} className="form-check py-1">
                            <input className="form-check-input" type="radio" name="category"
                                id={`cat_${index}`}
                                value={cat}
                                defaultChecked={cat === 'All'}
                                onChange={(e)=> dispatch(filtersSlice.actions.setSearchCategory(e.target.value))}
                            />
                            <label 
                                htmlFor={`cat_${index}`}
                                role="button"
                                className={`form-check-label ${cat === category ? 'text-decoration-underline fw-bolder' : ''}`}
                            >
                                {cat}
                            </label>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Category;