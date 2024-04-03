import React, { useContext } from 'react'
import { GlobalContext } from '../../GlobalContext'
import Customer from './Customer';

function Home() {
    const data = useContext(GlobalContext)
    const [customer] = data.customerApi.customers;

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3 className="display-3 text-success">Home</h3>
                </div>
            </div>
            <div className="row">
                {
                    customer.map((item, index) => {
                        return <Customer key={index} {...item} />
                    })
                }
            </div>
        </div>
    )
}

export default Home