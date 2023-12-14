import React, { useEffect } from "react";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { loadingSelector, remainProducts } from "../../redux-Tollkit/selector";
import { fetchProductThunkAction } from "../../slices/productsSlice";

function Products() {
  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);
  useEffect(() => {
    dispatch(fetchProductThunkAction());
  }, [dispatch]);
  const remainProductList = useSelector(remainProducts);
  return (
    <div className="py-2 d-flex flex-column justify-content-center">
      <h5>Products</h5>
      {loading === "loading" ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {remainProductList?.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
