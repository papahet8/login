const Customer = require("../model/customerModel");

const customerCtrl = {
    getCustomers: async (req, res) => {
        try {
            // res.json({ msg: "get product" });
            const customers = await Customer.find();
            res.json({
                length: customers.length,
                customers
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createCustomers: async (req, res) => {
        try {
            // res.json({ msg: "create product" });
            const { customerName, customerEmail, customerAddress, customerMobile } =
                req.body;

            // if (!images) return res.status(400).json({ msg: "no image found" });

            const customer = await Customer.findOne({ customerName });
            if (customer)
                return res.status(400).json({ msg: "customers already exist" });

            const newCustomer = new Customer({
                customerName,
                customerEmail: customerEmail.toLowerCase(),
                customerAddress,
                customerMobile,
            });

            await newCustomer.save()
            res.json({ msg: "product created successfully" })


        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateCustomers: async (req, res) => {
        try {
            //res.json({ msg: "update product" });

            const { customerName, customerEmail, customerAddress, customerMobile } = req.body;
            const id = req.params.id;

            // if (!images)
            //     return res.status(400).json({ msg: "no image found" });

            await Customer.findOneAndUpdate({ _id: id }, {
                customerName,
                customerEmail: customerEmail.toLowerCase(),
                customerAddress,
                customerMobile,
            });

            return res.status(200).json({ msg: "customer updated successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteCustomers: async (req, res) => {
        try {
            //res.json({ msg: "delete product" });
            const id = req.params.id;
            await Customer.findByIdAndDelete({ _id: id });
            return res.status(200).json({ msg: "customer deleted successfully" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = customerCtrl;
