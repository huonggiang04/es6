import adminTemplate from "../../views/admin.html?raw";
import categories_admin from "../../views/admin/categories.html?raw";
import ds_products_admin from "../../views/admin/DS_categories.html?raw";


export function Admin_categories() {
    document.getElementById("template").innerHTML = adminTemplate;
  document.getElementById("app").innerHTML = categories_admin;
}
export function Admin_DS_categories() {
  document.getElementById("template").innerHTML = adminTemplate;
document.getElementById("app").innerHTML = ds_products_admin;
}