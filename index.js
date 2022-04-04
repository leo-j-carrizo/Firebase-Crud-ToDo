import { saveTask, getTasks, onGetTask, deleteTask, getTask, updateTask } from "./firebase.js";

const taskForm = document.getElementById('task-form');
const taskContainer = document.getElementById('task-container');

let editStatus = false
let id = ''

window.addEventListener('DOMContentLoaded', async ()=>{

    onGetTask((querySnapshot) => {
        let html = '';

        querySnapshot.forEach(doc => {  
        
            const task = doc.data()
            html += `
            <div class="card card-body mt-2 border-primary">
                <h3 class ="h5">${task.title}</h3>
                <p>${task.description}</p>
                <div>
                    <button class='btn-delete btn btn-primary' data-id="${doc.id}">Delete</button>
                    <button class='btn-edit btn btn-secondary' data-id="${doc.id}">Edit</button>
                </div>
                
            </div>
            `
        });

        taskContainer.innerHTML = html;

        const btnsDelete = taskContainer.querySelectorAll('.btn-delete');

        btnsDelete.forEach(btn => {
            btn.addEventListener('click', ({target:{dataset}}) => {
                deleteTask(dataset.id)
            } );
        });

        const btnsEdit = taskContainer.querySelectorAll('.btn-edit');
        btnsEdit.forEach((btn) =>{
            btn.addEventListener('click', async ({target:{dataset}}) => {
                const doc = await getTask(dataset.id)
                const task = doc.data()
                taskForm['task-title'].value = task.title
                taskForm['task-description'].value = task.description

                editStatus = true
                id = dataset.id

                taskForm['btn-task-save'].innerText = 'Update'
            });
        });
    });
});



taskForm.addEventListener('submit',(e) => {
    e.preventDefault()

    const title = taskForm['task-title']
    const description = taskForm['task-description']
    

    if (!editStatus){
        
        saveTask(title.value,description.value)
    } else{
        console.log("updating")
        updateTask(id, {
            title: title.value,
            description: description.value
        })

        taskForm['btn-task-save'].innerText = 'Save'
        editStatus = false
    }

    taskForm.reset();
});

