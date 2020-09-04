"use strict";
class User {
    constructor(user) {
        this.id = row_count;
        this.firstName = user.firstName;
        this.middleName = user.middleName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.phoneNumber = user.phoneNumber;
        this.role = user.role;
        this.address = user.address;
        console.log("id - " + this.id + " name - " + this.firstName + " " + this.lastName);
        this.insert_rows(this.id);
    }
    insert_rows(row_id) {
        if (hide_headings) {
            hide_headings = false;
            var head = document.createElement("tr");
            head.setAttribute("id", "headings");
            document.getElementById("mytable").appendChild(head);
            var heading = document.getElementById("headings");
            heading.innerHTML = `<tr id="headings">
                        <td>First Name</td>
                        <td>Middle Name</td>
                        <td>Last Name</td>
                        <td>Email</td>
                        <td>Phone Number</td>
                        <td>Role</td>
                        <td>Address</td>
                        <td>Edit</td>
                        </tr>`;
        }
        var row = document.createElement("TR");
        row.setAttribute("id", "row-" + row_id);
        document.getElementById("mytable").appendChild(row);
        this.make_row(row_id);
    }
    make_row(row_id) {
        console.log("make row me aaye with row id - " + row_id);
        var row = document.getElementById("row-" + row_id);
        console.log('hello make row - ' + user_list[row_id].firstName);
        row.innerHTML = `<tr id='row-${row_id}'>
                        <td>${user_list[row_id].firstName}</td>
                        <td>${user_list[row_id].middleName}</td>
                        <td>${user_list[row_id].lastName}</td>
                        <td>${user_list[row_id].email}</td>
                        <td>${user_list[row_id].phoneNumber}</td>
                        <td>${user_list[row_id].role}</td>
                        <td>${user_list[row_id].address}</td>
                        </tr>`;
        this.add_edit_delete(row_id);
    }
    add_edit_delete(row_id) {
        var edit = document.createElement("button");
        var del = document.createElement("button");
        edit.id = "edit-" + row_id;
        del.id = "del-" + row_id;
        edit.innerHTML = "Edit";
        del.innerHTML = "Delete";
        var cell = document.createElement("TD");
        cell.appendChild(edit);
        cell.appendChild(del);
        document.getElementById("row-" + row_id).appendChild(cell);
        document.getElementById(`del-${row_id}`).addEventListener("click", this.del_row.bind(this, row_id));
        document.getElementById(`edit-${row_id}`).addEventListener("click", this.edit_row.bind(this, row_id));
    }
    del_row(row_id) {
        console.log('initial user-length ' + user_list.length);
        console.log('working for id - ' + row_id);
        delete user_list[+row_id];
        console.log('user-length ' + user_list.length);
        load();
    }
    save_row(row_id) {
        var row = document.getElementById('row-' + row_id);
        const cells = row.querySelectorAll("td");
        console.log("updating row id - " + row_id);
        for (var i = 0; i < cells.length - 1; i++) {
            cells[i].setAttribute("contenteditable", "false");
        }
        console.log('hello initial' + user_list[row_id].firstName);
        user_list[row_id].firstName = cells[0].textContent;
        user_list[row_id].middleName = cells[1].textContent;
        user_list[row_id].lastName = cells[2].textContent;
        user_list[row_id].email = cells[3].textContent;
        user_list[row_id].phoneNumber = cells[4].textContent;
        user_list[row_id].role = cells[5].textContent;
        user_list[row_id].address = cells[6].textContent;
        console.log("i hate mondays");
        console.log('hello updated' + user_list[row_id].firstName);
        this.make_row(row_id);
    }
    edit_row(row_id) {
        var row = document.getElementById("row-" + row_id);
        const cells = row.querySelectorAll("td");
        for (var i = 0; i < cells.length - 1; i++) {
            cells[i].setAttribute("contenteditable", "true");
        }
        cells[0].focus();
        row.deleteCell(-1);
        var save = document.createElement("button");
        var cancel = document.createElement("button");
        save.id = "save-" + row_id;
        save.innerHTML = "Save";
        cancel.id = "cancel-" + row_id;
        cancel.innerHTML = "Cancel";
        var cell = document.createElement("TD");
        cell.appendChild(save);
        cell.appendChild(cancel);
        row.appendChild(cell);
        document.getElementById(`cancel-${row_id}`).addEventListener("click", this.make_row.bind(this, row_id));
        console.log("save function call");
        document.getElementById(`save-${row_id}`).addEventListener("click", this.save_row.bind(this, row_id));
    }
}
var user_list = [];
var row_count = 0;
var hide_headings = true;
var xhr = new XMLHttpRequest();
xhr.open('GET', '../data.json', false);
xhr.onload = function () {
    user_list = JSON.parse(xhr.responseText);
};
xhr.send();
let load_btn = document.getElementById("btn");
load_btn.addEventListener("click", load);
function load() {
    document.getElementById("btn").innerHTML = "Refresh";
    document.getElementById("mytable").innerHTML = '';
    row_count = 0;
    hide_headings = true;
    for (var usr in user_list) {
        row_count = +usr;
        new User(user_list[usr]);
    }
}
//# sourceMappingURL=sample.js.map