import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../GlobalContext";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";



const initialState = {
    customerName: "",
    customerEmail: "",
    customerAddress: "",
    customerMobile: "",
};

function UpdateProduct() {
    const data = useContext(GlobalContext);
    const [customer, setCustomer] = useState(initialState);
    const [isAdmin] = data.userAPI.isAdmin;
    const [token] = data.token;
    const params = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const getSingleCustomer = async () => {
            const res = await axios.get(`http://localhost:5400/api/customers`);
            //console.log('products =', res.data.products);
            let data = res.data.customers.find((item) => item._id === params.id);
            //console.log('single =', data);

            setCustomer(data)
        }
        getSingleCustomer()
    }, []);


    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const res = await axios.put(
                `/api/customers/${params.id}`,
                { ...customer },
                {
                    headers: { Authorization: token },
                }
            );

            setCustomer(initialState);
            toast.success("customer updated");
            window.location.href = "/admin";
            navigate(`/admin`);
        } catch (err) {
            toast.error(err.response.data.msg);
        }
    };

    return (
        <div className="container " style={{ marginTop: "60px" }}>
            <div className="row">
                <div className="col-md-4">
                    <div className="card upload" style={{ height: '450px' }}>
                        <div className="card-body">

                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-header">
                                <h5 className="text-center">
                                    Update Product
                                </h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group mt-2">
                                        <label htmlFor="product_id">customerName</label>
                                        <input type="text" name="product_id" id="product_id" value={customer.customerName}
                                            onChange={handleChangeInput} className="form-control" required />
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="title">customerEmail</label>
                                        <input type="text" name="title" id="title" value={customer.customerEmail}
                                            onChange={handleChangeInput} className="form-control" required />
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="price">customerAddress</label>
                                        <input type="text" name="price" id="price" value={customer.customerAddress}
                                            onChange={handleChangeInput} className="form-control" required />
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="desc">customerMobile</label>
                                        <input type="text" name="desc" id="desc" value={customer.customerMobile}
                                            onChange={handleChangeInput} className="form-control" required />
                                    </div>

                                    <div className="form-group mt-2">
                                        <input type='submit' value='Update Customer' className="btn btn-success" />
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateProduct;
