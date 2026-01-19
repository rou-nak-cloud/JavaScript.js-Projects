const todo = document.querySelector('#todo')
const progress = document.querySelector('#progress')
const done = document.querySelector('#done')
const tasks = document.querySelectorAll('.task')

const toggleModal = document.querySelector('#toggle-modal')
const noTaskBtn = document.querySelector('#no-task-btn') 
const modal = document.querySelector('.modal')

let tasksData = {}; 
let draggedIem = null;

function getFormattedDate() {
  return new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function addTask(title,desc,column,createdAt = getFormattedDate(),dueDate=""){
    const div = document.createElement("div");
        div.classList.add("task");
        div.setAttribute("draggable", "true");
        console.log("Rendering due date:", dueDate);

        div.innerHTML = `
            <h2>${title}</h2>
            <p>${desc}</p>
            <small class="task-date">📅 ${createdAt} created.</small>
             <small class="task-due">⏰ Due: ${dueDate || "No due date"}</small>
             <div class="task-actions">
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
        });

        // Delete Logic
        const deleteBtn = div.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            div.remove();
            updateCountTask();
            updateEmptyState(column); // Update empty state for the column where the task was deleted
        });
    return div;
}
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
                date: t.querySelector('.task-date').innerText.replace("📅 ", "")
                .replace(" created.", "")
                .trim(),
                dueDate: t.querySelector('.task-due')
                ? t.querySelector('.task-due').innerText.replace("⏰ Due: ", "").trim()
                : ""
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
            addTask(task.title, task.description, column, task.date, task.dueDate);
        })
        // count
        const count = column.querySelector('.right')
        count.innerText = data[col].length;
    }
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

    // Clear inputs
    document.querySelector("#task-title").value = "";
    document.querySelector("#task-description").value = "";
    document.querySelector("#task-due-date").value = "";
})