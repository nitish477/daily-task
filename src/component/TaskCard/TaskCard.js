import './TaskCard.css'

export default function TaskHome({title,discription,id,priority}){
    return (<>
    
       <div className='task-contanier'>
           <h2 className='task-title'>{title}</h2>
           <p className='task-discription'> {discription} </p>
           <span className='task-priority'> {priority} </span>
       </div>

    </>)

}