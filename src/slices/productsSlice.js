import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "productList",
  initialState: {
    status:'idle',
    products:[],
    product:{}
  },
  reducers: {
  
  },
  extraReducers: (builder)=>{
    builder
    .addCase(fetchProductThunkAction.pending, (state,action)=>{
      state.status = 'loading'
    })
    .addCase(fetchProductThunkAction.fulfilled, (state,action)=>{
      state.status='idle'
      state.products = [...action.payload]
  })
    .addCase(addNewProductThunkAction.pending, (state,action)=>{

  })
    .addCase(addNewProductThunkAction.fulfilled, (state,action)=>{
    state.products.push(action.payload)
  })
    .addCase(fetchProductByIdThunkAction.pending, (state, action) => {
    state.status = 'loading'
})
    .addCase(fetchProductByIdThunkAction.fulfilled, (state, action) => {
    state.status = 'idle'
    state.product = action.payload
})
  }
});

export const fetchProductThunkAction = createAsyncThunk('productList/fetchProductThunkAction',async () => {
    let productListRes = await fetch('https://json-sever-api-drab.vercel.app/productList');
    let data = await productListRes.json()
    // data= data.soft(function(item_1, item_2){
    //   return Number(item_2.id) - Number(item_1.id)
    // })
    return data;
  })

  export const addNewProductThunkAction = createAsyncThunk('productList/addNewProductThunkAction', async (newProduct) => {
    let newProductRes = await fetch('https://json-sever-api-drab.vercel.app/productList', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    })
    let data = await newProductRes.json()

    return data
})

export const fetchProductByIdThunkAction = createAsyncThunk(
  'productList/fetchProductByIdThunkAction',
  async (productId) => {
      let productRes = await fetch(`https://json-sever-api-drab.vercel.app/productList/${productId}`)
      let product = await productRes.json()
      return product;
  }
)

export default productsSlice;
