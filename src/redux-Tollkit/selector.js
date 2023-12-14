import { createSelector } from "@reduxjs/toolkit"

export const productListSelector = (state)=> state.productList.products
export const loadingSelector = (state)=> state.productList.status
export const productListStateSelector = (state)=> state.productList.status
export const recommendedSelector = (state)=> state.filters.recommended
export const statusSelector = (state)=> state.filters.status
export const priceSelector = (state)=> state.filters.price
export const categorySelector = (state)=> state.filters.category
export const searchTextSelector = (state)=> state.filters.searchText
export const cartSelector = (state)=> state.cart
export const orderListSelector = (state)=> state.orders.orderList 
export const orderLoadingSelector = (state)=> state.orders.status 
export const productSelector = (state) => state.productList.product
export const productPaginationSelector = (state) => state.manageProduct.data

export const remainProducts = createSelector(
    productListSelector,
    searchTextSelector,
    statusSelector,
    categorySelector,
    recommendedSelector,
    priceSelector,
    (productList, searchText, status, category, recommended, price) => {
        let filtersProduct = [...productList]
        if (searchText) {
            filtersProduct = filtersProduct.filter((p) => p.title.toLowerCase().includes(searchText.toLowerCase()))
        }
        if (status !== 'All') {
            filtersProduct = filtersProduct.filter((p) => p.status.toLowerCase() === status.toLowerCase())
        }
        if (category !== 'All') {
            filtersProduct = filtersProduct.filter((p) => p.category.toLowerCase() === category.toLowerCase())
        }
        if (recommended !== 'All') {
            filtersProduct = filtersProduct.filter((p) => p.company.toLowerCase() === recommended.toLowerCase())
        }
        if (price !== '0,0') {
            const [min, max] = price.split(',')
            if (min !== max) {
                filtersProduct = filtersProduct.filter((p) => p.newPrice > Number(min) && p.newPrice <= Number(max))
            }
            else {
                filtersProduct = filtersProduct.filter((p) => p.newPrice > Number(min))
            }
        }
        return filtersProduct;
    }
)