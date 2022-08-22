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

function getProductList() {
    $.ajax({
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token.token
        },
        url: `${API_URL}/products`,
        success: function (data) {
            console.log(data)
            totalProduct = data.length;
            displayList(data)
        }

    })
}

function displayList(data) {

    let html = '';
    for (let i = 0; i < data.length; i++) {
        html += `
                <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                    <!-- Block2 -->
                    <div class="block2">
                    <div class="block2-pic hov-img0" >
                    <img src="${data[i].image}" alt="">
                    <span class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1" onclick="getProduct('${data[i]._id}')">
                    Quick View
                    </span>
                    </div>
                    <div class="block2-txt flex-w flex-t p-t-14">
                    
                    <div class="block2-txt-child1 flex-col-l ">
                     
                    <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                    
                    ${data[i].name}
                    
                    </a>
                    
                    
                    <span class="stext-105 cl3">
                    
                    $16.64
                    
                    </span>
                    
                    </div>
                    
                    
                    <div class="block2-txt-child2 flex-r p-t-3">
                    
                    <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                    
                    <img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON">
                    
                    <img class="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON">
                    
                    </a>
                    
                    </div>
                    
                    </div>
                    </div>
                    </div>
                `

    }
    $('#showProduct').html(html);
}

function searchProduct() {
    let name = $('#nameSearch').val();
    $.ajax({
        type: 'GET',
        url: `${API_URL}/stores/search?name=${name}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token.token
        },
        success: function (data) {
            // console.log(data)
            displayList(data)

        },
        error: function (xhr, ajaxOptions, thrownError) {
            // alert(xhr.status);
            Swal.fire('product not exist')
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
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token.token
        },
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
    const firebaseConfig = {
        apiKey: "AIzaSyAVrwPwJvJvn7R0a6ehu33geRA6SRuyNxk",
        authDomain: "myproject-94b76.firebaseapp.com",
        projectId: "myproject-94b76",
        storageBucket: "myproject-94b76.appspot.com",
        messagingSenderId: "378221595148",
        appId: "1:378221595148:web:6f684d195ba7d8c320bc29",
        measurementId: "G-7M2JF7YNB9"
    };
    firebase.initializeApp(firebaseConfig);

    const ref = firebase.storage().ref();
    const file = document.querySelector("#photo").files[0];
    const nameImage = +new Date() + "-" + file.name;
    const metadata = {
        contentType: file.type
    };
    const task = ref.child(nameImage).put(file, metadata);
    task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            console.log(url);
            let name = $('#name').val();
            let address = $('#address').val();
            let userid = $('#userid').val();
            let image = $('#image').val()
            let store = {
                name: name,
                address: address,
                userid: userid,
                image: url
            };
            console.log(store)
            $.ajax({
                type: 'POST',
                url: `${API_URL}/stores`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token.token
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
        })
        .catch(console.error);

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
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token.token
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

function a() {
    let id = localStorage.getItem('id-product')
    $.ajax({
        type: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token.token
        },
        url: `${API_URL}/products/${id}`,
        success: function (data) {
            document.getElementById('name1').innerHTML = data.name;
            document.getElementById('price1').innerHTML = data.price;
            document.getElementById('description1').innerHTML =data.description;
            document.getElementById('imgQuan').src = data.image;
            console.log(data)

        }
    })
}

function getProduct(id) {
    localStorage.setItem('id-product', id);
    location.href = ("../cozastore-master/product-detail.html")
}

function addToCart() {
    let cart = {
        items: [{
            price: 1,
            amount: 1,
            product: '6300f029b7cbcb8923de595c'
        }]
    };
    console.log(cart)
    $.ajax({
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token.token
        },
        type: 'POST',
        url: `${API_URL}/carts?user_id=${token.id}`,
        data: JSON.stringify(cart),
        success: function (data) {
            console.log(data)
        }

    })



}

