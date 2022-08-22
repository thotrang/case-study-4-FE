if (!token) {
    location.href = '../login/login.html'
} else {
    $(function () {

        getProductList();
    })
}

function getProductList() {
    $.ajax({
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token.token
        },
        url: `${API_URL}/admin/products`,
        success: function (data) {
            let searchProduct = `<button class="btn" onclick="searchProduct()">
                                    <i class="fe-search"></i>
                                </button>`
            let title = 'All Products';
            let body = ` <table class="table table-centered table-nowrap table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Image</th>
                <th>Store</th>
                <th>Price</th>
                <th>Amount</th>
                <th style="width: 85px;">Action</th>
              </tr>
            </thead>
            <tbody>`;
            for (let i = 0; i < data.length; i++) {
                body += `<tr id="${data[i]._id}">
        <td>${i + 1}</td>
        <td><a href="#" onclick= "getProduct('${data[i]._id}')">${data[i].name}</a></td>
        <td>${data[i].image}</td>
        <td>${data[i].store}</td>
        <td>${data[i].price}</td>
        <td>${data[i].amount}</td>
        <td>
        <a href="#" onclick = "updateProduct('${data[i]._id}')" class="action-icon"> <i class="mdi mdi-square-edit-outline"></i></a>
        <a href="#" onclick = "showConfirmDeleteProduct('${data[i]._id}')" class="action-icon"> <i class="mdi mdi-delete"></i></a>
      </td>
    </tr>`
            }
            body += `</tbody></table>`
            $('#title').html(title);
            $('#body').html(body);
            $('#search').html(searchProduct)
        }
    })
}
function searchProduct(){
    $.ajax({
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token.token
        },
    })
}
function showConfirmDeleteProduct(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'

    }).then((result) => {
        if (result.isConfirmed) {
            deleteProduct(id);
        }
    })

}
function deleteProduct(id) {
    console.log('ok');

    $.ajax({
        type: 'DELETE',
        url: `${API_URL}/admin/Products/${id}`,
        headers: {
            'Authorization': 'Bearer ' + token.token
        },
        success: function () {
            Swal.fire(
                'Deleted!',
                'Product has been deleted.',
                'success'
            )
            $(`#${id}`).remove();
        }
    })
}
function getProduct(id) {
    let searchProduct = `<button class="btn" onclick="searchProduct()">
                                    <i class="fe-search"></i>
                                </button>`
    $.ajax({
        type: 'GET',
        url: `${API_URL}/admin/products/${id}`,
        headers: {
            'Authorization': 'Bearer ' + token.token
        },
        success: function (data) {
            let title = "Product Detail";
            let body = `<div class="col-12">
            <div class="card-box">
                <div class="row">
                    <div class="col-lg-5">

                       

                        
                    </div> <!-- end col -->
                    <div class="col-lg-7">
                        <div class="pl-xl-3 mt-3 mt-xl-0">
                            <a href="#" class="text-primary">${data.store}</a>
                            <h4 class="mb-3">${data.name}</h4>
                            <p class="text-muted float-left mr-3">
                                <span class="mdi mdi-star text-warning"></span>
                                <span class="mdi mdi-star text-warning"></span>
                                <span class="mdi mdi-star text-warning"></span>
                                <span class="mdi mdi-star text-warning"></span>
                                <span class="mdi mdi-star"></span>
                            </p>
                            <p class="mb-4"><a href="" class="text-muted">( 36 Customer Reviews )</a></p>
                            <h6 class="text-danger text-uppercase">20 % Off</h6>
                            <h4 class="mb-4">Price : <span class="text-muted mr-2"><del>${data.price}</del></span> <b>${data.price}</b></h4>
                            <h4><span class="badge bg-soft-success text-success mb-4">Instock</span></h4>
                            <p class="text-muted mb-4">${data.description}</p>
                           

                            <div>
                                <button type="button" class="btn btn-danger mr-2"><i class="mdi mdi-heart-outline"></i></button>
                                <button type="button" class="btn btn-success waves-effect waves-light">
                                    <span class="btn-label"><i class="mdi mdi-cart"></i></span>Add to cart
                                </button>
                            </div>
                        </div>
                    </div> <!-- end col -->
                </div>
                <!-- end row -->


                

            </div> <!-- end card-->
        </div>`
            $('#title').html(title);
            $('#body').html(body);
            $('#search').html(searchProduct)
        }
    })
}
