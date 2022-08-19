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
function getUserList() {
    $.ajax({
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token.token
        },
        url: `${API_URL}/admin/users`,
        success: function (data) {
            totalProduct = data.length;
            let title = 'All Users';
            let thead = `<tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Address</th>
                          <th>Role</th>
                          <th>Status</th>
                          <th style="width: 85px;">Action</th>
                        </tr>`;
            let tbody = '';
            for (let i = 0; i < data.length; i++) {
                tbody += `<tr id="${data[i]._id}">
        <td>${i + 1}</td>
        <td>${data[i].name}</td>
        <td>${data[i].username}</td>
        <td>${data[i].email}</td>
        <td>${data[i].address}</td>
        <td>${data[i].address}</td>
        <td><span class="badge bg-soft-danger text-danger">Blocked</span></td>
        <td>
        <a href="javascript:void(0);" class="action-icon"> <i class="mdi mdi-square-edit-outline"></i></a>
        <a href="javascript:void(0);" class="action-icon"> <i class="mdi mdi-delete"></i></a>
      </td>
    </tr>`
            }
            $('#title').html(title);
            $('#thead').html(thead);
            $('#tbody').html(tbody);
        }
    })
}
function getSellerList() {
    $.ajax({
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token.token
        },
        url: `${API_URL}/admin/users`,
        success: function (data) {
            totalProduct = data.length;
            let title = 'All Users';
            let thead = `<tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Address</th>
                          <th>Role</th>
                          <th>Status</th>
                          <th style="width: 85px;">Action</th>
                        </tr>`;
            let tbody = '';
            for (let i = 0; i < data.length; i++) {
                tbody += `<tr id="${data[i]._id}">
        <td>${i + 1}</td>
        <td>${data[i].name}</td>
        <td>${data[i].username}</td>
        <td>${data[i].email}</td>
        <td>${data[i].address}</td>
        <td>${data[i].address}</td>
        <td><span class="badge bg-soft-danger text-danger">Blocked</span></td>
        <td>
        <a href="javascript:void(0);" class="action-icon"> <i class="mdi mdi-square-edit-outline"></i></a>
        <a href="javascript:void(0);" class="action-icon"> <i class="mdi mdi-delete"></i></a>
      </td>
    </tr>`
            }
            $('#title').html(title);
            $('#thead').html(thead);
            $('#tbody').html(tbody);
        }
    })
}