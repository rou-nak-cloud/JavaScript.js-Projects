const todo = document.querySelector('#todo')
const progress = document.querySelector('#progress')
const done = document.querySelector('#done')
const tasks = document.querySelectorAll('.task')

const toggleModal = document.querySelector('#toggle-modal')
const noTaskBtn = document.querySelector('#no-task-btn') 
const modal = document.querySelector('.modal')

// Edit Modal Elements
const editModal = document.getElementById("editModal");
const editTitleInput = document.getElementById("editTitleInput");
const editDescInput = document.getElementById("editDescInput");
const editDateInput = document.getElementById("editDateInput");
const saveEditBtn = document.getElementById("saveEditBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");
const editModalBg = editModal.querySelector(".bg");



let tasksData = {}; 
let draggedIem = null;
let currentEditTask = null;

function getCreatedDate() {
  return new Date().toISOString(); // sortable
}

function getFormattedDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function sortTasksByCreatedDate(column, newestFirst = true) {
  const tasks = [...column.querySelectorAll(".task")];

  tasks.sort((a, b) => {
    const dateA = new Date(a.dataset.createdAt);
    const dateB = new Date(b.dataset.createdAt);

    return newestFirst ? dateB - dateA : dateA - dateB;
  });

  tasks.forEach(task => column.appendChild(task));
}

function addTask(title,desc,column,createdAt = getCreatedDate(),dueDate="", completed=false){
    const div = document.createElement("div");
        div.classList.add("task");
        div.setAttribute("draggable", "true");

          // store raw date of element to localStorage
         div.dataset.createdAt = createdAt;

        div.innerHTML = `
            <h2>${title}</h2>
            <p>${desc}</p>
            <small class="task-date">📅 ${getFormattedDate(createdAt)} created.</small>
             <small class="task-due">⏰ Due: ${dueDate || "No due date"}</small>
             <div class="task-actions">
                <button type="button" class="edit-btn">Edit</button>
                <button type="button" class="done-btn" style="display:none;">Done?</button>
                <button type="button" class="delete-btn">Delete</button>
            </div>
        `;    
        column.appendChild(div)
        div.addEventListener('drag', (e)=>{
            draggedIem = div;
        })

        // Done button logic
        const doneBtn = div.querySelector(".done-btn");
        doneBtn.addEventListener("click", () => {
        div.classList.toggle("completed");
        doneBtn.innerText = div.classList.contains("completed")
            ? "Completed"
            : "Done?";
            updateCountTask(); // save state
        });

        // Delete Logic
        const deleteBtn = div.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            div.remove();
            updateCountTask();
            updateEmptyState(column); // Update empty state for the column where the task was deleted
        });

        // Edit Logic (Modal-based)
        const editBtn = div.querySelector(".edit-btn");

        editBtn.addEventListener("click", () => {
        currentEditTask = div; // which task I am editing right now.

        editTitleInput.value = div.querySelector("h2").innerText;
        editDescInput.value = div.querySelector("p").innerText;

        const dueText = div.querySelector(".due-date");
        editDateInput.value = dueText?.dataset.date || "";

        editModal.classList.add("active");
        });

    return div;
}
    // Save edited task
    saveEditBtn.addEventListener("click", () => {
    if (!currentEditTask) return;

      const newTitle = editTitleInput.value.trim();
        const newDesc = editDescInput.value.trim();
        const newDate = editDateInput.value;

        if (newTitle === "") return alert("Title cannot be empty");

        currentEditTask.querySelector("h2").innerText = newTitle;
        currentEditTask.querySelector("p").innerText = newDesc;

        const dueEl = currentEditTask.querySelector(".due-date");
        if (dueEl) {
            dueEl.innerText = newDate
            ? `Due: ${newDate}`
            : "Due: No due date";

            dueEl.dataset.date = newDate;
        }

    updateCountTask(); // persist to localStorage

    editModal.classList.remove("active");
    currentEditTask = null;
    });
    // Cancel edit
    cancelEditBtn.addEventListener("click", () => {
    editModal.classList.remove("active");
    currentEditTask = null;
    });
    editModalBg.addEventListener("click", () => {
    editModal.classList.remove("active");
    });

function updateCountTask(){
     const columnsContent = [todo,progress,done]    
        columnsContent.forEach(col => {
        const tasks = col.querySelectorAll('.task');
            const count = col.querySelector('.right')

            // store the data, as map return an array
            tasksData[col.id] = [...tasks].map(t => {
               return{
                title: t.querySelector('h2').innerText,
                description: t.querySelector('p').innerText,
                createdAt: t.dataset.createdAt || 
                    t.querySelector('.task-date').innerText.replace("📅 ", "")
                    .replace(" created.", "")
                    .trim(),
                dueDate: t.querySelector('.task-due')
                ? t.querySelector('.task-due').innerText.replace("⏰ Due: ", "").trim()
                : "",
                completed: t.classList.contains("completed")
               }
            });
            localStorage.setItem("AllTasks", JSON.stringify(tasksData))
            count.innerText = tasks.length;
        })
}
// get the localStorage data
if(localStorage.getItem("AllTasks")){
    const data = JSON.parse(localStorage.getItem("AllTasks"))

    for(const col in data){
        const column = document.querySelector(`#${col}`)
        data[col].forEach(task => {
            const taskDiv = addTask(
            task.title,
            task.description,
            column,
            task.createdAt,
            task.dueDate,
            task.completed
            );

        // restore completed state
        if (task.completed) {
            taskDiv.classList.add("completed");

            const doneBtn = taskDiv.querySelector(".done-btn");
            doneBtn.style.display = "block";
            doneBtn.innerText = "Completed";
        }
        })
        // count
        const count = column.querySelector('.right')
        count.innerText = data[col].length;
    }

    //  SORT AFTER RESTORE from localStorage
    [todo, progress, done].forEach(col => {
        sortTasksByCreatedDate(col, true);
    });
}

tasks.forEach(task => {
    task.addEventListener("drag", (e) => {
        // console.log("dragging")
        draggedIem = task
    });
})

function updateEmptyState(column) {
  const hasTask = column.querySelector(".task");
  const emptyText = column.querySelector(".empty-text");

  if(!emptyText) return;

    emptyText.style.display = hasTask ? "none" : "block";
}
document.addEventListener("DOMContentLoaded", () => {
  updateEmptyState(todo);
  updateEmptyState(progress);
  updateEmptyState(done);
});
function addDragLeaveEvent(column){
    column.addEventListener("dragenter", function(e){
        e.preventDefault();
        this.classList.add("hover-over");
    });
    column.addEventListener("dragleave", function(e){
        this.classList.remove("hover-over");
    })
    column.addEventListener("dragover", function(e){
        e.preventDefault();
    })
    column.addEventListener("drop", function(e){
        e.preventDefault();
        // console.log("Dropped", draggedIem, column)
        
        column.appendChild(draggedIem);
        this.classList.remove("hover-over");

        // show/hide Done button
        const doneBtn = draggedIem.querySelector(".done-btn");

        if (column.id === "done") {
            doneBtn.style.display = "block";
        } else {
            doneBtn.style.display = "none";
            draggedIem.classList.remove("completed");
            doneBtn.innerText = "Done?";
        }

     // to check whether task is present or not cause we dropped new task here 
       updateEmptyState(todo);
        updateEmptyState(progress);
        updateEmptyState(done);

        // to count tasks for each column
        // these are dom elem wrapping it in [] make an array..
        [todo,progress,done].forEach(col => {
            const tasks = col.querySelectorAll('.task');
            const count = col.querySelector('.right')

            count.innerText = tasks.length;
        })
         // to again store in the local storage for new place for the task
        updateCountTask();
        sortTasksByCreatedDate(column, true);
        draggedIem = null;
    })
}
addDragLeaveEvent(todo)
addDragLeaveEvent(progress)
addDragLeaveEvent(done)

toggleModal.addEventListener('click', () => {
    modal.classList.add('active')
})
noTaskBtn.addEventListener('click', () => {
    modal.classList.remove('active')
})

// Add Task
const addTaskBtn = document.querySelector('#add-new-task')

addTaskBtn.addEventListener('click', ()=> {
    const taskTitle = document.querySelector('#task-title').value.trim()
    const taskDescription = document.querySelector('#task-description').value.trim()
    const dueDate = document.querySelector("#task-due-date").value;
    
     if (!taskTitle || !taskDescription) return;

     addTask(taskTitle,taskDescription,todo,undefined,dueDate)
     modal.classList.remove('active')
    updateEmptyState(todo);
    // to count tasks for each column and to store the task data also for every col id
    // update task count
    updateCountTask();
      // sort after adding
    sortTasksByCreatedDate(todo, true);

    // Clear inputs
    document.querySelector("#task-title").value = "";
    document.querySelector("#task-description").value = "";
    document.querySelector("#task-due-date").value = "";
})
