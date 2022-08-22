let API_URL = 'http://localhost:3000';
let token = JSON.parse(localStorage.getItem('accessToken'));
if (!token) {
    location.href = '../login/login.html'
} else {
    $(function () {
        getUserList();
    })
}

function getUserList() {
    $.ajax({
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token.token
        },
        url: `${API_URL}/admin/users`,
        success: function (data) {
            let title = 'All Users';
            let body = ` <table class="table table-centered table-nowrap table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Address</th>
                <th>Role</th>
                <th>Status</th>
                <th style="width: 85px;">Action</th>
              </tr>
            </thead>
            <tbody>`;
            for (let i = 0; i < data.length; i++) {
                body += `<tr id="${data[i]._id}">
        <td>${i + 1}</td>
        <td><img width="45px" src="${data[i].avatar}" alt="table-user" class="mr-2 rounded-circle">
        <a href="#" class="text-body font-weight-semibold" onclick="getUser('${data[i]._id}')">${data[i].name}</a>
        </td>
        <td>${data[i].username}</td>
        <td>${data[i].email}</td>
        <td>${data[i].address}</td>
        <td>${(data[i].role.length === 1) ? data[i].role[0].name : data[i].role[1].name}</td>
        <td>${(data[i].status === 1) ? '<span class="badge bg-soft-success text-success">Active</span>' : '<span class="badge bg-soft-danger text-danger">Blocked</span>'}</td>
        <td>
        <a href="#" onclick = "updateUser('${data[i]._id}')" class="action-icon"> <i class="mdi mdi-square-edit-outline"></i></a>
        <a href="#" onclick = "showConfirmDeleteUser('${data[i]._id}')" class="action-icon"> <i class="mdi mdi-delete"></i></a>
      </td>
    </tr>`
            }
            body += `</tbody></table>`
            $('#title').html(title);
            $('#body').html(body);
        }
    })
}
function showConfirmDeleteUser(id) {
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
function deleteUser(id) {
    $.ajax({
        type: 'DELETE',
        url: `${API_URL}/admin/users/${id}`,
        headers: {
            'Authorization': 'Bearer ' + token.token
        },
        success: function () {
            Swal.fire(
                'Deleted!',
                'Accout has been deleted.',
                'success'
            )
            $(`#${id}`).remove();
        }
    })
}
function getUser(id) {
    console.log('ok');
    $.ajax({
        type: 'GET',
        url: `${API_URL}/admin/users/${id}`,
        headers: {
            'Authorization': 'Bearer ' + token.token
        },
        success: function (data) {
            let title = 'User Profile';
            let body = `<div class="col-12">
            <div class="card-box">
                <div class="row">
                    <div class="col-lg-5">
                    <img width="400px" heigth="400px" src="${data.avatar}" alt="">
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
                            <a id="lock"> ${(data.status === 1) ? `<button type="button" class="btn btn-danger mr-2" onclick = "showConfirmLockUser('${data._id}')" >Block</button>` :
                    `<button  type="button" class="btn btn-success waves-effect waves-light" onclick = "unLockUser('${data._id}')">UnLock</button>`}<a>
                             
                            ${data.store ? '<button type="button" class="btn btn-success waves-effect waves-light">View Store</button>' : ''}                            
                            </div>
                        </div>
                    </div> <!-- end col -->
                </div>
                <!-- end row -->
            </div> <!-- end card-->
        </div>`;
            $('#title').html(title);
            $('#body').html(body);
        }
    })
}
function showConfirmLockUser(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Lock it!'
    }).then((result) => {
        if (result.isConfirmed) {
            lockUser(id);
        }
    })
}
function lockUser(id) {
    $.ajax({
        type: "PUT",
        headers: {
            'Authorization': 'Bearer ' + token.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: `${API_URL}/admin/users/lock/${id}`,
        success: function (data) {
            Swal.fire(
                'Lock User!',
                'Accout has been locked.',
                'success'
            )
            $(`#lock`).html(`${(data.status === 1) ? `<button type="button" class="btn btn-danger mr-2" onclick = "showConfirmLockUser('${data._id}')" >Block</button>` :
                `<button  type="button" class="btn btn-success waves-effect waves-light" onclick = "unLockUser('${data._id}')">UnLock</button>`}`);
        }
    })
}

function unLockUser(id) {
    $.ajax({
        type: "PUT",
        headers: {
            'Authorization': 'Bearer ' + token.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: `${API_URL}/admin/users/lock/${id}`,
        success: function (data) {
            Swal.fire(
                'UnLock User!',
                'Accout has been unlocked.',
                'success'
            )
            $('#lock').html(`${(data.status === 1) ? `<button type="button" class="btn btn-danger mr-2" onclick = "showConfirmLockUser('${data._id}')" >Block</button>` :
                `<button  type="button" class="btn btn-success waves-effect waves-light" onclick = "unLockUser('${data._id}')">UnLock</button>`}`)

        }
    })
}
function getSellerList() {
    $.ajax({
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token.token
        },
        url: `${API_URL}/admin/sellers`,
        success: function (data) {
            totalProduct = data.length;
            let title = 'All Seller';
            let body = ` <table class="table table-centered table-nowrap table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Address</th>
                <th>Status</th>
                <th style="width: 85px;">Action</th>
              </tr>
            </thead>
            <tbody>`;
            for (let i = 0; i < data.length; i++) {
                body += `<tr id="${data[i]._id}">
        <td>${i + 1}</td>
        <td><img src="${data[i].avatar}" alt="table-user" class="mr-2 rounded-circle">
        <a href="#" class="text-body font-weight-semibold">${data[i].name}</a>
        </td>
        <td>${data[i].username}</td>
        <td>${data[i].email}</td>
        <td>${data[i].address}</td>
        <td>${(data[i].status === 1) ? '<span class="badge bg-soft-success text-success">Active</span>' : '<span class="badge bg-soft-danger text-danger">Blocked</span>'}</td>
        <td>
        <a href="#" onclick = "updateUser('${data[i]._id}')" class="action-icon"> <i class="mdi mdi-square-edit-outline" data-dismiss="modal"></i></a>
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

function getMyProfile() {
    $.ajax({
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token.token
        },
        url: `${API_URL}/admin/myProfile`,
        success: function (data) {
            let title = 'My Profile';
            let edit = 'Edit MyProfile';
            let body = `<div class="col-12">
            <div class="card-box">
                <div class="row">
                    <div class="col-lg-5">
                    <img width="400px" heigth="400px" src="${data.avatar}" alt="">
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
                           
                        </div>
                    </div> <!-- end col -->
                </div>
                <!-- end row -->
            </div> <!-- end card-->
        </div>`;
            let update = `<button type="submit" class="btn btn-success waves-effect waves-light" onclick="update('${data._id}')" data-dismiss="modal">Save</button>
        <button type="button" class="btn btn-danger waves-effect waves-light" data-dismiss="modal">Exit</button>`
            $('#title').html(title);
            $('#body').html(body);
            $('#update').html(update);
            $('#editHTML').html(edit);
        }
    })
}
function update(id) {

    let name = $('#name').val();
    let email = $('#email').val();
    let address = $('#address').val();
    let avatar = $('#avatar').val();
    let password = $('#password').val()

    const firebaseConfig = {
        apiKey: "AIzaSyCHVJ3RokpI5aQ_NDuzqGCMJDnX8MvQIus",
        authDomain: "case4-6dbf8.firebaseapp.com",
        projectId: "case4-6dbf8",
        storageBucket: "case4-6dbf8.appspot.com",
        messagingSenderId: "1068828921653",
        appId: "1:1068828921653:web:e92849f20febb73825867c",
        measurementId: "G-T3589W1X49"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    console.log(firebase);
    const ref = firebase.storage().ref();
    const file = document.querySelector("#avatar").files[0];
    const nameImage = +new Date() + "-" + file.name;
    const metadata = {
        contentType: file.type
    };
    const task = ref.child(nameImage).put(file, metadata);
    task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {

            let updateUser = {
                name: name,
                email: email,
                address: address,
                avatar: url,
                password: password
            }
            console.log('ok');
            $.ajax({

                type: "PUT",
                url: `${API_URL}/admin/users/${id}`,
                headers: {
                    'Authorization': 'Bearer ' + token.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(updateUser),

                success: function (data) {
                    let body = `<div class="col-12">
                    <div class="card-box">
                        <div class="row">
                            <div class="col-lg-5">
                            <img width="400px" heigth="400px" src="${data.avatar}" alt="">
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
                                   
                                </div>
                            </div> <!-- end col -->
                        </div>
                        <!-- end row -->
                    </div> <!-- end card-->
                </div>`
                    $('#body').html(body);
                    Swal.fire(
                        'Edit MyProfile!',
                        'Accout has been Edit.',
                        'success'
                    )
                }
            })

        })
        .catch(console.error);


}