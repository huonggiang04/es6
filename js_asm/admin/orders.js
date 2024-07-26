import adminTemplate from "../../views/admin.html?raw";
import orders_admin from "../../views/admin/orders.html?raw";

export function Admin_orders() {
    document.getElementById("template").innerHTML = adminTemplate;
  document.getElementById("app").innerHTML = orders_admin;
}