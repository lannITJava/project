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
// render Page
let currentPage = 1;
let recordsPerPage = 3;
let action = "create";
function renderData(page){
    let studentManagementStore= localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
    let pageMax = getTotalPage(studentManagementStore);
    if (page<-1) {
        page = 1;
    }
    if (page>pageMax) {
        page = pageMax;
    }
    let tbody = document.getElementById("content");
    tbody.innerHTML="";
    let indexMinOnPage = (page-1)*recordsPerPage;
    let indexMaxOnPage;
    if (page*recordsPerPage>studentManagementStore.length) {
        indexMaxOnPage= studentManagementStore.length;
    }else{
        indexMaxOnPage = page*recordsPerPage;
    }
    for (let index = indexMinOnPage; index < indexMaxOnPage; index++) {
       tbody.innerHTML+=`<tr>
                           <td>${studentManagementStore[index].courseId}</td>
                           <td>${studentManagementStore[index].courseName}</td>
                           <td>${studentManagementStore[index].courseTime}</td>
                           <td>${studentManagementStore[index].status}</td>
                           <td>
                                  <button onclick=initEdit('${studentManagementStore[index].courseId})>Edit</button>
                                  <button onclick=deleteCourse('${studentManagementStore[index].courseId})><i class="fa-solid fa-trash-can"></i></button>
                           </td>
                         </tr>`
    }
    let listPage = document.getElementById("listPage");
    listPage.innerHTML="";
    for (let i = 1; i <= pageMax; i++) {
       listPage.innerHTML+=`<li><a href="javascript:clickPage('${i}')">${i}</a></li>`
    }
    let preview = document.getElementById("preview");
    let next = document.getElementById("next");
    if (currentPage==1) {
        preview.style.visibility="hidden";
    }else{
        preview.style.visibility="visible";
    }
    if (currentPage==pageMax) {
        next.style.visibility="hidden";
    } else {
        next.style.visibility="visible";
    }
}
function previewPage(){
    currentPage--;
    renderData(currentPage);
}
function nextPage() {
    currentPage++;
    renderData(currentPage);
}
function getTotalPage(studentManagementStore){
    return Math.ceil(studentManagementStore.length/recordsPerPage);
}
function clickPage(page){
    renderData(page);
}
/*var newCourseModal = new bootstrap.Modal(document.getElementById('newCourse'), {
    keyboard: false
});*/
let btnSubmit = document.getElementById("btnSubmit");
btnSubmit.addEventListener("click",(event)=>{
    event.preventDefault();
    if (action=="create") {
        createCourse();
    } else {
        updateCourse();
    }
})
function createCourse(){
    let newCourse = getDataForm();
    let studentManagementStore= localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
    studentManagementStore.push(newCourse);
    localStorage.setItem("studentManagementStore",JSON.stringify(studentManagementStore));
    resetForm();
   // newCourse.hide();
   renderData(1);
}
function initEdit(courseId){
    let studentManagementStore= localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
    let index = getCourseId(studentManagementStore,courseId);
    document.getElementById("updateCourseId").value=studentManagementStore[index].courseId;
    document.getElementById("updateCourseId").readOnly=true;
    document.getElementById("updateCourseName").value= studentManagementStore[index].courseName;
    document.getElementById("updateCourseTime").value= studentManagementStore[index].courseTime;
    if (studentManagementStore[index].status=="active") {
        document.getElementById("updateActive").checked=true;
    }else{
        document.getElementById("updateInactive").checked= false;
    }
    action="edit";
}
function getCourseId(studentManagementStore,courseId){
    for (let index = 0; index < studentManagementStore.length; index++) {
        if (studentManagementStore[index].courseId==courseId) {
            console.log(courseId);
        }
    }
    return -1;
}

function updateCourse(){
    let studentManagementStore= localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
    let updateCourse = getDataForm();
    let index = getCourseId(studentManagementStore,courseId);
    if (index>-1) {
        studentManagementStore[index]=updateCourse;
    }
    localStorage.setItem("studentManagementStore",JSON.stringify(studentManagementStore));
    action ="create";
    resetForm();
    document.getElementById("courseId").readOnly = false;
    renderData(1);
}
function deleteCourse(){
    let studentManagementStore= localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
    let index = getCourseId(studentManagementStore,courseId);
    studentManagementStore.splice(index,1);
    localStorage.setItem("studentManagementStore",JSON.stringify(studentManagementStore));
    renderData(1);
}
function resetForm(){
    document.getElementById("courseId").value="";
    document.getElementById("courseName").value="";
    document.getElementById("courseTime").value="";
    document.getElementById("active").checked=true;
}
function getDataForm(){
    let courseId = document.getElementById("courseId").value;
    let courseName = document.getElementById("courseName").value;
    let courseTime = +document.getElementById("courseTime").value;
    let status = document.querySelector("input[type='radio']:checked").value;
    let course = {courseId,courseName,courseTime,status,"arrClass":[]};
    return course;
}

document.onload= renderData(1);