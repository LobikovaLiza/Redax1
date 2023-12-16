import { useState } from "react"
import { Link, useLoaderData, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redax/user/selectors";
import { editNotes } from "../redax/notes/actions";

export const loader = async ({ params: { id } }) => {
    
    const note = await fetch(
      `http://localhost:5001/Notes/${id}`
    ).then((r) => r.json());
  
    if (!note.id) {
      throw redirect(`/eror`);
    }

    return { note };
  };

export default function EditNote() {
  const {note} = useLoaderData();
  const  authorId = useSelector(selectUser)
  const [title, setTitle]= useState(note.title)
  const [description, setDescription]= useState(note.description)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  function handleAddNotes(id){
    const obj =  {
           "title": title, 
           "description": description
         }
      dispatch(editNotes({ authorId, id, obj}))
    navigate(`/`)
  }
  return (
    
    

    <div className="prose flex flex-col mx-auto">
      
      <div className="prose flex flex-col ">
          <Link to={`/notes`} className="no-underline bg-gray-400 px-6 w-20" >Back</Link>
          <h1 className="mx-auto text-2xl" >Edit Notes</h1>
      </div>

        <input placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} className='mt-4 bg-gray-300 '/>
        {!title && <div className="text-red-400">Пустым быть не может!</div>}

        <textarea placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} className='mt-2 bg-gray-400' />
        
        <button 
          className="bg-gray-400 mx-auto px-10 py-2 mt-4 text-2xl mb-4 no-underline"
          onClick={() => { if (title != '') handleAddNotes(note.id); }} 
        >
          Edit
        </button>
    </div>
  )
}
