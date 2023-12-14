import React from "react";
import { useDispatch, useSelector } from "react-redux";
import filtersSlice from "../../slices/filterSlice";
import { statusSelector } from "../../redux-Tollkit/selector";

const status = [
    "All", "Còn Hàng","Hết Hàng"
]
function Status() {
    const currentStatus= useSelector(statusSelector)
    const dispatch = useDispatch()
    return (
        <div className="py-2 d-flex flex-column justify-content-center">
            <h5>Trạng Thái</h5>
            <div className="form-group ms-5">
                {
                    status.map((status,index) => (
                        <div key={status} className="form-check py-1">
                            <input className="form-check-input" type="radio" name="color"
                                id={`status_${index}`}
                                value={status}
                                defaultChecked={status === 'All'}
                                onChange={(e)=>dispatch(filtersSlice.actions.setSearchStatus(e.target.value))}
                            />
                            <label 
                                role="button"
                                htmlFor={`status_${index}`}
                                className={`form-check-label ${status === currentStatus ? 'text-decoration-underline fw-bolder' : ''}`}
                            >
                                {status}
                            </label>
                        </div>
                    ))
                }
            </div>
        </div>
    )

}

export default Status;