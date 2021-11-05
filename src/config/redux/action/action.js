import app from "../../firebase/config";
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword} from "firebase/auth";
import { getDatabase, ref, push, onValue ,set,remove} from "firebase/database";


export const changeNameAsyn = () => (dispatch) => {
    setTimeout( () => {
        return dispatch({type: 'CHANGE_NAME' , value: 'feizal reza'})
    } , 2000)
}

export const registerPage = (data) => (dispatch) => {
    return new Promise((resolve , reject) => {
        dispatch({type: "LOADING", value: true})
    
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            dispatch({type: "LOADING", value: false})
            resolve(user)
        })
        .catch((error) => {
            const errorMessage = error.message;
            dispatch({type: "LOADING", value: false})
            reject(errorMessage)
        });
    })
}

export const loginPage = (data) => (dispatch) => {
    return new Promise((resolve , reject) => {
        dispatch({type: "LOADING", value: true})
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const dataUser = {
                email: user.email, 
                id: user.uid,
                username: user.displayName,
                isVerivied: user.emailVerified
            }
            localStorage.setItem("dataUser", JSON.stringify(dataUser))
            dispatch({type: "USER_SIGNIN", value: dataUser})
            dispatch({type: "LOADING", value: false})
            resolve(dataUser)
        })
        .catch((error) => {
            const errorMessage = error.message;
            dispatch({type: "LOADING", value: false})
            reject(errorMessage)
        });
    }) 
}

export const saveData = (data) => (dispatch) => {
    return new Promise((resolve , reject) => {
        dispatch({type: "LOADING", value: true})
        const db = getDatabase(app)
        push(ref(db, 'users/' + data.userId + '/nextUp'),{
            judul: data.judul,
            deadline: data.deadline,
            content: data.content,
            step: "nextUp"
        }).then(() => {
            dispatch({type: "LOADING", value: false})
            dispatch({type: "SENDING_SUCCES", value: 'true'})
            resolve(true)
        })
        .catch((error => {
            dispatch({type: "SENDING_SUCCES", value: true})
            dispatch({type: "LOADING", value: false})
            reject(false)
        }))
    })
}

export const inProgres = (data,userId) =>  {
    return new Promise((resolve , reject) => {
        const db = getDatabase(app)
        push(ref(db, `users/${userId}/inProgres`),{
            judul: data.judul,
            deadline: data.deadline,
            content: data.content,
            step: "inProgres"
        }).then(() => {
            resolve(true)
        })
        .catch((error => {
            reject(false)
        }))
    })
}

export const Completed = (data,userId) =>  {
    return new Promise((resolve , reject) => {
        const db = getDatabase(app)
        push(ref(db, `users/${userId}/Completed`),{
            judul: data.judul,
            deadline: data.deadline,
            content: data.content,
            step: "Completed"
        }).then(() => {
            resolve(true)
        })
        .catch((error => {
            reject(false)
        }))
    })
}

export const getData = (id) => (dispatch) => {
    return new Promise((resolve , reject) => {
        const db = getDatabase(app);
        const starCountRef = ref(db,`users/${id}/nextUp`)
        onValue(starCountRef, (snapshot) => {
            const data = []
            if(snapshot.val() != null){
                Object.keys(snapshot.val()).forEach(e => {
                    data.push({
                        id: e,
                        value: snapshot.val()[e]
                    })
                })
            }
            dispatch({type: "DATA_NOTES", value: data})
            resolve(data)
        });
    })
}

export const getDataInProgres = (id) => (dispatch) => {
    return new Promise((resolve , reject) => {
        const db = getDatabase(app);
        const starCountRef = ref(db,`users/${id}/inProgres`)
        onValue(starCountRef, (snapshot) => {
            const data = []
            if(snapshot.val() != null){
                Object.keys(snapshot.val()).forEach(e => {
                    data.push({
                        id: e,
                        value: snapshot.val()[e]
                    })
                })
            }
            dispatch({type: "IN_PROGRES", value: data})
            resolve(data)
        });
    })
}

export const getDataCompleted = (id) => (dispatch) => {
    return new Promise((resolve , reject) => {
        const db = getDatabase(app);
        const starCountRef = ref(db,`users/${id}/Completed`)
        onValue(starCountRef, (snapshot) => {
            const data = []
            if(snapshot.val() != null){
                Object.keys(snapshot.val()).forEach(e => {
                    data.push({
                        id: e,
                        value: snapshot.val()[e]
                    })
                })
            }
            dispatch({type: "COMPLETED", value: data})
            resolve(data)
        });
    })
}

export const updateData = (data,action,id) => (dispatch) => {
    return new Promise((resolve , reject) => {
        dispatch({type: "LOADING", value: true})
        const db = getDatabase(app)
        set(ref(db, `users/${id}/${action}/${data.id}`),{
            judul: data.judul,
            deadline: data.deadline,
            content: data.content,
            step:action
        }).then(() => {
            dispatch({type: "LOADING", value: false})
            dispatch({type: "SENDING_SUCCES", value: 'true'})
            resolve(true)
        })
        .catch((error => {
            console.log(error)
            dispatch({type: "SENDING_SUCCES", value: true})
            dispatch({type: "LOADING", value: false})
            reject(false)
        }))
    })
}

export const deleteData = (id,userId,type,action) =>  {
    const db = getDatabase(app)
    remove(ref(db, `users/${userId}/${action}/${id}` ))
    .then(() => {
        if(type !== 'move'){
            alert('Delete succes')
        }
    })
    .catch(error => {
        console.log(error)
    })
}

