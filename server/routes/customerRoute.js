const route = require("express").Router();
const customerCtrl = require("../controller/customerCtrl");
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");

route.get(`/customers`, customerCtrl.getCustomers);
route.post(`/customers`, auth, adminAuth, customerCtrl.createCustomers);
route.put(`/customers/:id`, auth, adminAuth, customerCtrl.updateCustomers);
route.delete(`/customers/:id`, auth, adminAuth, customerCtrl.deleteCustomers);

module.exports = route;
