if (!token) {
    location.href = '../login/login.html'
} else {
    $(function () {

        getStoreList();
    })
}
function getStoreList() {
    $.ajax({
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token.token
        },
        url: `${API_URL}/admin/Stores`,
        success: function (data) {
            let title = 'All Store';
            let body = ` <table class="table table-centered table-nowrap table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Avatar</th>
                <th>Seller</th>
                <th style="width: 85px;">Action</th>
              </tr>
            </thead>
            <tbody>`;
            for (let i = 0; i < data.length; i++) {
                body += `<tr id="${data[i]._id}">
        <td>${i + 1}</td>
        <td><a href="#" onclick = "getStoreDetail('${data[i]._id}')">${data[i].name}</a></td>
        <td>${data[i].imgage}</td>
        <td>${data[i].seller}</td>
        <td>
        <a href="#" onclick = "update('${data[i]._id}')" class="action-icon"> <i class="mdi mdi-square-edit-outline"></i></a>
        <a href="#" onclick = "showConfirmDelete('${data[i]._id}')" class="action-icon"> <i class="mdi mdi-delete"></i></a>
      </td>
    </tr>`
            }
            body += `</tbody></table>`
            $('#title').html(title);
            $('#body').html(body);
        }

    })
}
function showConfirmDelete(id) {
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
            deleteUser(id);
        }
    })
}
function deleteStore(id) {
    $.ajax({
        type: 'DELETE',
        url: `${API_URL}/admin/store/${id}`,
        headers: {
            'Authorization': 'Bearer ' + token.token
        },
        success: function () {
            Swal.fire(
                'Deleted!',
                'Store has been deleted.',
                'success'
            )
            $(`#${id}`).remove();
        }
    })
}
function getStoreDetail(id) {
    $.ajax({
        type: 'GET',
        url: `${API_URL}/admin/stores/detail/${id}`,
        headers: {
            'Authorization': 'Bearer ' + token.token
        },     
        success: function (data) {
            console.log(data)
            let title = 'Store Detail';
            let body = ``;
            let products = data.product
            let user= data.user
            
            let userHTML=`<button type="button" class="btn btn-success mb-2 mr-1" onclick = getUser('${user._id}')>${user.name}</button>`
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
                                <h5 class="font-16 mt-0 sp-line-1"><a href="ecommerce-product-detail.html" class="text-dark">${product.name}</a> </h5>
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
            $('#user').html(userHTML);

        }
    })
}
