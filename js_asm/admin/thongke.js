import adminTemplate from "../../views/admin.html?raw";
import thongke_admin from "../../views/admin/thongke.html?raw";

export function Admin_thongke() {
    document.getElementById("template").innerHTML = adminTemplate;
  document.getElementById("app").innerHTML = thongke_admin;
}