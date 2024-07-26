import userTemplate from "../views/user_template.html?raw";
import homepage from '../views/home.html?raw';

export function home() {
    document.getElementById("template").innerHTML = userTemplate;
    document.getElementById("app").innerHTML = homepage;
}