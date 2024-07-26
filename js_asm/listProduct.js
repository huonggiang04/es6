import userTemplate from "../views/user_template.html?raw";
import listProductpage from '../views/listProduct.html?raw';

export function listProduct() {
    document.getElementById("template").innerHTML = userTemplate;
  document.getElementById("app").innerHTML = listProductpage;
}