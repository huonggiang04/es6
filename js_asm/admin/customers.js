import adminTemplate from "../../views/admin.html?raw";
import customers_admin from "../../views/admin/customers.html?raw";

export function Admin_customers() {
    document.getElementById("template").innerHTML = adminTemplate;
  document.getElementById("app").innerHTML = customers_admin;
}