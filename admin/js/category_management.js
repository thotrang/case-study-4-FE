if (!token) {
    location.href = '../login/login.html'
} else {
    $(function () {

        getUserList();
    })
}
function getCategoryList() {

    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + token.token
        },
        url: `${API_URL}/admin/category`,
        success: function (data) {
            let title = 'All Category';
            let body = ` <table class="table table-centered table-nowrap table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
                <th style="width: 85px;">Action</th>
              </tr>
            </thead>
            <tbody>`;
            for (let i = 0; i < data.length; i++) {
                body += `<tr id="${data[i]._id}">
        <td>${i + 1}</td>
        <td><a href="#" onclick= "getCategory('${data[i]._id}')">${data[i].name}</a></td>
        <td>
        <a href="#" onclick = "updateProduct('${data[i]._id}')" class="action-icon"> <i class="mdi mdi-square-edit-outline"></i></a>
        <a href="#" onclick = "showConfirmDeleteCategory('${data[i]._id}')" class="action-icon"> <i class="mdi mdi-delete"></i></a>
      </td>
    </tr>`
            }
            body += `</tbody></table>`
            $('#title').html(title);
            $('#body').html(body);
        }
    })
}
function getCategory(id){
    $.ajax({
        headers:{
            'Authorization': 'Bearer ' + token.token
        },
        url: `${API_URL}/admin/category/${id}`,
        success: function (data) {
            let title = 'Category Detail';
            let body = ``;
            let products = data.product
            console.log(products);
            for(let product of products){
                body+=`<div class="col-md-6 col-xl-3">
                <div class="card-box product-box">

                    <div class="product-action">
                        <a href="javascript: void(0);" class="btn btn-success btn-xs waves-effect waves-light"><i class="mdi mdi-pencil"></i></a>
                        <a href="javascript: void(0);" class="btn btn-danger btn-xs waves-effect waves-light"><i class="mdi mdi-close"></i></a>
                    </div>

                    <div class="bg-light">
                        <img src="${product.image}" alt="product-pic" class="img-fluid" />
                    </div>

                    <div class="product-info">
                        <div class="row align-items-center">
                            <div class="col">
                                <h5 class="font-16 mt-0 sp-line-1"><a href="getProduct(${product._id})" class="text-dark">${product.name}</a> </h5>
                                <div class="text-warning mb-2 font-13">
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                </div>
                                <h5 class="m-0"> <span class="text-muted"> Stocks : ${product.amount}</span></h5>
                            </div>
                            <div class="col-auto">
                                <div class="product-price-tag">
                                    $${product.price}
                                </div>
                            </div>
                        </div> <!-- end row -->
                    </div> <!-- end product info-->
                </div> <!-- end card-box-->
            </div> <!-- end col-->`
            }
            $('#title').html(title);
            $('#body').html(body);

        }

    })
}