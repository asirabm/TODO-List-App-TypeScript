import {v4} from 'uuid'
const list=document.getElementById("List")
const form=document.getElementById("new-task-forms")
const input=document.querySelector<HTMLInputElement>("#new-task-title")


type Task={
  id:string,
  title:string,
  completed:boolean,

}
const tasks:Task[]=loadTask()
tasks.forEach(addListItems)

form?.addEventListener("submit",e=>{
  console.log(input?.value)
   e.preventDefault()
  if(input?.value==="" || input?.value == null) return

  const task={
  id:v4(),
  title:input.value,
  completed:false,
  createdAt:new Date()
  }
  tasks.push(task)
  saveTask()
  addListItems(task)
  input.value=""
})
function addListItems(task:Task){
 const item=document.createElement("li")
 const lable=document.createElement("label")
 const input=document.createElement("input")
 input.addEventListener('change',e=>{
  task.completed=input.checked
  saveTask()
 })
 input.type="checkbox"
 input.checked=task.completed
 lable.append(input,task.title)
 item.append(lable)
 list?.append(item)
}
function saveTask(){
localStorage.setItem("TASKS",JSON.stringify(tasks))
}
function loadTask():Task[]{
  const taskJSON=localStorage.getItem("TASKS")
  if(taskJSON==null) return []
  return JSON.parse(taskJSON)
}