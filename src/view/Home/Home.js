import './Home.css'
import TaskCard from './../../component/TaskCard/TaskCard'
import { useEffect, useState } from 'react'


const Home =()=>
{


    const [tasksList,setTasksList]=useState([
       
    ])
    useEffect(()=>{
        const getListFromLocalStroage=JSON.parse(localStorage.getItem('task'))
       if(getListFromLocalStroage && getListFromLocalStroage.length>0){
        setTasksList(getListFromLocalStroage)
       }
    },[])
   const [isEdit,setIsEdit]=useState(false)
   const [title,setTitle]=useState('')
   const [discription,setDiscription]=useState('')
   const [priority,setPriority]=useState('')
   const [id,setId]=useState(0)

   const saveTOLocalStorage=(task)=>{
    localStorage.setItem('task',JSON.stringify(task))
   }

   const addToTaskBar=()=>{

    const random = Math.ceil( Math.random()*1000 );
    const obj={
        id:random,
        title:title,
        discription:discription,
        priority:priority,
       
       }
   

       const newtask=[...tasksList,obj]
    
      setTasksList(newtask)


      setDiscription('')
      setPriority('')
      setTitle('')

      saveTOLocalStorage(newtask)
     
     
   }

   const setTaskEdit=(id)=>{
    setIsEdit(true)
    setId(id);
        let currentEditTask;
        tasksList.forEach((taskId,i)=>{
            if(taskId.id===id){
              currentEditTask=taskId;
            }
        })

       
       setTitle(currentEditTask.title)
       setDiscription(currentEditTask.discription)
       setPriority(currentEditTask.priority)
         
       
   }

   const updateTask=()=>{
    let updatedTaskList;

    tasksList.forEach((task,i)=>{
        if(task.id===id){
            updatedTaskList=i;
        }
    })


    const UpdateArr=tasksList;

    UpdateArr[updatedTaskList]={
        id:id,
       title:title,
       discription:discription,
       priority:priority
    }

    setTasksList([...UpdateArr])

    saveTOLocalStorage([...UpdateArr]);

    setId(0)
    setTitle('')
    setDiscription('')
    setPriority('')

    setIsEdit(false)


   }

  const removeFromTaskBar=(id)=>{
    let index;
    tasksList.forEach((task,i)=>{
        if(task.id===id){
            index=i
        }
    })


    const tempArr=tasksList;
    tempArr.splice(index,1)
    setTasksList([...tempArr])

    saveTOLocalStorage(tempArr)
  }


    return(<>
        <div className='home-main-container'>
            <h1 className='home-title'>DailyDocket 🎯</h1>
            <div className='flex-contanier'>
                   <div className='add-task-list'>
                          <h3 className='text-center'>{ 
                                isEdit?`Update Task${id}`:'Task List'
                            }</h3>

                            <div className='add-task'>
                                <form>
                                    <input type="text"
                                         value={title}
                                         onChange={(e)=> setTitle(e.target.value)}
                                         placeholder="Enter Title"
                                         className='task-input'
                                         />
                                    <input type="text"
                                         value={discription}
                                         onChange={(e)=> setDiscription(e.target.value)}
                                         placeholder="Enter Discription"
                                         className='task-input'
                                         />
                                    <input type="text"
                                         value={priority}
                                         onChange={(e)=>  setPriority(`${e.target.value}`)  }
                                         placeholder="Enter priority"
                                         className='task-input'
                                         />
                
                                        <div className='btn-contanier'>
                                         {
                                            isEdit?   <button 
                                            className='btn-task'
                                            type='button'
                                           onClick={updateTask}
                                            >
                                              Update 
                                              </button>:  <button 
                                          className='btn-task'
                                          type='button'
                                         onClick={addToTaskBar}
                                          >
                                            Add Task
                                            </button>
                                         }

                                        </div>
                                </form>
                            </div>

                   </div>
                   <div className='add-task-list'>
                          <h3 className='text-center'>
                           Task List
                          </h3>
                          {
                             tasksList.map((task,i)=>{
                                const {title,discription,priority,id}=task;
                                return  <TaskCard 
                                title={title} 
                                discription={discription} 
                                priority={priority}
                                 id={id} 
                                 key={i}
                                 removeFromTaskBar={removeFromTaskBar}
                                 setTaskEdit={setTaskEdit}
                                 />
                             })
                          } 
                   </div>
            </div>
        </div>

    </>)
}

export default Home;