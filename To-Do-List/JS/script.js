const inpuBox = document.getElementById("input-box");
const listContainer = document.getElementById("list_container");
const errorMessage = document.getElementById("error_message");
const successMessage = document.getElementById("success_message");

let lastDeletedTask = null;

function showMessage(messageElement) {
    messageElement.style.display = "block";
    setTimeout(() => {
        messageElement.style.display = "none";
    }, 3000);
};

function addTask(){
    errorMessage.style.display = "none";
    successMessage.style.display = "none";

    if(inpuBox.value ===''){
        showMessage(errorMessage);
    }else{
        let li = document.createElement("li");
        li.innerHTML = inpuBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        showMessage(successMessage);
    }
    inpuBox.value = "";
    saveData();
};

function filterTasks() {
    let filterOption = document.getElementById("filter").value;
    let tasks = document.querySelectorAll("ul li");

    tasks.forEach(task => {
        task.style.display = "list-item";
    });

    tasks.forEach(task => {
        switch (filterOption) {
            case "done":
                if (!task.classList.contains("checked")) {
                    task.style.display = "none";
                }
                break;
            case "not_done":
                if (task.classList.contains("checked")) {
                    task.style.display = "none"; 
                }
                break;
            default:
                task.style.display = "list-item";
                break;
        }
    });
};

function undoTask() {
    if (lastDeletedTask) {
        listContainer.appendChild(lastDeletedTask);
        lastDeletedTask = null;
        saveData();
    }
};

listContainer.addEventListener("click",function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }else if(e.target.tagName === "SPAN"){
        lastDeletedTask = e.target.parentElement;
        e.target.parentElement.remove();
        saveData();
    }
},false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
};

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
};
showTask();

const clearButton = document.getElementById("clear_all");

clearButton.addEventListener("click", function() {
    if (confirm("Are you sure you want to delete all tasks?")) {
        listContainer.innerHTML = '';
        localStorage.removeItem("data");
    }
});