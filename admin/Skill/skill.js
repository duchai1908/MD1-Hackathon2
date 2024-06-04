const SKILL = "skill";
const skillName = document.getElementById("txtSkillname");
const expNumber = document.getElementById("txtExp");
const imgSkill = document.getElementById("txtImg");
let addSkill = document.getElementById("addSkill");

addSkill.addEventListener("submit",(e)=>{
    e.preventDefault();
    let allSkill = JSON.parse(localStorage.getItem(SKILL)) || [];
    const formData = new FormData(e.target);
    const values = {};
    for (let [name, value] of formData.entries()) {
        values[name] = value;
    }
    if(validate(values)){
         values.id = (allSkill.length > 0) ? allSkill[allSkill.length-1].id + 1 : 1;
         values.timeAdd = formatDate();
         allSkill.push(values);
         localStorage.setItem(SKILL,JSON.stringify(allSkill));
         render();
         window.location.reload();
    } 
})
function validate(data){
    resetspan();
    let allSkill = JSON.parse(localStorage.getItem(SKILL)) || [];
    var flag = true;
    let index = allSkill.findIndex(
        (item) => item.name === data.name
      );
    if(index !== -1){
        flag = false;
        showMessage("error1", "Tên kỹ năng đã tồn tại");
    }
    if(data.name == ""){
        flag = false;
        showMessage("error1", "Tên kỹ năng không được để trống");
    }
    if(data.experience == ""){
        flag = false;
        showMessage("error2", "Kinh nghiệm không được để trống");
    }
    if(data.image == ""){
        flag = false;
        showMessage("error3", "Hình ảnh không được để trống");
    }
    return flag;
}
function showMessage(id, message) {
    var showMess = document.getElementById(id);
    showMess.innerText = message;
    showMess.style.color = "red";
}
function resetspan(e){
    let newSpan  = document.getElementsByClassName("errorAdd");
    for(let i =0;i<newSpan.length; i++){
        newSpan[i].innerText="";
    }
}
render();
function render(){
    let allSkill = JSON.parse(localStorage.getItem(SKILL)) || [];
    let bodySkill = document.getElementById("bodySkill");
    let nbr = 1;
    let stringHTML = "";
    for(let i = 0; i< allSkill.length; i++){
        stringHTML += `
        <tr>
            <td>${nbr}</td>
            <td>${allSkill[i].name}</td>
            <td><img class="imgChange" src="${allSkill[i].image}"></td>
            <td>${allSkill[i].experience}</td>
            <td>${allSkill[i].timeAdd}</td>
            <td><button type="button" onclick=deleteSkill(${allSkill[i].id}) class="btn btn-outline-danger">Xóa</button></td>
        </tr>
        `
        nbr++;
    }
    bodySkill.innerHTML=stringHTML;
}
function deleteSkill(index){
    let confirmDelete = confirm("Bạn có chắc muốn xóa?");
    if(confirmDelete){
        let allSkill = JSON.parse(localStorage.getItem(SKILL)) || [];
        let indexSkill = allSkill.findIndex(skill => skill.id === index);
        allSkill.splice(indexSkill,1);
        localStorage.setItem(SKILL, JSON.stringify(allSkill));
        window.location.reload();
        render();
    }
}
function formatDate(){
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; 
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;
    return formattedToday;
}
  

