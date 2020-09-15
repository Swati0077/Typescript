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
        this.insertRows(this.id);
    }
    insertRows(row_id) {
        if (hide_headings) {
            hide_headings = false;
            let head = document.createElement("tr");
            head.setAttribute("id", "headings");
            document.getElementById("mytable").appendChild(head);
            let heading = document.getElementById("headings");
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
        const row = document.createElement("TR");
        row.setAttribute("id", "row-" + row_id);
        document.getElementById("mytable").appendChild(row);
        this.makeRow(row_id);
    }
    makeRow(row_id) {
        console.log("make row  with row id - " + row_id);
        let row = document.getElementById("row-" + row_id);
        row.innerHTML = `<tr id='row-${row_id}'>
                        <td>${user_list[row_id].firstName}</td>
                        <td>${user_list[row_id].middleName}</td>
                        <td>${user_list[row_id].lastName}</td>
                        <td>${user_list[row_id].email}</td>
                        <td>${user_list[row_id].phoneNumber}</td>
                        <td>${user_list[row_id].role}</td>
                        <td>${user_list[row_id].address}</td>
                        </tr>`;
        this.addEditDelete(row_id);
    }
    addEditDelete(row_id) {
        const edit = document.createElement("button");
        const del = document.createElement("button");
        edit.id = "edit-" + row_id;
        del.id = "del-" + row_id;
        edit.innerHTML = "Edit";
        del.innerHTML = "Delete";
        const cell = document.createElement("TD");
        cell.appendChild(edit);
        cell.appendChild(del);
        document.getElementById("row-" + row_id).appendChild(cell);
        document.getElementById(`del-${row_id}`).addEventListener("click", this.deleteRow.bind(this, row_id));
        document.getElementById(`edit-${row_id}`).addEventListener("click", this.editRow.bind(this, row_id));
    }
    deleteRow(row_id) {
        delete user_list[+row_id];
        load();
    }
    saveRow(row_id) {
        let row = document.getElementById('row-' + row_id);
        const cells = row.querySelectorAll("td");
        for (var i = 0; i < cells.length - 1; i++) {
            cells[i].setAttribute("contenteditable", "false");
        }
        user_list[row_id].firstName = cells[0].textContent;
        user_list[row_id].middleName = cells[1].textContent;
        user_list[row_id].lastName = cells[2].textContent;
        user_list[row_id].email = cells[3].textContent;
        user_list[row_id].phoneNumber = cells[4].textContent;
        user_list[row_id].role = cells[5].textContent;
        user_list[row_id].address = cells[6].textContent;
        this.makeRow(row_id);
    }
    editRow(row_id) {
        let row = document.getElementById("row-" + row_id);
        const cells = row.querySelectorAll("td");
        for (var i = 0; i < cells.length - 1; i++) {
            cells[i].setAttribute("contenteditable", "true");
        }
        cells[0].focus();
        row.deleteCell(-1);
        const save = document.createElement("button");
        const cancel = document.createElement("button");
        save.id = "save-" + row_id;
        save.innerHTML = "Save";
        cancel.id = "cancel-" + row_id;
        cancel.innerHTML = "Cancel";
        const cell = document.createElement("TD");
        cell.appendChild(save);
        cell.appendChild(cancel);
        row.appendChild(cell);
        document.getElementById(`cancel-${row_id}`).addEventListener("click", this.makeRow.bind(this, row_id));
        document.getElementById(`save-${row_id}`).addEventListener("click", this.saveRow.bind(this, row_id));
    }
}
let user_list = [];
let row_count = 0;
let hide_headings = true;
let xhr = new XMLHttpRequest();
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
    for (let usr in user_list) {
        row_count = +usr;
        new User(user_list[usr]);
    }
}
//# sourceMappingURL=sample.js.map