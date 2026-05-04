function validateForm(){

let license=document.querySelector("[name='license']").value;
let engine=document.querySelector("[name='engine']").value;
let mechanic=document.querySelector("[name='mechanic']").value;

if(license=="" || engine==""){
    alert("All fields required");
    return false;
}

if(isNaN(engine)){
    alert("Engine number must be numeric");
    return false;
}

if(mechanic==""){
    alert("Please select mechanic");
    return false;
}

return true;

}
