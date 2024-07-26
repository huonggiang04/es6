var cart = []
var web = []
class Show_Home {
    async showdssp() {
        let dssp = document.querySelector(".dssp");
        //   console.log(dssp);
        let view_categories = await web.categories;
        Object.entries(view_categories).forEach(([key,value]) => {
            dssp.innerHTML += `<li class="sub-nav_item " style="margin-left:-10px;">
            <a href="#" class="sub-nav_link heading theodm" data-id=${value.id}>${value.name}</a>
        </li>`;
        })
        this.set_cate()
    }
    async showsp() {
        let sanpham = await document.querySelector(".allsp");
        //   console.log(sanpham);
        let view_products = web.products;
        //   console.log(view_products);
        let i = 0;
        Object.entries(view_products).forEach(([key,value]) => {
            if (i < 8) {
                sanpham.innerHTML += `<div class="col-md-3 col-sm-6 sp">
      <div class="products">
         <div class="thumbnail"><a href=""><img src="${value.image}" alt="Product Name"></a></div>
         <div class="productname">${value.name}</div>
         <h4 class="price">${value.price}</h4>
         <div style="margin-left: 10px">
         <button><a data-id = ${key} class="btn-click" href="" class="add-cart"> Add To Cart</a></button>
         <button class="button compare" type="button"><i class="fa fa-exchange"></i></button>
         <button class="button wishlist" type="button"><i class="fa fa-heart-o"></i></button>
         </div>
      </div>
   `;
                i++;
            }
        })
        this.setID()
    }
    async showallsp() {
        let sanpham = await document.querySelector(".showallsp");
        //   console.log(sanpham);
        let view_products = web.products;
        //   console.log(view_products);
        Object.entries(view_products).forEach(([key,value]) => {
                sanpham.innerHTML += `<div class="col-md-3 col-sm-6 sp">
      <div class="products">
         <div class="thumbnail"><a href=""><img src="${value.image}" alt="Product Name"></a></div>
         <div class="productname">${value.name}</div>
         <h4 class="price">${value.price}</h4>
         <div style="margin-left: 10px">
         <button><a data-id = ${key} class="btn-click" href="#" class="add-cart"> Add To Cart</a></button>
         <button class="button compare" type="button"><i class="fa fa-exchange"></i></button>
         <button class="button wishlist" type="button"><i class="fa fa-heart-o"></i></button>
         </div>
      </div>
   `;
        })
        this.setID()
    }
    setID = () => {
        let btn_click = document.querySelectorAll('.btn-click')
        // console.log(                         btn_click);
        for (var i = 0; i < btn_click.length; i++) {
            btn_click[i].addEventListener('click', (e) => this.addcarrt(e))
        }
    }
    addcarrt(e) {
        let click_id = e.target.dataset.id
        // click_id = Number(click_id, 10)
        console.log(click_id);
        let position_Cart = Object.entries(cart).findIndex(([key,value]) => value.product_id === click_id )
        // console.log(position_Cart);
        if (cart.length <= 0) {
            cart = [{
                product_id: click_id,
                quantity: 1
            }]
            // console.log(cart);
        }else if(position_Cart < 0 ){
            cart.push({
                product_id: click_id,
                quantity :1
            })
        }else{
            cart[position_Cart].quantity = cart[position_Cart].quantity + 1
        }
        // console.log(cart);
        // localStorage.setItem('Cart_local', JSON.stringify(cart))
        this.show_cart()
    }
    delete_item() {
        let delete_sp = document.querySelectorAll('.delete_item');
        delete_sp.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Ngăn chặn hành vi mặc định khi click vào thẻ a
                let id_delete = parseInt(e.target.parentElement.dataset.id); // Lấy id từ thuộc tính data-id của thẻ a
                let index = cart.findIndex(item => item.product_id === id_delete);
                if (index !== -1) {
                    cart.splice(index, 1);
                    localStorage.setItem('Cart_local', JSON.stringify(cart))
                    this.show_cart()
                    window.location.reload(false);
                }
            });
        });
    }
    show_cart() {
        // console.log(cart);
        let productss = web.products;
        document.querySelector('.show_CartHTML').innerHTML = '';
        let tong = 0;
        // console.log(productss);
        cart.forEach(item_cart => {
            console.log(item_cart);
            let position_Show = Object.entries(productss).find(([key,value]) => key === item_cart.product_id)
            console.log(position_Show[0]);
            tong += position_Show[1].price * item_cart.quantity;
            // let infor = productss[position_Show[1]]
            // console.log(infor);
            document.querySelector('.show_CartHTML').innerHTML += `
             <li>
                 <div class="cart-item">
                    <div class="image"><img src="${position_Show[1].image}" alt=""></div>
                     <div class="item-description">
                         <p class="name">${position_Show[1].name}</p>
                     </div>
                     <div class="item-description">
                         <p class="quantity">${item_cart.quantity}</p>
                     </div>
                     <div class="right">
                         <p class="price">${position_Show[1].price}</p>
                         <a href="#" data-id="${position_Show[1]}" class="remove delete_item"><img src="images/remove.png" alt="remove"></a>
                     </div>
                 </div>
             </li>`;
            
    
        });
        // Hiển thị tổng giá trị của tất cả các sản phẩm trong giỏ hàng
        document.querySelector('.show_CartHTML').innerHTML += ` <li> 
        <span class="total">Total <strong>${tong}</strong></span>
        <button class="checkout" onClick="location.href='/checkout'">CheckOut</button></li>`;
        this.delete_item();

    }
    Pay_Price() {
        document.querySelector('.thanhtoan').onclick = () => {
            let name = document.getElementById('name').value;
            let phonenumber = document.getElementById('phonenumber').value;
            let address = document.getElementById('address').value;
    
            if (cart.length > 0 && name !== '' && phonenumber  !== '' && address !== '' ) {
            alert(`Thanh toán thành công`)
                document.querySelector('.checkoutsp').innerHTML = '';
                cart = [];
                localStorage.setItem('Cart_local', JSON.stringify(cart));
                window.location.reload(false); // Reload trang để làm mới giỏ hàng
            } else {
                alert(`Giỏ hàng hoặc tên hoặc số điện thoại hoặc địa chỉ của bạn đang trống. Vui lòng thêm sản phẩm để tiến hành thanh toán
                `)
            }
        }
    }
    set_cate = () => {
        let click_cate = document.querySelectorAll('.theodm')
        // console.log(click_cate);
        for (var i = 0; i < click_cate.length; i++) {
            click_cate[i].addEventListener('click', (e) => this.sptheodm(e))
            // console.log(click_cate[i]);
        }
    }
    sptheodm = (e) => {
        let view_sp_cate = e.target.dataset.id
        view_sp_cate = Number(view_sp_cate, 10)
        // console.log(view_sp_cate);
        let i = web.products.filter(xem_prod => xem_prod.cate_id === view_sp_cate);
        // console.log(i);
        document.querySelector(".showallsp").innerHTML = ``;
        Object.entries(i).forEach(([key,value]) => {            
            document.querySelector(".showallsp").innerHTML +=  `<div class="col-md-3 col-sm-6 sp">
          <div class="products">
             <div class="thumbnail"><a href=""><img src="${value.image}" alt="Product Name"></a></div>
             <div class="productname">${value.name}</div>
             <h4 class="price">${value.price}</h4>
             <div style="margin-left: 10px">
             <button><a data-id = ${value.id} class="btn-click" href="" class="add-cart"> Add To Cart</a></button>
             <button class="button compare" type="button"><i class="fa fa-exchange"></i></button>
             <button class="button wishlist" type="button"><i class="fa fa-heart-o"></i></button>
             </div>
          </div>
       `;
        
        })
      }
    show_checkout(){
        // console.log(cart);
        let productss = web.products;
        document.querySelector('.checkoutsp').innerHTML = '';
    
        let tong = 0; 
    // console.log(productss);
    cart.forEach(item_cart => {
        console.log(item_cart);
        let position_Show = Object.entries(productss).find(([key,value]) => key === item_cart.product_id)
        console.log(position_Show[0]);
        tong += position_Show[1].price * item_cart.quantity;
            
    
            // Tính tổng giá trị của tất cả các sản phẩm trong giỏ hàng

            document.querySelector('.checkoutsp').innerHTML += `<tr>
            <td><img src="${position_Show[1].image}" alt=""></td>
            <td>
              <div class="shop-details">
                <div class="productname">
                 ${position_Show[1].name}
                </div>
              </div>
            </td>
            <td> <h5> ${item_cart.quantity}  </h5> </td>
            <td> <h5>${position_Show[1].price}</h5></td>
           
            <td>
              <a href="#"  data-id = "${position_Show[1]}" class="remove delete_item" >
                <img src="images/remove.png" alt="">
              </a>
            </td>
          </tr>`;
          tong += position_Show[1].price * item_cart.quantity;
     
        });
    
        // Hiển thị tổng giá trị của tất cả các sản phẩm trong giỏ hàng
        document.querySelector('.shippingbox').innerHTML = ` <div class="grandtotal" >
        <h5>Tổng</h5>
        <span>${tong}</span>
      </div>
      <button style="margin-left: 35%;" class="thanhtoan">
        Thanh Toán Ngay
      </button>`;
    //   const checkoutButton = document.querySelector('.checkout');
    // checkoutButton.addEventListener('click', () => {
    //     // Chuyển hướng đến trang thanh toán khi người dùng nhấp vào nút "CheckOut"
    //     window.location.href = '/checkout';
    // });

        this.delete_item();
        this.Pay_Price();
        

    }
    async initApp() {
        await fetch('https://assigmentes6-pd08459-default-rtdb.firebaseio.com/.json')
            .then(res => res.json())
            .then(data => {
                web = data
                this.showdssp()
                this.showsp()
                this.showallsp()
                // this.loadCart()
                this.show_checkout()
                this.show_cart()
                // console.log(products);
            })
    }
}
var Home = new Show_Home()
export default Home 
