import './Home.css'
import TaskCard from './../../component/TaskCard/TaskCard'
import { useState } from 'react'


const Home =()=>
{


    const [tasks,setTasks]=useState([
       
    ])

   const [title,setTitle]=useState('')
   const [discription,setDiscription]=useState('')
   const [priority,setPriority]=useState('')

   function addToTaskBar(){
    const id=Math.ceil( Math.random()*1000 );
    const obj={
        id:id,
        title:title,
        discription:discription,
        priority:priority
       }

    
      setTasks([...tasks,obj])
     
   }

    return(<>
        <div>
            <h1 className='home-title'>Daily Task 🎯</h1>
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
                           tasks.map((task)=>{
                            const{id , title, discription, priority}=task;
                            return <TaskCard title={title} discription={discription} priority={priority} />
                           })
                          }
                   </div>
            </div>
        </div>

    </>)
}

export default Home;