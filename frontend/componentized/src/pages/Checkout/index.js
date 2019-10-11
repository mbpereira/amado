import React, { useState, useEffect } from 'react'
import Modal from '../../components/Modal'
import AddressWrapper from '../../components/AddressWrapper'

import './styles.css'

function AddressesList(props) {
    const addresses = props.addresses
    return (
        <ul>
            {addresses.map(address => (
                <li key={address.id}>
                    <button className="custom-border-primary w-100" onClick={() => props.onSwapChoose(address.id)}>
                        <AddressWrapper address={address} />
                    </button>
                </li>
            ))}
        </ul>
    )
}
export default function Checkout() {

    const [modalOpen, setModalOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)

    const [addresses, setAddresses] = useState([])
    const [address, setAddress] = useState(null)

    const [tempAddress, setTempAddress] = useState(-1)


    useEffect(() => {
        // carrega os enderecos disponíveis desse cliente
        // seleciona o endereco padrao para entrega
    }, [])


    // habilita o endereco atualmente selecionado para edição
    function handleEditRequest() {}

    // atualiza o registro atualmente selecionado
    function onAddressUpdate(e) {
        e.preventDefault()
    }


    // abre o modal para selecionar
    function handleSwapRequest() {
        setModalOpen(!modalOpen)
    }

    // cancela a troca de endereco
    function handleSwapCancel() {
        console.log("Here")
        setTempAddress(-1)
        setModalOpen(!modalOpen)
    }

    // faz uma seleção temporária de endereço
    function onSwapChoose(addressId) {}

    // faz a troca definitiva do endereço atual
    function onSwapCommit() {
        if(tempAddress === -1)
            return

        const chosenAddress = addresses.find(chosenAddress.id == tempAddress)

        if(!chosenAddress)
            return

        setAddress(chosenAddress)
        setTempAddress(-1)

    }

    return (
        <div className="cart-table-area section-padding-100">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-lg-8">
                        <div className="checkout_details_area mt-50 clearfix">

                            <Modal 
                                title="Selecione um endereço para receber a compra"
                                isOpen={modalOpen}
                                onClose={handleSwapCancel}
                                onSave={onSwapCommit}>
                                <AddressesList 
                                    onSwapChoose={onSwapChoose} 
                                    addresses={addresses} />
                            </Modal>

                            <div className="cart-title">
                                <h2>Checkout</h2>
                            </div>

                            <div className="border-light cart-address-section">
                                <div className="cart-subtitle">
                                    <h6>Endereço de entrega</h6>
                                </div>

                                <div className="actions">
                                    <button className="badge badge-warning" onClick={handleEditRequest} type="button">Editar</button>
                                    <button className="mx-1 badge badge-primary" onClick={handleSwapRequest} type="button">Escolher outro</button>
                                </div>

                                <form>
                                    <div className="row">
                                        {/* <div className="col-12 mb-3">
                                            <select className="w-100" id="country">
                                            <option value="usa">United States</option>
                                            <option value="uk">United Kingdom</option>
                                            <option value="ger">Germany</option>
                                            <option value="fra">France</option>
                                            <option value="ind">India</option>
                                            <option value="aus">Australia</option>
                                            <option value="bra">Brazil</option>
                                            <option value="cana">Canada</option>
                                        </select> 
                                        </div> */}
                                        <div className="col-12 mb-3">
                                            <input type="text" className="form-control mb-3" id="street_address" placeholder="Address" value="" />
                                        </div>
                                        <div className="col-12 mb-3">
                                            <input type="text" className="form-control" id="city" placeholder="Town" value="" />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <input type="text" className="form-control" id="zipCode" placeholder="Zip Code" value="" />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <input type="number" className="form-control" id="phone_number" min="0" placeholder="Phone No" value="" />
                                        </div>
                                        <div className="col-12 mb-3">
                                            <textarea name="comment" className="form-control w-100" id="comment" cols="30" rows="10" placeholder="Leave a comment about your order"></textarea>
                                        </div>

                                        <div className="col-12">
                                            <div className="custom-control custom-checkbox d-block mb-2">
                                                <input type="checkbox" className="custom-control-input" id="customCheck2" />
                                                <label className="custom-control-label" htmlFor="customCheck2">Create an accout</label>
                                            </div>
                                            <div className="custom-control custom-checkbox d-block">
                                                <input type="checkbox" className="custom-control-input" id="customCheck3" />
                                                <label className="custom-control-label" htmlFor="customCheck3">Ship to a different address</label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-4">
                        <div className="cart-summary border-light">
                            <h5>Cart Total</h5>
                            <ul className="summary-table">
                                <li><span>subtotal:</span> <span>$140.00</span></li>
                                <li><span>delivery:</span> <span>Free</span></li>
                                <li><span>total:</span> <span>$140.00</span></li>
                            </ul>

                            <div className="payment-method">
                                <div className="custom-control custom-checkbox mr-sm-2">
                                    <input type="checkbox" className="custom-control-input" id="cod" checked />
                                    <label className="custom-control-label" htmlFor="cod">Cash on Delivery</label>
                                </div>
                                <div className="custom-control custom-checkbox mr-sm-2">
                                    <input type="checkbox" className="custom-control-input" id="paypal" />
                                    <label className="custom-control-label" htmlFor="paypal">Paypal <img className="ml-15" src="img/core-img/paypal.png" alt="" /></label>
                                </div>
                            </div>

                            <div className="cart-btn mt-100">
                                <a href="#" className="btn amado-btn w-100">Finalizar pedido</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}