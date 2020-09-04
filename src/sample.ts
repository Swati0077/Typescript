

class User{
    
    firstName: string
    middleName: string
    lastName: string
    email: string
    phoneNumber: string|number
    role: string
    address: string
    id :number 
    constructor(user:User )
    {
      this.id = row_count
      this.firstName = user.firstName
      this.middleName = user.middleName
      this.lastName = user.lastName
      this.email = user.email
      this.phoneNumber = user.phoneNumber
      this.role = user.role
      this.address = user.address  
      console.log("id - " + this.id + " name - " + this.firstName + " " + this.lastName)
      this.insert_rows(this.id)
    }
    insert_rows(row_id: number)
    {
        //if at least one row exists, we'll show the table headings. 
        if(hide_headings) {
            hide_headings = false
            var head = document.createElement("tr")! 
            head.setAttribute("id", "headings");
            document.getElementById("mytable")!.appendChild(head);
            var heading = document.getElementById("headings")! 
            heading.innerHTML=`<tr id="headings">
                        <td>First Name</td>
                        <td>Middle Name</td>
                        <td>Last Name</td>
                        <td>Email</td>
                        <td>Phone Number</td>
                        <td>Role</td>
                        <td>Address</td>
                        <td>Edit</td>
                        </tr>`
            
        }
        //creating a row
        var row = document.createElement("TR")! as HTMLTableRowElement;
        //setting row id
        row.setAttribute("id", "row-"+row_id);
        document.getElementById("mytable")!.appendChild(row);
        //push data into row
        this.make_row(row_id);
    }
    make_row(row_id: number) {
        console.log("make row  with row id - " + row_id)
        //get row by id
        var row = document.getElementById("row-"+row_id)!;
        console.log('hello make row - ' + user_list[row_id].firstName)
        //push data into row
        row.innerHTML=`<tr id='row-${row_id}'>
                        <td>${user_list[row_id].firstName}</td>
                        <td>${user_list[row_id].middleName}</td>
                        <td>${user_list[row_id].lastName}</td>
                        <td>${user_list[row_id].email}</td>
                        <td>${user_list[row_id].phoneNumber}</td>
                        <td>${user_list[row_id].role}</td>
                        <td>${user_list[row_id].address}</td>
                        </tr>`
        //add edit and delete buttons in the last cell
        this.add_edit_delete(row_id)
    }
    
    add_edit_delete(row_id:number) {
        var edit=document.createElement("button")! as HTMLButtonElement
        var del=document.createElement("button")! as HTMLButtonElement
        edit.id = "edit-"+row_id
        del.id = "del-"+row_id
        edit.innerHTML = "Edit";
        del.innerHTML = "Delete";
        //calling functions by passing row id
        //del.setAttribute("onClick", `this.del_row.bind(this, row_id)`);
        //edit.setAttribute("onClick", this.edit_row(row_id));
        //create cell
        var cell = document.createElement("TD");
        //append buttons to the cell
        cell.appendChild(edit);
        cell.appendChild(del);
        //append cell to the row
        document.getElementById("row-" + row_id)!.appendChild(cell);
        document.getElementById(`del-${row_id}`)!.addEventListener("click", this.del_row.bind(this,row_id))
        document.getElementById(`edit-${row_id}`)!.addEventListener("click", this.edit_row.bind(this,row_id))
    }
    del_row(row_id:number) {
        //delete particular user from json file
        console.log('initial user-length '+ user_list.length)
        console.log('working for id - ' + row_id)
        delete user_list[+row_id];
        console.log('user-length '+ user_list.length)
        //reload the table
        load();
    }
    save_row(row_id:number) {
        //updating row's attributes by taking values from input fields by their ids
        var row=document.getElementById('row-'+row_id)! 
        const cells = row.querySelectorAll("td")!
        
        console.log("updating row id - " + row_id)

        for (var i = 0; i < cells.length - 1; i++) {
            cells[i].setAttribute("contenteditable", "false")
        }

        console.log('hello initial' + user_list[row_id].firstName)
        user_list[row_id].firstName=cells[0].textContent!
        user_list[row_id].middleName=cells[1].textContent!
        user_list[row_id].lastName=cells[2].textContent!
        user_list[row_id].email=cells[3].textContent!
        user_list[row_id].phoneNumber=cells[4].textContent!
        user_list[row_id].role=cells[5].textContent!
        user_list[row_id].address=cells[6].textContent!
        
        console.log('hello updated' + user_list[row_id].firstName)
        this.make_row(row_id);
    }
    edit_row(row_id:number) {
        //getting row by its id
        var row = document.getElementById("row-"+row_id)! as HTMLTableRowElement
        //making all cells except last cell editable
        const cells = row.querySelectorAll("td")!
        for (var i = 0; i < cells.length - 1; i++) {
        cells[i].setAttribute("contenteditable", "true")
        }
        cells[0].focus()
        //delete edit and delete cell
        row.deleteCell(-1)
        //append save cancel buttons
        var save=document.createElement("button")
        var cancel=document.createElement("button")
        save.id = "save-"+row_id
        save.innerHTML = "Save"
        cancel.id = "cancel-"+row_id
        cancel.innerHTML = "Cancel"
        //calling function by passing user id
        //cancel.setAttribute("onClick", "make_row(this.id)");
        //save.setAttribute("onClick", "save_row(this.id)");
        //create cell
        var cell = document.createElement("TD");
        //append buttons to the cell
        cell.appendChild(save)
        cell.appendChild(cancel)
        //append cell to the row
        row.appendChild(cell);

        document.getElementById(`cancel-${row_id}`)!.addEventListener("click", this.make_row.bind(this,row_id))
        console.log("save function call")
        document.getElementById(`save-${row_id}`)!.addEventListener("click", this.save_row.bind(this,row_id))
    }
  }



//array to store users data
var user_list : User[] =[]
var row_count = 0;
var hide_headings = true


//fetching the data
var xhr = new XMLHttpRequest()
xhr.open('GET','../data.json',false)
xhr.onload = function(){
   user_list = JSON.parse(xhr.responseText)
}
xhr.send()




let load_btn = document.getElementById("btn")! as HTMLButtonElement
load_btn.addEventListener("click", load);


function load()
{
    //intitial steps
    document.getElementById("btn")!.innerHTML="Refresh"
    //make sure that table is empty
    document.getElementById("mytable")!.innerHTML=''
    //make sure that initial row count is zero
    row_count = 0
    //make sure that headings are not displayed
    hide_headings = true
    //enter data into rows
    for(var usr in user_list) {
        row_count = +usr
        new User(user_list[usr])
    }
}







