import React from 'react'
import {useHistory} from 'react-router-dom'
import Swal from 'sweetalert2'

//Redux
import {useDispatch} from 'react-redux'
import {deleteProductAction, obtainProductEdit} from '../actions/productActions'

const Product = ({product}) => {

    const {name, price, id} = product

    const dispatch= useDispatch()
    const history = useHistory() //enable history to redirect

    //confirm delete
    const confirmDeleteProduct = id =>{
        // ask user
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No se podrá recuperar el producto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText:'Cancelar'
          }).then((result) => {
            if (result.value) {
                // pass to action
                dispatch(deleteProductAction(id))
            }
          })
    }
    //redirect function
    const redirectEdition = product =>{
        dispatch(obtainProductEdit(product))
        history.push(`/products/edit/${product.id}`)
    }


    return (
        <tr>
            <td>{name}</td>
            <td> <span className='font-weight-bold'> {price} €</span></td>
            <td className='acciones'>
                <button 
                    type='button'
                    className='btn btn-primary mr-2'
                    onClick={()=>redirectEdition(product)}    
                >
                    Editar
                </button>
                <button
                    type='button'
                    className='btn btn-danger'
                    onClick={()=>confirmDeleteProduct(id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    );
};

export default Product;