export const getNotes = (authorId) => async (dispatch) => {
  try {
    dispatch({ type: 'NOTES/LOADING' });
    const params = new URLSearchParams({ UserId: authorId }).toString();
    const notes = await fetch(`http://localhost:5001/Notes?${params}`).then((r) => r.json());
    dispatch({
      type: 'NOTES/SET',
      payload: notes,
    });
  } catch (err) {
    dispatch({
      type: 'NOTES/ERROR',
      payload: err.toString(),
    });
  }
};

export const deleteNotes = ({authorId, note}) => async (dispatch) => {
    try {
      dispatch({ type: 'NOTES/LOADING' });
  await fetch(`http://localhost:5001/Notes/${note.id}`, { 
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(note)
  }).then((r) => r.json());
  dispatch(getNotes(authorId))
} catch (err) {
  dispatch({
    type: 'NOTES/ERROR',
    payload: err.toString(),
  });
}
  }

  export const addNotes = ({authorId, note}) => async (dispatch) => {
    try {
      dispatch({ type: 'NOTES/LOADING' });
      await fetch(`http://localhost:5001/Notes`, { 
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(note)
                      })
             .then((resp) => resp.json())
  dispatch(getNotes(authorId))
} catch (err) {
  dispatch({
    type: 'NOTES/ERROR',
    payload: err.toString(),
  });
}
  }

  export const editNotes = ({authorId, id, obj}) => async (dispatch) => {
    try {
      dispatch({ type: 'NOTES/LOADING' });
      fetch(`http://localhost:5001/Notes/${id}`, { 
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
      }).then((resp) => resp.json())
  dispatch(getNotes(authorId))
} catch (err) {
  dispatch({
    type: 'NOTES/ERROR',
    payload: err.toString(),
  });
}
  }
