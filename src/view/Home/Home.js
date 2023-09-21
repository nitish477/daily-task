import './Home.css'
import TaskCard from './../../component/TaskCard/TaskCard'
import { useEffect, useState } from 'react'


const Home =()=>
{


    const [tasksList,setTasksList]=useState([
       
    ])
    useEffect(()=>{
        const getListFromLocalStroage=JSON.parse(localStorage.getItem('task'))
        setTasksList(getListFromLocalStroage)
    },[])

   const [title,setTitle]=useState('')
   const [discription,setDiscription]=useState('')
   const [priority,setPriority]=useState('')

   const saveTOLocalStorage=(task)=>{
    localStorage.setItem('task',JSON.stringify(task))

   }

   const addToTaskBar=()=>{
    if(title==='' && discription==='' && priority===''){
        return
    }
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
                          <h3 className='text-center'>Add task List</h3>

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
                                         <button 
                                          className='btn-task'
                                          type='button'
                                         onClick={addToTaskBar}
                                          >
                                            Add Task
                                            </button>
                                </form>
                            </div>

                   </div>
                   <div className='add-task-list'>
                          <h3 className='text-center'>Show task list</h3>
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
                                 />
                             })
                          } 
                   </div>
            </div>
        </div>

    </>)
}

export default Home;