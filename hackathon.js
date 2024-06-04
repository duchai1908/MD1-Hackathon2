const PRJ = "project";
const SKL = "skill";
const containerWrapper = document.getElementById("contaniner-wrapper");
const learnTop = document.getElementById("learnTop");
const learnBot = document.getElementById("learnBot");
addPrj();
addSkill();
function addPrj(){
    stringHTML ="";
    let newPrj = JSON.parse(localStorage.getItem(PRJ));
    for(let i = 0; i<newPrj.length; i++){
        if(i == 0 || i == 3){
            stringHTML+= `
            <div class="container-group">
                <div class="container-box">
                    <div class="container-image angular" style="background-image: url(${newPrj[i].image});">
                    </div>
                    <div class="container-lists">
                        <p class="learn-head">${newPrj[i].name}</p>
                        <p class="learn-desc">${newPrj[i].github}</p>
                    </div>
                </div>
                <div class="container-bottom">
                    ${addPrjItem(newPrj[i].id)}
                </div>
            </div>
        `
        }else if(i == 1 || i ==2 || i ==4){
            stringHTML+= `
            <div class="container-group group-item">
                <div class="container-box">
                    <div class="container-image angular" style="background-image: url(${newPrj[i].image});">
                    </div>
                    <div class="container-lists">
                        <p class="learn-head">${newPrj[i].name}</p>
                        <p class="learn-desc">${newPrj[i].github}</p>
                    </div>
                </div>
                <div class="container-bottom">
                    ${addPrjItem(newPrj[i].id)}
                </div>
            </div>
        `
        }
       
    }
    containerWrapper.innerHTML = stringHTML;
}
function addSkill(){
    let stringTop = "";
    let stringBot = "";
    let newSkill = JSON.parse(localStorage.getItem(SKL));
    for(let i =0; i< 5; i++){     
        stringTop += `
                    <div class="learn-items">
                    <div class="learn-img"
                    style="background-image: url(${newSkill[i].image});">
                    </div>
                    <div class="learn-content">
                        <p class="learn-head">${newSkill[i].name}</p>
                        <p class="learn-desc">${newSkill[i].experience}</p>
                    </div>
                </div>
            `
    }
    learnTop.innerHTML=stringTop;
    for(let i =5; i< newSkill.length; i++){     
        stringBot += `
                <div class="learn-items">
                <div class="learn-img"
                style="background-image: url(${newSkill[i].image});">
                </div>
                <div class="learn-content">
                    <p class="learn-head">${newSkill[i].name}</p>
                    <p class="learn-desc">${newSkill[i].experience}</p>
                </div>
            </div>
        `
    }   
    learnBot.innerHTML = stringBot;
}
function addPrjItem(data){
    let newPrj = JSON.parse(localStorage.getItem(PRJ));
    let indexPrj = newPrj.findIndex(prj => prj.id === data);
    let tech = newPrj[indexPrj].technology;
    var ar = tech.split(",");
    let stringHTML = "";
    for(let i = 0; i < ar.length; i++){
        stringHTML += 
        `
        <div class="container-block-item">${ar[i]}</div>
        `
    }
    return stringHTML;
}
<div id="id">
    <p>mail</p>
    <p>setting</p>
</div>
