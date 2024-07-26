// var cart = []
var web = {};
class Show_Admin {
  async customers() {
    let dskh = document.querySelector(".dskh");
    // console.log(dskh);
    let view_orders = await web.orders;
    // console.log(view_orders);
    Object.entries(view_orders).forEach(([key, value]) => {
      dskh.innerHTML += `<tr>
            <th scope="row">${value.id}</th>
            <td>${value.customer_name}</td>
            <td>${value.customer_address}</td>
            <td>${value.customer_email}</td>
            <td>${value.customer_phone_number}</td>
            <td>${value.status}</td>
          </tr>`;
    })
  }
  async showaddsp() {
    let view_categories = web.categories;
    // console.log(view_categories);
    let addsp = document.querySelector(".show_add_sp");
    // console.log(addsp);
    addsp.innerHTML = '';
    let selectOptionsHTML = `<select id="iddm">
                                  <option value="">Chọn danh mục</option>`;
    // chuyen doi tuong thanh mang con
    // Duyệt qua mỗi danh mục và thêm tùy chọn vào chuỗi HTML
    Object.entries(view_categories).forEach(([key, value]) => {
      selectOptionsHTML += `<option id="cate_id" value="${value.id}">${value.name}</option>`;
    });

    selectOptionsHTML += `</select>`;

    // Gán chuỗi HTML vào phần tử addsp
    addsp.innerHTML = selectOptionsHTML;
    addsp.innerHTML += ` <div>
        <label for="namesp" class="form-label">Tên sản phẩm</label>
        <input type="text" class="form-control" id="namesp">
        </div>
        <div>
        <label for="image" class="form-label">Hình ảnh</label>
        <input type="file" id="image" multiple required />
        </div>
        <div>
              <label for="price" class="form-label">Giá</label>
        <input type="price" class="form-control" id="price">
        </div>
        <div>
        <label for="detail" class="form-label">Mô tả</label>
        <textarea type="detail" class="form-control" id="detail" rows="5" cols="20"> </textarea>
        </div>
      </div>
      <button type="submit" class="btn btn-primary nhapsp" >Nhập</button>
      <button type="button" class="btn btn-primary"> <a href="/admin/DS_product" style="color: white; text-decoration: none;">Danh sách</a></button>
      <button type="button" class="btn btn-primary">Làm mới</button>`;
    // console.log(addsp);
    // Sự kiện click của nút "Nhập"
    document.querySelector('.nhapsp').addEventListener('click', async (event) => {
      event.preventDefault(); // Chặn hành vi mặc định của trình duyệt
      // Lấy giá trị 
      let cate_id = document.getElementById('cate_id').value;
      let id = web.products.length + 1;
      let name = document.getElementById('namesp').value;
      let image = document.getElementById('image').value;
      let price = document.getElementById('price').value;
      let detail = document.getElementById('detail').value;
      // Tạo đối tượng từ các giá trị đã lấy
      if (cate_id !== '' || name !== '' || image !== '' || price !== '' || detail !== '') {
        let newProduct = { cate_id, id, name, image, price, detail };
        await this.addProductToFirebase(newProduct);
      }
      name = '';
      image = '';
      price = '';
      detail = '';

    });
  }
  async showdssp() {
    let listsp = document.querySelector(".dssp");
    // console.log(listsp);
    let view_dssp = await web.products;
    // console.log(view_dssp);
    Object.entries(view_dssp).forEach(([key, value]) => {
      listsp.innerHTML += `<tr>
                <th scope="row">${value.id}</th>
                <td><img src="${value.image}" style="height: 100px"></td>
                <td>${value.name}</td>
                <td>${value.price}</td>
                <td><button type="submit" data-product-id = ${key} class="btn btn-primary btn_update">Sửa</button> 
                <button type="submit"  data-product-id = ${key}  class="btn btn-danger btn_delete">Xóa</button></td>
              </tr>
   `;

      const deleteButtons = document.querySelectorAll('.btn_delete');
      deleteButtons.forEach(button => {
        // console.log(button);
        button.addEventListener('click', (event) => {
          const productId = event.target.dataset.productId;
          //  alert(productId)
          if (productId) {
            this.deleteProductFromFirebase(productId);
          } else {
            console.error("Không tìm thấy ID của sản phẩm để xóa.");
          }
        });
      });

      // sửa 
      const updateButtons = document.querySelectorAll('.btn_update');
      updateButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
          const productId = event.target.dataset.productId;
          if (productId) {
            await this.showUpdateForm(productId);
          } else {
            console.error("Không tìm thấy ID của sản phẩm để sửa.");
          }
        });
      });
    })
  }
  async showUpdateForm(productId) {
    // Lấy thông tin sản phẩm từ web.products
    const productToUpdate = web.products[productId];

    // Hiển thị form sửa sản phẩm
    let updateForm = document.querySelector(".update");
    updateForm.innerHTML = `
    <h1 style="text-align: center;">SỬA SẢN PHẨM</h1>
        <label for="update_namesp" class="form-label">Tên sản phẩm</label>
        <input type="text" class="form-control" id="update_namesp" value="${productToUpdate.name}">
        <label for="update_image" class="form-label">Hình ảnh</label>
        <input type="file" id="update_image" value="<img src='${productToUpdate.image}'>" multiple required />
        <label for="update_price" class="form-label">Giá</label>
        <input type="price" class="form-control" id="update_price" value="${productToUpdate.price}">
        <label for="update_detail" class="form-label">Mô tả</label>
        <textarea type="detail" class="form-control" id="update_detail" rows="5" cols="20">${productToUpdate.detail}</textarea>
        <button type="submit" class="btn btn-primary update_product">Cập nhật</button>
    `;

    // Bắt sự kiện click cho nút cập nhật
    const updateButton = document.querySelector('.update_product');
    updateButton.addEventListener('click', async () => {
      const updatedProduct = {
        id: productToUpdate.id,
        name: document.getElementById('update_namesp').value,
        image: document.getElementById('update_image').value,
        price: document.getElementById('update_price').value,
        detail: document.getElementById('update_detail').value
      };
      await this.updateProductInFirebase(productId, updatedProduct);
    });
  }

  async updateProductInFirebase(productId, updatedProduct) {
    const productUrl = `https://assigmentes6-pd08459-default-rtdb.firebaseio.com/products/${productId}.json`;

    try {
      const response = await fetch(productUrl, {
        method: 'PUT',
        body: JSON.stringify(updatedProduct)
      });

      if (response.ok) {
        console.log(`Sản phẩm có ID ${productId} đã được cập nhật thành công.`);
        location.reload();
      } else {
        console.error(`Cập nhật sản phẩm thất bại.`, response.status, response.statusText);
      }
    } catch (error) {
      console.error("Cập nhật sản phẩm thất bại:", error);
    }
  }
  async showdm() {
    let listdm = document.querySelector(".showdm");
    // console.log(listdm);
    let view_categories = await web.categories;
    //   console.log(view_products);

    Object.entries(view_categories).forEach(([key, value]) => {
      listdm.innerHTML += `<tr>
                <th scope="row">${value.id}</th>
                <td>${value.name}</td>
              </tr>
   `;
    })
  }
  async showadddm() {
    let adddm = document.querySelector(".show_add_dm")
    adddm.innerHTML = `    <div class="mb-3">
        <label for="namedm" class="form-label">Tên danh mục</label>
        <input type="text" class="form-control" id="namedm">
      </div>
      <button type="submit" class="btn btn-primary addcate">Nhập</button>
      <button type="button" class="btn btn-primary"> <a href="/admin/DS_categories" style="color: white; text-decoration: none;">Danh sách</a></button>
      <button type="button" class="btn btn-primary">Làm mới</button>`;
    document.querySelector('.addcate').addEventListener('click', async (event) => {
      event.preventDefault(); // Chặn hành vi mặc định của trình duyệt

      // Lấy giá trị 
      let id = web.categories.length + 1;
      let name = document.getElementById('namedm').value;
      // Tạo đối tượng từ các giá trị đã lấy
      let newCate = { id, name };

      // Gọi hàm thêm sản phẩm vào Firebase
      await this.addCategoriesToFirebase(newCate);
      name = '';
    });

  }
  async addProductToFirebase(newProduct) {
    try {
      const imageFile = document.getElementById('image').files[0];
      const reader = new FileReader();

      reader.onload = async function (e) {
        const imageDataUrl = e.target.result;
        newProduct.image = imageDataUrl;

        const response = await fetch('https://assigmentes6-pd08459-default-rtdb.firebaseio.com/products.json', {
          method: "POST",
          body: JSON.stringify(newProduct)
        });

        if (!response.ok) {
          throw new Error('Có lỗi xảy ra khi gửi dữ liệu!');
        }

        let sucDiv = document.createElement('div');
        sucDiv.textContent = 'THÊM SẢN PHẨM THÀNH CÔNG!!!';
        sucDiv.style.color = 'green';
        sucDiv.style.textAlign = 'center';
        sucDiv.style.fontSize = '20px';
        sucDiv.style.marginTop = '-50px';
        // Chèn phần tử div vào vị trí mong muốn trong DOM
        document.body.appendChild(sucDiv); // Ví dụ: chèn vào body của trang web
        location.reload();
      };

      reader.readAsDataURL(imageFile);
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm: ", error);
      // Tạo một phần tử div để chứa thông báo lỗi
      let errorDiv = document.createElement('div');
      errorDiv.textContent = 'CẦN NHẬP ĐẦY ĐỦ THÔNG TIN!!!';
      errorDiv.style.color = 'red';
      errorDiv.style.textAlign = 'center';
      errorDiv.style.fontSize = '20px';
      errorDiv.style.marginTop = '-50px';
      // Chèn phần tử div vào vị trí mong muốn trong DOM
      document.body.appendChild(errorDiv); // Ví dụ: chèn vào body của trang web

    }
  }

  async addCategoriesToFirebase(newCate) {

    try {
      const response = await fetch('https://assigmentes6-pd08459-default-rtdb.firebaseio.com/categories.json', {
        method: "POST",
        body: JSON.stringify(newCate)
      });

      if (!response.ok) {
        throw new Error('Có lỗi xảy ra khi gửi dữ liệu!');
      }

      console.log("Dữ liệu sản phẩm đã được gửi đến Firebase Realtime Database thành công!");

      // Thêm sản phẩm vào biến web
      web.categories = web.categories || []; // Khởi tạo web.products nếu chưa tồn tại
      web.categories.push(newCate);
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm: ", error);
    }
  }
  async deleteProductFromFirebase(productId) {
    // Tạo URL đầy đủ của sản phẩm muốn xóa
    const productUrl = `https://assigmentes6-pd08459-default-rtdb.firebaseio.com/products/${productId}.json`;

    try {
      const response = await fetch(productUrl, {
        method: 'DELETE'
      });

      if (response.ok) {
        console.log(`Sản phẩm có ID ${productId} đã được xóa thành công từ Firebase.`);
        location.reload()
      } else {
        console.error(`Xóa sản phẩm thất bại.`, response.status, response.statusText);
      }
    } catch (error) {
      console.error("Xóa sản phẩm thất bại:", error);
    }
  }


  async getAPI_admin() {
    await fetch('https://assigmentes6-pd08459-default-rtdb.firebaseio.com/.json')
      .then(res => res.json())
      .then(data => {
        web = data
        this.customers()
        this.showaddsp()
        this.showdssp()
        this.showdm()
        this.showadddm()
      })
  }
}
var Admin = new Show_Admin()
export default Admin 
