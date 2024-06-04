const PROJECT = "project";
var action = "add";
const addProject = document.getElementById("addProject");
let btnUpdate = document.getElementById("btn-update");
let uId = document.getElementById("uId");
addProject.addEventListener("submit", (e) => {
    e.preventDefault();
    var allPrj = JSON.parse(localStorage.getItem(PROJECT)) || [];
    const formData = new FormData(e.target);
    const values = {};
    for (let [name, value] of formData.entries()) {
        values[name] = value;
    }
    if (validate(values)) {
        if (action == "add") {
            values.id = allPrj.length > 0 ? allPrj[allPrj.length - 1].id + 1 : 1;
            allPrj.push(values);
            localStorage.setItem(PROJECT, JSON.stringify(allPrj));
            e.target.reset();
            window.location.reload();
        } else {
            var allPrj = JSON.parse(localStorage.getItem(PROJECT)) || [];
            let indexPrj = allPrj.findIndex((prj) => prj.id == uId.value);
            values.id = +uId.value;
            allPrj[indexPrj] = values;
            localStorage.setItem(PROJECT, JSON.stringify(allPrj));
            e.target.reset();
            action = "add";
            window.location.reload();
        }
    }
});
render();
function render() {
    let allPrj = JSON.parse(localStorage.getItem(PROJECT)) || [];
    let bodyPrj = document.getElementById("bodyPrj");
    let nbr = 1;
    let stringHTML = "";
    for (let i = 0; i < allPrj.length; i++) {
        stringHTML += `
        <tr>
            <td>${nbr}</td>
            <td>${allPrj[i].name}</td>
            <td><img class="imgChange" src="${allPrj[i].image}"></td>
            <td>${allPrj[i].technology}</td>
            <td>
            <button type="button" onclick=initupdatePrj(${allPrj[i].id}) class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Sửa</button>
            <button type="button" onclick=deletePrj(${allPrj[i].id}) class="btn btn-outline-danger">Xóa</button>
            </td>
        </tr>
        `;
        nbr++;
    }
    bodyPrj.innerHTML = stringHTML;
}
function validate(data) {
    resetspan();
    let allPrj = JSON.parse(localStorage.getItem(PROJECT)) || [];
    var flag = true;
    let index = allPrj.findIndex((item) => item.name === data.name);
    let index1 = allPrj.findIndex((item) => item.id == uId.value);
    // index1 -= 1;
    console.log(index1);
    if (action == "update") {
        if (index !== -1 && data.name != allPrj[index1].name) {
            flag = false;
            showMessage("error1", "Tên kỹ năng đã tồn tại");
        }
    }else{
        if (index !== -1) {
            flag = false;
            showMessage("error1", "Tên kỹ năng đã tồn tại");
        }
    }
    if (data.name == "") {
        flag = false;
        showMessage("error1", "Tên kỹ năng không được để trống");
    }
    if (data.image == "") {
        flag = false;
        showMessage("error2", "Hình ảnh không được để trống");
    }
    if (data.technology == "") {
        flag = false;
        showMessage("error3", "Công nghệ không được để trống");
    }
    if (data.github == "") {
        flag = false;
        showMessage("error4", "Link github không được để trống");
    }
    return flag;
}
function resetspan() {
    let newSpan = document.getElementsByClassName("errorAdd");
    for (let i = 0; i < newSpan.length; i++) {
        newSpan[i].innerText = "";
    }
}
function showMessage(id, message) {
    var showMess = document.getElementById(id);
    showMess.innerText = message;
    showMess.style.color = "red";
}
function setFieldsValue(formId, data) {
    const form = document.getElementById(formId);
    if (!form) return;
    Object.keys(data).forEach((key) => {
        const field = form.querySelector(`[name=${key}]`);
        if (field) {
            field.value = data[key];
        }
    });
}
function initupdatePrj(data) {
    let allPrj = JSON.parse(localStorage.getItem(PROJECT)) || [];
    let index = allPrj.findIndex((prj) => prj.id === data);
    setFieldsValue("addProject", allPrj[index]);
    btnUpdate.innerText = "Sửa";
    action = "update";
    uId.value = data;
}
function deletePrj(data) {
    let confirmDelete = confirm("Bạn có chắc muốn xóa?");
    if (confirmDelete) {
        let allPrj = JSON.parse(localStorage.getItem(PROJECT)) || [];
        let indexPrj = allPrj.findIndex((prj) => prj.id === data);
        allPrj.splice(indexPrj, 1);
        localStorage.setItem(PROJECT, JSON.stringify(allPrj));
        render();
    }
}
function change() {
    btnUpdate.innerText = "Thêm";
}
