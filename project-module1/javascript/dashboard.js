function loginCheck(){
    const email = localStorage.getItem("userLogin");
    //Kiểm tea xem đã đăng nhập hay chưa
    if (email==null) {
        window.location.href="loginPage.html";
    }
    let studentManagementStore = localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
    let numberCourse = 0;
    let numberClass = 0;
    let studdingClass =0;
    let pendingClass = 0;
    let endingClass = 0;
    let numberStudent = 0;
    let studentPending = 0;
    let studentStudding = 0;
    let studentReserve = 0;
    let studentSuspended = 0;
    let studentGraduate = 0;
    studentManagementStore.forEach(course => {
       numberCourse++;
       course.arrClass.forEach(classOfCourse => {
          numberClass++
          if (classOfCourse.status==1) {
            pendingClass++;
          }
          if (classOfCourse.status==2) {
            studdingClass++;
          }
          if (classOfCourse.status==3) {
            endingClass++;
          }
          classOfCourse.arrStudent.forEach(studentOfClass=>{
            numberStudent++;
            if (studentOfClass.status==1) {
              studentPending++;
            }
            if (studentOfClass.status==2) {
                studentStudding++;
            }
            if (studentOfClass.status==3) {
                studentReserve++;
            }
            if (studentOfClass.status==4) {
                studentSuspended++;
            }
            if (studentOfClass.status==5) {
                studentGraduate++;
            }
          })
       })
    });
    document.getElementById("numberCourse").innerHTML="Số lượng khóa học hiện tại là: "+numberCourse;
    document.getElementById("numberClass").innerHTML="Số lượng lớp học hiện tại là: "+numberClass;
    document.getElementById("numberStudent").innerHTML="Số lượng sinh viên là: "+numberStudent;
    document.getElementById("studentPending").innerHTML="Số lượng sinh viên chờ lớp: "+studentPending;
    document.getElementById("studentStudding").innerHTML="Số lượng sinh viên đang học: "+studentStudding;
    document.getElementById("studentReserve").innerHTML="Số lượng sinh viên bảo lưu: "+studentReserve;
    document.getElementById("studentSuspended").innerHTML="Số lượng sinh viên đình chỉ: "+studentReserve;
    document.getElementById("studentGraduate").innerHTML="Số lượng sinh viên tốt nghiệp: "+studentGraduate;
    document.getElementById("studdingClass").innerHTML="Số lượng lớp đang hoạt động: "+studdingClass;
    document.getElementById("pendingClass").innerHTML="Số lượng lớp học đang chờ lớp: "+pendingClass;
    document.getElementById("endingClass").innerHTML="Số lượng lớp đã kết thúc: "+endingClass;
}
function logOut(){
    localStorage.removeItem("userLogin");
    window.location.href="loginPage.html";
}
function courseManagement(){
    window.location.href="courseManagement.html";
}
function dashboard(){
    window.location.href="dashboard.html";
}
function classManagement(){
    window.location.href="classManagement.html";
}
function studentManagement(){
    window.location.href="studentManagement.html";
}
window.onload = loginCheck();