function saveCustomer() {
    let customerID = $('#txtCusID').val();
    let customerName = $("#txtCusName").val();
    let customerAddress = $("#txtCusAddress").val();
    let customernumber = $("#txtCusnumber").val();
    var customer = new CustomerDTO(customerID, customerName, customerAddress, customernumber);

    customerDb.push(customer);

}

function loadAllCustomers() {

    $("#customerTable").empty();
    // if (isAdded > 0) {

    for (var i of customerDb) {

        let row = `<tr><td>${i.getCustomerID()}</td>
<td>${i.getCustomerName()}</td>
<td>${i.getCustomerAddress()}</td>
<td>${i.getCustomerNumber()}</td></tr>`;
        $("#customerTable").append(row);
        $("#customerTable>tr").click(function () {

            clearAll();
            $("#txtCusID").val($(this).children(":eq(0)").text());
            $("#txtCusName").val($(this).children(":eq(1)").text());
            $("#txtCusAddress").val($(this).children(":eq(2)").text());
            $("#txtCusnumber").val($(this).children(":eq(3)").text());


        });

    }
    // }

}

$("#btn-save-customer").click(function () {
    saveCustomer();
    loadAllCustomers();
    $('#txtCusID,#txtCusName,#txtCusAddress,#txtCusnumber').val("");
    generateCustomerID();
    
});

$("#btn-customer-search").click(function () {
    clearAll();
    searchCustomer();
});
$("#btn-delete-customer").click(function () {
    let id = $('#txtCusID').val();
    let option = confirm(`Do you want to delete ID:${id}`);
    if (option) {
        let erase = deleteCustomer(id);
        if (erase) {
            alert("Customer Deleted");
            $('#txtCusID,#txtCusName,#txtCusAddress,#txtCusnumber').val("");
            generateCustomerID();
        } else {
            alert("Delete Failed , Try again");
        }
    }

    loadAllCustomers();
});
$("#btn-update-customer").click(function () {
    updateCustomer();
    loadAllCustomers();
    $('#txtCusID,#txtCusName,#txtCusAddress,#txtCusnumber').val("");
    generateCustomerID();
});
$("#btn-customer-clear-feild").click(function () {
    $('#txtCusID,#txtCusName,#txtCusAddress,#txtCusnumber').val("");
    clearAll();
    generateCustomerID();

});

function searchCustomer() {
    console.log("Searc")
    for (var i = 0; i < customerDb.length; i++) {
        if ($('#txtCustomerSearch').val() == customerDb[i].getCustomerID()) {
            $("#txtCusID").val(customerDb[i].getCustomerID())
            $("#txtCusName").val(customerDb[i].getCustomerName());
            $("#txtCusAddress").val(customerDb[i].getCustomerAddress());
            $("#txtCusnumber").val(customerDb[i].getCustomerNumber());
        }
    }

}
function deleteCustomer(id) {
    let customer;
    if (id != null) {
        for (var i = 0; i < customerDb.length; i++) {
            if (id == customerDb[i].getCustomerID()) {
                customer = customerDb[i];
            }
        }
        let indexNumber = customerDb.indexOf(customer);
        customerDb.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }

}
function generateCustomerID() {
    try {
        let lastCustId = customerDb[customerDb.length - 1].getCustomerID();
        let newCustId = parseInt(lastCustId.substring(1, 4)) + 1;
        if (newCustId < 10) {
            $("#txtCusID").val("C00" + newCustId);
        } else if (newCustId < 100) {
            $("#txtCusID").val("C0" + newCustId);
        } else {
            $("#txtCusrID").val("C" + newCustId);
        }
    } catch (e) {
        $("#txtCusID").val("C001");
    }

}
function OpenLoadFuntion() {
    generateCustomerID();

}
function updateCustomer() {
    let customerID = $('#txtCusID').val();
    let customerName = $("#txtCusName").val();
    let customerAddress = $("#txtCusAddress").val();
    let customerNumber = $("#txtCusnumber").val();
    for (var i = 0; i < customerDb.length; i++) {
        if (customerDb[i].getCustomerID() == $("#txtCusID").val()) {
            var customer = customerDb[i];
            customer.setCustomerName(customerName);
            customer.setCustomerAddress(customerAddress);
            customer.setCustomeNumber(customerNumber)
        }
    }
}

// ---------------Validation Start-----------
//validation started
// customer regular expressions
const cusIDRegEx = /^(C00-)[0-9]{1,3}$/;
const cusNameRegEx = /^[A-z ]{2,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusnumberRegEx = /^[0-9]{10}$/;


$('#txtCusID,#txtCusName,#txtCusAddress,#txtCusnumber').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); // stop execution of the button
    }
});
$('#txtCusID,#txtCusName,#txtCusAddress,#txtCusnumber').on('blur', function () {
    formValid();
});
//focusing events
$("#txtCusID").on('keyup', function (eventOb) {
    setButton();
});

$("#txtCusName").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});

$("#txtCusAddress").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});

$("#txtCusnumber").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});


function clearAll() {
    $('#txtCusID,#txtCusName,#txtCusAddress,#txtCusnumber').val("");
    $('#txtCusID,#txtCusName,#txtCusAddress,#txtCusnumber').css('border', '2px solid #ced4da');
    $('#txtCusName').focus();
    loadAllCustomers();
    $("#lblcusid,#lblcusname,#lblcusaddress,#lblcusnumber").text("");
    generateCustomerID();
}

function formValid() {
    var cusName = $("#txtCusName").val();
    if (cusNameRegEx.test(cusName)) {
        $("#txtCusName").css('border', '2px solid green');

        var cusAddress = $("#txtCusAddress").val();
        if (cusAddressRegEx.test(cusAddress)) {
            $("#txtCusAddress").css('border', '2px solid green');

            var cusnumber = $("#txtCusnumber").val();
            var resp = cusnumberRegEx.test(cusnumber);

            if (resp) {
                $("#txtCusnumber").css('border', '2px solid green');
                return true;
            } else {
                $("#txtCusnumber").css('border', '2px solid red');
                return false;
            }
        } else {
            $("#txtCusAddress").css('border', '2px solid red');
            return false;
        }
    } else {
        $("#txtCusName").css('border', '2px solid red');
        return false;
    }

}

function checkIfCustValid() {
    $("#txtCusName").focus();
    var cusName = $("#txtCusName").val();
    if (cusNameRegEx.test(cusName)) {
        $("#txtCusAddress").focus();
        var cusAddress = $("#txtCusAddress").val();
        if (cusAddressRegEx.test(cusAddress)) {
            $("#txtCusnumber").focus();
            var cusnumber = $("#txtCusnumber").val();
            var resp = cusnumberRegExRegEx.test(cusnumber);
            if (resp) {
                let res = confirm("Do you really need to add this Customer..?");
                if (res) {
                    saveCustomer();
                    clearAll();
                }
            } else {
                $("#txtCusnumber").focus();
            }
        } else {
            $("#txtCusAddress").focus();
        }
    } else {
        $("#txtCusName").focus();
    }

}

$('#btn-save-customer').click(function () {
    checkIfCustValid();
});
//validation ended




