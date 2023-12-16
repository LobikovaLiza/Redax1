export const getUser = ({email, password}) => async (dispatch) => {
    const query = new URLSearchParams({
        email,
        password
      }).toString()
  
      const user = await fetch(`http://localhost:5001/Users?${query}`)
        .then((r) => r.json())
        .then((Users)=>Users[0])
        .then((User)=>{
          if(User){
            dispatch({
              type: 'USER/SET',
              payload: User
            })
          } else {
            throw new Error('Invaid user') 
          }
        })      
}

export const setUser = ({email, password}) => async (dispatch) => {
  const query = new URLSearchParams({
    email,
    password
  }).toString()

  fetch(`http://localhost:5001/Users?${query}`)
    .then((r) => r.json())
    .then((Users)=>Users[0])
    .then((User)=>{
      if(User){
        throw new Error('Registered user') 
      } else {
          const obj = {
              "id": Date.now(),
              "email": email,
              "password": password
            }
            const res = fetch(`http://localhost:5001/Users`, { 
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(obj)
                    })
           .then((r) => r.json())
           dispatch({
            type: 'USER/SET',
            payload: res
          })
      }
    })
    
}