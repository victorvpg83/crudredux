import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

//Actions redux
import {createNewProductAction} from '../actions/productActions'
import {showAlert, closeAlertAction} from '../actions/alertActions'

const NewProduct = ({history}) => {

    //component state
    const[name, saveName] = useState('')
    const[price, savePrice] = useState('')

    // use dispatch and create function
    const dispatch = useDispatch()

    //Access to statestore
    const loading = useSelector(state => state.products.loading)
    const error = useSelector(state=> state.products.error)
    const alert = useSelector(state=>state.alert.alert)

    //call action of productAction
    const addProduct = product => dispatch(createNewProductAction(product) )

    //onSubmit
    const submitNewProduct = e =>{
        e.preventDefault()
        //Validate Form
        if(name.trim()==='' || price <=0) {

            const alert = {
                msg: 'Todos los campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(showAlert(alert))

            return
        }

        //no errors
        dispatch(closeAlertAction())
        //create new product
        addProduct({
            name,
            price
        })
        //redirect to home
        history.push('/')
    }

    return (
        <div className='row justify-content-center'>
            <div className='col-md-8'>
                <div className='card'>
                    <div className='card-body'>
                        <h2 className='text-center mb-4 font-weight-bold'>
                            Agregar nuevo producto
                        </h2>
                        {alert? <p className={alert.classes} > {alert.msg} </p>:null}
                        <form
                            onSubmit={submitNewProduct}
                        >
                            <div className='form-group'>
                                <label>Nombre producto</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Nombre producto'
                                    name='name'
                                    value={name}
                                    onChange={e=> saveName(e.target.value)}
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
                                    onChange={e=> savePrice(Number(e.target.value))}
                                >
                                </input>
                            </div>
                            <button
                                type='submit'
                                className='btn btn-primary font-weight-bold text-uppercase d-block w-100'
                            >Agregar
                            </button>
                        </form>
                        {loading? <p>Cargando...</p>:null}
                        {error? <p className='alert alert-danger p2 mt-4 text-center'>Hubo un error</p>:null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewProduct;