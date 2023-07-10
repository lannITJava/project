let btnSubmit = document.getElementById("btnSubmit");
btnSubmit.addEventListener("click",(event)=>{
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let checkLogin = checkUserExist(email,password);
    if (checkLogin) {
       localStorage.setItem("userLogin",email);
        window.location.href= "dashboard.html";
    }else{
        let error = document.getElementById("error");
        error.innerHTML="Email hoặc Password không tồn tại, vui lòng đăng nhập lại";
        error.style.color="red";
        document.getElementById("email").value="";
        document.getElementById("password").value="";

    }

})
function checkUserExist(email,password){
    let userSystem = localStorage.getItem("userSystem")?JSON.parse(localStorage.getItem("userSystem")):[];
    for (let index = 0; index < userSystem.length; index++) {
      if (userSystem[index].email==email&& userSystem[index].password==password) {
        return true;
      }
    }
    return false;
}