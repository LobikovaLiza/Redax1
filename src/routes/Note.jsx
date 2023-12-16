import { Link,  redirect, useLoaderData, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../redax/user/selectors";
import { deleteNotes } from "../redax/notes/actions";

export const loader = async ({ params: { id } }) => {
    
    const note = await fetch(
      `http://localhost:5001/Notes/${id}`
    ).then((response) => response.json());
  
    if (!note.id) {
        throw redirect(`/eror`);
      }
  
    return { note };
  };

export default function Note() {
  const  authorId = useSelector(selectUserId)
  const {note} = useLoaderData();
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDelete = async (note) =>  {
    dispatch(deleteNotes({authorId, note}))
    navigate(`/notes` ) 
  }


  
  return (
    <div className="prose flex flex-col mx-auto">
        <div className="prose flex justify-between">
          <div>
             <Link to={`/notes`} className="no-underline bg-gray-400 px-6 py-1 w-20" >Back</Link>
          </div>
         
          <h1 className="mx-auto text-2xl" >{note.title}</h1>
          <div>
              <Link to={`/note/edit/${note.id}`} className=" no-underline" >✎</Link>
              <button onClick={() => handleDelete(note)}>🗑️</button>
          </div>
        </div>

        <pre className=" bg-gray-400 px-6 h-auto">{note.description}</pre>
        
    </div>
  )
}
