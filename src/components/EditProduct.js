import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import {editProductAction} from '../actions/productActions'
import {useHistory} from 'react-router-dom'

const EditProduct = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    //new product state
    const [product, setProduct]= useState({
        name:'',
        price:''
    })

    //product to edit
    const editProduct = useSelector(state=>state.products.productEdit)
    
    //put values in state
    useEffect(()=>{
        setProduct(editProduct)
    }, [editProduct])

    //read form data
    const onChangeForm = e =>{
        setProduct({
            ...product,
            [e.target.name] : e.target.value
        })
    }


    const {name, price} = product

    const submitEditProduct = e => {
        e.preventDefault()

        dispatch(editProductAction(product))

        history.push('/')
    }

    return (
        <div className='row justify-content-center'>
            <div className='col-md-8'>
                <div className='card'>
                    <div className='card-body'>
                        <h2 className='text-center mb-4 font-weight-bold'>
                            Editar producto
                        </h2>
                        <form
                            onSubmit={submitEditProduct}
                        >
                            <div className='form-group'>
                                <label>Nombre producto</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Nombre producto'
                                    name='name'
                                    value={name}
                                    onChange={onChangeForm}
                                >
                                </input>
                            </div>
                            <div className='form-group'>
                                <label>Precio producto</label>
                                <input
                                    type='number'
                                    className='form-control'
                                    placeholder='Precio producto'
                                    name='price'
                                    value={price}
                                    onChange={onChangeForm}
                                >
                                </input>
                            </div>
                            <button
                                type='submit'
                                className='btn btn-primary font-weight-bold text-uppercase d-block w-100'
                            >Guardar cambios
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;