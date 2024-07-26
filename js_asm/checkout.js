import userTemplate from "../views/user_template.html?raw";
import checkoutpage from '../views/checkout.html?raw';

export function checkout() {
    document.getElementById("template").innerHTML = userTemplate;
  document.getElementById("app").innerHTML = checkoutpage;
}