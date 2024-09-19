document.addEventListener("DOMContentLoaded", () => {
    const add = document.querySelector("form");
    const ul = document.querySelector("ul");
    const formMessage = document.querySelector('input[name="formdata"]');

    // Load tasks from local storage
    loadTasksFromLocalStorage();

    add.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission
        alert("New Task Added");
        const taskText = formMessage.value;
        if (taskText) {
            const newLi = createTaskElement(taskText, false);
            ul.appendChild(newLi);
            saveTasksToLocalStorage();
            formMessage.value = ""; // Clear input field
        }
    });

    function createTaskElement(text, completed) {
        const newLi = document.createElement("li");
        const newCheck = document.createElement("input");
        const removeTask = document.createElement("button");

        newLi.innerText = text;
        newLi.prepend(newCheck);
        newLi.append(removeTask);

        newCheck.setAttribute("type", "checkbox");
        newCheck.checked = completed;

        removeTask.innerText = "Remove";

        newCheck.addEventListener("click", function() {
            newLi.classList.toggle("strike");
            saveTasksToLocalStorage();
        });

        removeTask.addEventListener("click", function() {
            ul.removeChild(newLi);
            alert("Task Removed");
            saveTasksToLocalStorage();
        });

        if (completed) {
            newLi.classList.add("strike");
        }

        return newLi;
    }

    function saveTasksToLocalStorage() {
        const tasks = [];
        ul.querySelectorAll("li").forEach(li => {
            const text = li.innerText.replace("Remove", "").trim();
            const completed = li.querySelector("input[type='checkbox']").checked;
            tasks.push({ text, completed });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            const newLi = createTaskElement(task.text, task.completed);
            ul.appendChild(newLi);
        });
    }
});



// Add new class to the list elemeent then in ccss do align left 100px?