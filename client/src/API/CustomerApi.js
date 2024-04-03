import React, { useState, useEffect } from 'react'
import axios from 'axios'


function CustomerApi() {
    const [customer, setCustomer] = useState([])

    const getCustomers = async () => {
        const res = await axios.get(`http://localhost:5400/api/customers`);
        //console.log(`products = `, res.data);
        setCustomer(res.data.customers);
    }

    useEffect(() => {
        getCustomers();
    }, [])

    return {
        customers: [customer, setCustomer]
    }
}

export default CustomerApi