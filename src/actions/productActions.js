import {
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR,
    START_DOWNLOAD_PRODUCTS,
    DOWNLOAD_PRODUCTS_SUCCESS,
    DOWNLOAD_PRODUCTS_ERROR, 
    OBTAIN_PRODUCT_DELETE,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_ERROR,
    OBTAIN_PRODUCT_EDIT,
    PRODUCT_EDIT_SUCCESS,
    PRODUCT_EDIT_ERROR,
    START_PRODUCT_EDIT
} from '../types'

import axiosClient from '../config/axiosConfig'
import Swal from 'sweetalert2'

//create new productos
export function createNewProductAction(product) {
    return async (dispatch) => {
        dispatch(addProduct())

        try {
            //Add in API
            await axiosClient.post('/products', product)
            //All ok update state
            dispatch(addProductSuccess(product))
            //Alert
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            )
        } catch (error) {
            console.log(error)
            dispatch(addProductError(true))
            //Alert
            Swal.fire({
                icon: 'error',
                title:'Hubo un error',
                text: 'Inténtalo de nuevo'
            })
        }
    }
}
const addProduct = () => ({
    type: ADD_PRODUCT,
    payload: true
})
//Product save in database
const addProductSuccess = product =>({
    type: ADD_PRODUCT_SUCCESS,
    payload: product
})
//Product save error
const addProductError = state =>({
    type: ADD_PRODUCT_ERROR,
    payload: state
})
//Download products from DB
export function obtainProductsAction(){
    return async (dispatch) =>{
        dispatch(downloadProducts())

        try {
            const result = await axiosClient.get('/products')
            dispatch(downloadProductsSuccess(result.data))
        } catch (error) {
            console.log(error)
            dispatch(downloadProductsError())
        }
    }
}
const downloadProducts= () =>({
    type: START_DOWNLOAD_PRODUCTS,
    payload: true
})
const downloadProductsSuccess = products=> ({
    type: DOWNLOAD_PRODUCTS_SUCCESS,
    payload: products
})
const downloadProductsError = () =>({
    type: DOWNLOAD_PRODUCTS_ERROR,
    payload: true
})

//Select and delete product

export function deleteProductAction(id) {
    return async (dispatch) =>{
        dispatch(obtainDeleteProduct(id))

        try {
            await axiosClient.delete(`/products/${id}`)
            dispatch(deleteProductSuccess())
            //delete confirmed show alert
            Swal.fire(
                'Eliminado',
                'El producto se eliminó correctamente',
                'success'
              )
        } catch (error) {
            console.log(error)
            dispatch(deleteProductError())
        }
    }
}

const obtainDeleteProduct = id => ({
    type: OBTAIN_PRODUCT_DELETE,
    payload: id
})
const deleteProductSuccess = () => ({
    type: PRODUCT_DELETE_SUCCESS
})
const deleteProductError = () => ({
    type: PRODUCT_DELETE_ERROR,
    payload: true
})

//obtain product to edit
export function obtainProductEdit(product) {
    return(dispatch) => {
        dispatch(obtainProductEditAction(product))
    }
}
const obtainProductEditAction = product => ({
    type: OBTAIN_PRODUCT_EDIT,
    payload: product
})
//edit in API and state
export function editProductAction(product) {
    return async (dispatch) =>{
        dispatch(editProduct())
        try {
            await axiosClient.put(`/products/${product.id}`, product)

            dispatch(editProductSuccess(product))
        } catch (error) {
            console.log(error)
            dispatch(editProductError())
        }
    }
}
const editProduct = ()=> ({
    type: START_PRODUCT_EDIT
})
const editProductSuccess = product =>({
    type: PRODUCT_EDIT_SUCCESS,
    payload: product
})
const editProductError = ()=>({
    type: PRODUCT_EDIT_ERROR,
    payload: true
})