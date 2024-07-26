import adminTemplate from "../../views/admin.html?raw";
import products_admin from "../../views/admin/product.html?raw";
import ds_products_admin from "../../views/admin/DS_product.html?raw";

export function Admin_products() {
    document.getElementById("template").innerHTML = adminTemplate;
  document.getElementById("app").innerHTML = products_admin;
}

export function Admin_DS_products() {
  document.getElementById("template").innerHTML = adminTemplate;
document.getElementById("app").innerHTML = ds_products_admin;

}
