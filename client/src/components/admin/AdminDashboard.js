import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from '../../GlobalContext'
import Customer from "../screens/Customer";



function AdminDashboard() {
    const data = useContext(GlobalContext);
    const [customer] = data.customerApi.customers;
    const isAdmin = data.userAPI.isAdmin;
    const [token] = data.token;
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3 className="display-3 text-warning">Admin Dashboard</h3>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <NavLink to={`/admin/create-product`} className='btn btn-secondary float-end'>Create-Customer</NavLink>
                </div>
            </div>

            <div className="row">
                {
                    customer.map((item, index) => {
                        return <Customer key={index} {...item} isAdmin={isAdmin} token={token} />
                    })
                }
            </div>
        </div>
    );
}

export default AdminDashboard;
