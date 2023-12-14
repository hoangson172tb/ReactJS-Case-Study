import React from "react";
import { useDispatch, useSelector } from "react-redux";
import filtersSlice from "../../slices/filterSlice";
import { priceSelector } from "../../redux-Tollkit/selector";

const prices = [
    {
        value: '0,0',
        name: "All"
    },
    {
        value: '0,200',
        name: "$0-$200"
    },
    {
        value: '200,400',
        name: "$200-$400"
    },
    {
        value: '400,800',
        name: "$400-$800"
    },
    {
        value: '800,800',
        name: "Trên $800"
    },

]
function Price() {
    const currentPrice = useSelector(priceSelector)
    const dispatch = useDispatch()
    return (
        <div className="py-2 d-flex flex-column justify-content-center">
            <h5>Giá</h5>
            <div className="form-group ms-5">
                {
                    prices.map((price,index) => (
                        <div key={price.value} className="form-check py-1">
                            <input className="form-check-input" type="radio" name="price"
                                id={`price_${index}`}
                                value={price.value}
                                defaultChecked={price.name === 'All'}
                                onChange={(e)=>dispatch(filtersSlice.actions.setSearchPrice(e.target.value))}
                            />
                            <label 
                                role="button"
                                htmlFor={`price_${index}`}
                                className={`form-check-label ${price.name === currentPrice ? 'text-decoration-underline fw-bolder' : ''}`}
                            >
                                {price.name}
                            </label>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default Price;