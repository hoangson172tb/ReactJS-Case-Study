import React from "react";
import Category from './Category';
import Price from './Price';
import Colors from "./Status";
function Sidebar() {
    return (
        <div className="d-flex flex-column border-end me-1 h-100" style={{minWidth: "180px"}}>
            <div className="py-3 d-flex flex-column">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsU6aoj5H2wpmbjeDjtql0rQLHjJqmFq10EQ&usqp=CAU" width={150} height={150} />
                {/* <FaCartPlus size={25} className="me-2" /> Đàn Tranh Guzheng */}
                <h4 className="pt-5">Danh Mục</h4>
            </div>
            <div className="d-flex flex-column ">
                <Category />
                <Price />
                <Colors />
            </div>

        </div>
    )
}

export default Sidebar;