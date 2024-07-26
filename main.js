import './style.css';
import Navigo from 'navigo'; // When using ES modules.

import { home } from "./js_asm/home.js";
import { contact } from './js_asm/contact.js';
import { listProduct } from './js_asm/listProduct.js';
import { checkout } from './js_asm/checkout.js';
import { Admin_products } from "./js_asm/admin/products.js";
import { Admin_thongke } from "./js_asm/admin/thongke.js";
import { Admin_DS_products } from "./js_asm/admin/products.js";
import { Admin_categories } from "./js_asm/admin/categories.js";
import { Admin_DS_categories } from "./js_asm/admin/categories.js";
import { Admin_customers } from "./js_asm/admin/customers.js";
import { Admin_orders } from "./js_asm/admin/orders.js";
import Home from './js_asm/CN_home.js'
import Admin from './js_asm/admin/CN_admin.js'



const router = new Navigo('/');
router.on('/', function () {
home();
Home.initApp()
Home.showsp()
Home.showdssp()
})
.on('/contact', function () {
 contact();
})
.on('/listProduct', function () {
  listProduct();
  Home.initApp()
Home.showallsp()
Home.showdssp()
})
.on('/checkout', function () {
  checkout();
  Home.showdssp()
  Home.initApp()

})
// ADMIN
.on('/admin', function () {
  Admin_thongke();
  Admin.getAPI_admin()
})
.on('/admin/categories', function () {
  Admin_categories();
  Admin.getAPI_admin()
})
.on('/admin/DS_categories', function () {
  Admin_DS_categories()
  Admin.getAPI_admin()
})
.on('/admin/products', function () {
  Admin_products()
  Admin.getAPI_admin()
})
.on('/admin/DS_product', function () {
  Admin_DS_products()
  Admin.getAPI_admin()
})
.on('/admin/customers', function () {
  Admin_customers();
  Admin.getAPI_admin()
})
.on('/admin/orders', function () {
  Admin_orders();
  Admin.getAPI_admin()
});
router.resolve();
