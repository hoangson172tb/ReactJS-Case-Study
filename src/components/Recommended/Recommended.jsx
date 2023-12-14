import React from "react";
import { useDispatch, useSelector } from "react-redux";
import filtersSlice from "../../slices/filterSlice";
import { recommendedSelector } from "../../redux-Tollkit/selector";

const recommendedList = [
    {
        value: 'All',
        name: 'Tất Cả'
    },
    {
        value: 'VietNam',
        name: 'Việt Nam'
    },
    {
        value: 'TrungQuoc',
        name: 'Trung Quốc'
    },
    {
        value: 'PhuKien',
        name: 'Phụ Kiện'
    }
    
]
function Recommended() {
    const recommended = useSelector(recommendedSelector)
    const dispatch = useDispatch()
    return (
        <div className="py-2 d-flex flex-column justify-content-center" style={{background:'#f5f5f5'}}>
            <h4 className="">Đàn Tranh</h4>
            <div className="form-group">
                {
                    recommendedList.map(recmd => (
                        <button key={recmd.value}
                        
                            className={
                                `btn btn-sm btn-outline-secondary me-3
                                    ${recmd.value === recommended ? 'active' : ''}
                                `
                            }
                            type="button"
                            onClick={()=> dispatch(filtersSlice.actions.setSearchRecommended(recmd.value))}
                        >
                            {recmd.name}
                        </button>
                    ))
                }
            
            </div>
        </div>
    )
}

export default Recommended;