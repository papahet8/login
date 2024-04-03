import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

function Customer(props) {
    const navigate = useNavigate();
    const { _id, customerName, customerEmail, customerAddress, customerMobile, isAdmin, token } = props;

    const deleteCustomer = async (id) => {
        if (window.confirm(`are you sure you want to delete customer?`)) {
            const res = await axios.get(`http://localhost:5400/api/customers`);
            //console.log('product=', res.data);

            let customer = res.data.customers.find((item) => item._id === id);
            //console.log('single=', product);


            //deleteing from db
            await axios.delete(`http://localhost:5400/api/customers/${id}`, {
                headers: { Authorization: token }
            });

            toast.success("product deleted successfully");
            window.location.reload();
            navigate(`/admin`);

        } else {
            toast.warning("delete terminated");
        }
    }
    return (
        <div className="col-md-4 mt-2 mb-2">
            <div className="card">

                <div className="card-body">
                    <h6 className="text-center">{customerName}</h6>
                    <span className='float-end'>customerEmail: &#8377; {customerEmail} </span>
                </div>

                <div className="card-footer">
                    {
                        props.isAdmin ? (
                            <div>
                                <NavLink to={`/admin/edit-product/${_id}`} className="btn btn-info">Edit</NavLink>
                                <button className='btn btn-danger float-end'>Delete</button>
                            </div>
                        ) : (
                            <NavLink to={"#!"} className="btn btn-outline-secondary"> Add to cart </NavLink>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Customer