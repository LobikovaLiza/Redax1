import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { selectNotes, selectNotesError, selectNotesLoading } from "../redax/notes/selectors";
import { deleteNotes, getNotes } from "../redax/notes/actions";
import { selectUserId } from "../redax/user/selectors";


export default function Notes() {

  const  authorId = useSelector(selectUserId)

 
  const dispatch = useDispatch()

  const handleTime = (id) =>{
    const date = new Date(id)
    return date.toLocaleDateString()
  }

  const handleDelete = async (note) =>  {
    dispatch(deleteNotes({authorId, note}))
  }

  useEffect(() => {
    dispatch(getNotes(authorId))
  }, [authorId, dispatch]);

  const notes = useSelector(selectNotes)
  const loading = useSelector(selectNotesLoading)
  const error = useSelector(selectNotesError)

  if(loading){
    return <div>Loading....</div>
  }
  if(error){
    return <div  className="text-red-400">{error}</div>
  }
  return (
    
    <div className="prose flex flex-col mx-auto">
      
      <h1 className="mx-auto text-2xl" >Notes</h1>

      <Link
          to="/notes/add"
          className="bg-gray-400 mx-auto px-10 py-2 mt-4 text-2xl mb-4 no-underline"
      >
        Add New Notes
      </Link>
      <div className="mb-10">
        {notes
        .sort((a, b) => { return b.id- a.id})
        .map((note) => (
            <Link key={note.id} to={`/notes/${note.id}`} className="flex justify-between no-underline bg-gray-300 px-5 py-1 mb-1">
                <div className="flex gap-1">
                  <div>{note.title}</div>
                  <div className=" text-gray-400">{handleTime(note.id)}</div>
                </div>

                <div>
                  <Link to={`/note/edit/${note.id}`} className=" no-underline" >✎</Link>
                  <button onClick={(event) => {handleDelete(note); event.preventDefault()}}>🗑️</button>
                </div>
            </Link>
        ))
        }
      </div>
    </div>
  )
}
