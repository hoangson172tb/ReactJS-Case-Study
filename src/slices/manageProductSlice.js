import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
 const manaProductSlice = createSlice ({
    name:'manageProduct',
    initialState:{
        status:'idle',
        data:{
            products:[],
            pagination:{
                totalPage: 0,
                currentPage: 0,
                pageSize: 0
            }
        }
    },
    reducers:{

    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchProductPaginationThunkAction.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchProductPaginationThunkAction.fulfilled, (state, action) => {
            state.status = 'idle'
            state.data = action.payload
        })
        .addCase(removeProductByIdThunkActon.fulfilled, (state, action) => {
            state.data.products = state.data.products.filter((p) => p.id !== action.payload?.id)
        })
        .addCase(editProductThunkAction.pending, (state, action) => {

        })
        .addCase(editProductThunkAction.fulfilled, (state, action) => {
            state.data.products = state.data.products.map((p) => {
                if (p.id === action.payload.id) {
                    return action.payload
                }
                return p;
            })
        })
    }
})
export const fetchProductPaginationThunkAction = createAsyncThunk(
    'manageProduct/fetchProductPaginationThunkAction',
    async (paginate) => {
        const{_page, _limit} = paginate
    let productListRes = await fetch('https://json-sever-api-drab.vercel.app/productList');
    let productList = await productListRes.json()
    let pagination = {
        totalPage: Math.ceil(Number(productList.length) / Number(_limit)),
        currentPage: _page,
        pageSize: _limit
    }

    let productPaginationRes = await fetch(`https://json-sever-api-drab.vercel.app/productList?_page=${_page}&_limit=${_limit}`)
    let products = await productPaginationRes.json()
    let data = {
        products: products,
        pagination: pagination
    }
    return data
}
  )


export const editProductThunkAction = createAsyncThunk(
    'manageProduct/editProductThunkAction',
    async (product) => {
        let editProductRes = await fetch(`https://json-sever-api-drab.vercel.app/productList/${product?.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        let editProduct = await editProductRes.json()
        return editProduct
    }
)
export const removeProductByIdThunkActon = createAsyncThunk(
    'manageProduct/removeProductByIdThunkActon',
    async (product) => {
        let removeResult = await fetch(`https://json-sever-api-drab.vercel.app/productList/${product?.id}`, {
            method: "DELETE"
        })
        await removeResult.json()
        return product
    }

)
export default manaProductSlice