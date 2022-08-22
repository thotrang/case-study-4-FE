
const API_URL = 'http://localhost:3000';
let token = JSON.parse(localStorage.getItem('accessToken'));
let totalProduct = 0;
if (!token) {
    location.href = 'login.html'
} else {
    $(function () {
        getProductList();
    })
}

function drawCategorySelectOption() {
    $.ajax({
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token.token
        },
        url: `${API_URL}/user/category`,
        success: function (data) {
            let html = '<option>Select category</option>';
            for (let category of data) {
                html += `<option value="${category._id}">${category.name}</option>`
            }
            $('#category').html(html);
        }
    })
}

function getProductList() {
    $.ajax({
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token.token
        },
            url: `${API_URL}/user/products`,
        success: function (data) {
            console.log(data);
            totalProduct = data.length;
            let html = '';
            for (let i = 0; i < data.length; i++) {
                console.log(data[i].category[0].name);
                html += `<tr id="${data[i]._id}">
                    <td>${i + 1}</td>
                    <td>${data[i].name}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].amount}</td>
                    <td><img src="${API_URL}/${data[i].image}" alt=""></td>
                    <td>${data[i].category ? data[i].category[0].name : ''}</td>
                    <td>
                    <button type="button" onclick="showUpdateForm('${data[i]._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Update
                    </button>
                    </td>
                    <td><button class="btn btn-danger" onclick="showConfirmDelete('${data[i]._id}')">Delete</button></td>
                </tr>`

            }
            $('#products').html(html);
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
            deleteProduct(id);
        }
    })
}

function deleteProduct(id) {
    $.ajax({
        type: 'DELETE',
        url: `${API_URL}/user/products/${id}`,
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

function resetForm() {
    $('#name').val('');
    $('#price').val('');
    $('#amount').val('');
    $('#image').val('');
    $('#description').val('');
}

function createProduct() {
    let name = $('#name').val();
    let price = $('#price').val();
    let amount = $('#amount').val();
    let image = $('#image').val();
    let description = $('#description').val();
    let categoryId = $('#category').val();
    let product = {
        name: name,
        price: price,
        amount: amount,
        image: image,
        description: description,
        category: {
            _id: categoryId
        }
    };
    $.ajax({
        type: 'POST',
        url: `${API_URL}/user/products`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token.token
        },
        data: JSON.stringify(product),
        success: function (data) {
            console.log(data)
            totalProduct++;
            let html = `<tr id="${data._id}">
        <td>${totalProduct}</td>
        <td>${data.name}</td>
        <td>${data.price}</td>
        <td>${data.amount}</td>
        <td><img src="${API_URL}/${data.image}" alt=""></td>
        <td>${data.category ? data.category[0].name : ''}</td>
        <td>
        <button type="button" onclick="showUpdateForm('${data._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Update
        </button>
        </td>
        <td><button class="btn btn-danger" onclick="showConfirmDelete('${data._id}')">Delete</button></td>
    </tr>`
            $('#products').append(html);
            resetForm();
        }
    })
}

function showCreateForm() {
    drawCategorySelectOption();
    resetForm();
    let html = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="createProduct()">Create</button>`
    $('#title').html('Create Product');
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
    let price = $('#price').val();
    let amount = $('#amount').val();
    let image = $('#image').val();
    let description = $('#description').val();
    let cateId = $('#category').val();
    let product = {
        name: name,
        price: price,
        amount: amount,
        image: image,
        description: description,
        category: {
            _id: cateId
        }
    };
    $.ajax({
        type: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token.token
        },
        url: `${API_URL}/user/products/${id}`,
        data: JSON.stringify(product),
        success: function (data) {
            let html = `<tr id="${data._id}">
        <td>${totalProduct}</td>
        <td>${data.name}</td>
        <td>${data.price}</td>
        <td>${data.amount}</td>
        <td><img src="${API_URL}/${data.image}" alt=""></td>
        <td>${data.category ? data.category.name : ''}</td>
        <td>
        <button type="button" onclick="showUpdateForm('${data._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Update
        </button>
        </td>
        <td><button class="btn btn-danger" onclick="showConfirmDelete('${data._id}')">Delete</button></td>
    </tr>`
            $(`#${id}`).replaceWith(html);
            Swal.fire(
                'Updated!',
                'Product has been updated.',
                'success'
            )
        }
    })
}

function getProduct(id) {
    $.ajax({
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token.token
        },
        url: `${API_URL}/user/products/${id}`,
        success: function (data) {
            $('#name').val(data.name);
            $('#price').val(data.price);
            $('#amount').val(data.amount);
            $('#description').val(data.description);
            $('#image').val(data.image);
            $.ajax({
                type: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token.token
                },
                url: `${API_URL}/user/category`,
                success: function (categories) {
                    let html = '<option>Select category</option>';
                    for (let category of categories) {
                        if (category._id === data.category?._id){
                            html += `<option value="${category._id}" selected>${category.name}</option>`
                        }else {
                            html += `<option value="${category._id}">${category.name}</option>`
                        }
                    }
                    $('#category').html(html);
                }
            })
        }
    })
}

