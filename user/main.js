// const API_URL = "http://localhost:3000";
let totalProduct = 0;
$(function () {
    getProductList();
})

function getProductList() {
    $.ajax({
        type: 'GET',
        url: `${API_URL}/stores`,
        success: function (data) {
            totalProduct = data.length;
            let html = '';
            for (let i = 0; i < data.length; i++) {
                html += `
        <tr id="${data[i]._id}">
            <td>${i + 1}</td>
            <td>${data[i].name}</td>
            <td>${data[i].address}</td>
            <td>${data[i].userid}</td>
            <td><img src="${API_URL}/${data[i].image}" alt=""></td>
         
           <td>
        <button type="button" onclick="showUpdateForm('${data[i]._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Update
        </button>
            
            <td><button class="btn btn-danger" onclick="showConFirmDelete('${data[i]._id}')" )>Delete</button></td>
        </tr>`

            }
            $('#products').html(html);

        }

    })
}

function showConFirmDelete(id) {
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
    $.ajax({
        type: 'DELETE',
        url: `${API_URL}/stores/${id}`,
        success: function () {
            Swal.fire(
                'Deleted!',
                'Product have been deleted.',
                'success'
            )
            console.log(id)
            $(`#${id}`).remove();

        }
    })
}

function resetForm() {
    $('#name').val('');
    $('#address').val('');
    $('#userid').val('');
    $('#image').val('');
}

function createProduct() {
    let name = $('#name').val();
    let address = $('#address').val();
    let userid = $('#userid').val();
    let image = $('#image').val()
    let store = {
        name: name,
        address: address,
        userid: userid,
        image: image
    };

    $.ajax({
        type: 'POST',
        url: `${API_URL}/stores`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(store),
        success: function (data) {
            totalProduct++;
            let html = `<tr id="${data._id}">
            <td>${totalProduct}</td>
            <td>${data.name}</td>
            <td>${data.address}</td>
            <td>${data.userid}</td>
            <td><img src="${API_URL}/${data.image}" alt=""></td>
            <td><button type="button" onclick="showUpdateForm('${data._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">

                 Update
                 </button>

            </td>
            <td><button class="btn btn-danger" onclick="showConFirmDelete('${data._id}')">Delete</button></td>
        </tr>`
            $('#products').append(html);
            resetForm();

        }
    })
}

function showCreateForm() {
    let html = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="createProduct()">Save changes</button>`
    $('#title').html('Create product');
    $('#footer').html(html);

}

function showUpdateForm(id) {
    let html = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="updateProduct('${id}')">Update</button>`
    $('#title').html('Update Product');
    $('#footer').html(html);
    getProduct(id);
}


function updateProduct(id) {
    let name = $('#name').val();
    let address = $('#address').val();
    let userid = $('#userid').val();
    let image = $('#image').val();
    let product = {
        name: name,
        address: address,
        userid: userid,
        image: image,
    };
    $.ajax({
        type: 'PUT',
        url: `${API_URL}/stores/${id}`,
        data: JSON.stringify(product),
        headers: {
            "Content-Type": "application/json"
        },
        success: function (data) {
            let html = `<tr id="${data._id}">
        <td>${totalProduct}</td>
        <td>${data.name}</td>
        <td>${data.address}</td>
        <td>${data.userid}</td>
        <td><img src="${API_URL}/${data.image}" alt=""></td>      
          <td>
        <button type="button" onclick="showUpdateForm('${data._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Update
        </button>
        </td>
        <td><button class="btn btn-danger" onclick="showConFirmDelete('${data._id}')">Delete</button></td>
    </tr>`
            $(`#${id}`).replaceWith(html);
            Swal.fire(
                'Updated!',
                'Product has been updated.',
                'success'
            )
            resetForm();

        }
    })
}


function getProduct(id) {
    $.ajax({
        type: 'GET',
        url: `${API_URL}/stores/detail/${id}`,
        success: function (data) {
            $('#name').val(data.name);
            $('#address').val(data.address);
            $('#userid').val(data.userid);
            $('#image').val(data.image);
        }
    })
}


function searchProduct() {
    let name = $('#nameSearch').val();
    $.ajax({
        type: 'GET',
        url: `${API_URL}/stores/search?name=${name}`,
        headers: {
            "Content-Type": "application/json"
        },
        success: function (data) {
            console.log(data)
            totalProduct = data.length;
            let html = '';
            for (let i = 0; i < data.length; i++) {
                html += `
        <tr id="${data[i]._id}">
            <td>${i + 1}</td>
            <td>${data[i].name}</td>
            <td>${data[i].address}</td>
            <td>${data[i].userid}</td>
            <td><img src="${API_URL}/${data[i].image}" alt=""></td>
         
           <td>
        <button type="button" onclick="showUpdateForm('${data[i]._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Update
        </button>
            
            <td><button class="btn btn-danger" onclick="showConFirmDelete('${data[i]._id}')" )>Delete</button></td>
        </tr>`

            }
            $('#products').html(html);

        },
        error: function (xhr, ajaxOptions, thrownError) {
            // alert(xhr.status);
            Swal.fire('product not exist')
        }

    })

}

function findProductOnCategory(_id) {
    $.ajax({
        type: 'GET',
        url: `${API_URL}/products/${_id}`,
        success: function (product) {
            console.log(product)
            let array = product.length
            let html = '';
            for (let i = 0; i < array; i++) {
                html += `
                    <div class="block2">
						<div class="block2-pic hov-img0">
							<img src=${product[i].image} alt="IMG-PRODUCT">
							<button class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
								Quick view
							</button>
						</div>
						<div class="block2-txt flex-w flex-t p-t-14">
							<div class="block2-txt-child1 flex-col-l ">
								<a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
									${product[i].name}
								</a>

								<span class="stext-105 cl3">
									$${product[i].price}
								</span>
							</div>
						</div>
					</div>`;
                console.log(html)
                $('#findCategory').html(html)
            }

        },
        error: function(err){
            console.log(err)
        }
    })
}

function SortProduct(products) {

}