const initialState = {
    isLogin:false,
    popUpForm: false,
    isLoading: false,
    sendindSucces: 'false',
    user: {},
    dataNotes:[],
    inProgress:[],
    completed:[],
}

const reducer = (state = initialState , action) => {
    switch (action.type) {
        case "LOGIN":
        return {
            ...state,
            isLogin: action.value
        }
        case "CHANGE_POPUPFORM":
            return {
            ...state,
            popUpForm: action.value
            }
        case "CHANGE_NAME":
            return {
            ...state,
            name: action.value
            }
        case "LOADING":
            return {
            ...state,
            isLoading: action.value
            }
        case "USER_SIGNIN":
            return {
            ...state,
            user: action.value
            }
        case "SENDING_SUCCES":
            return {
            ...state,
            sendindSucces: action.value
            }
        case "DATA_NOTES":
            return {
            ...state,
            dataNotes: action.value
            }
        case "IN_PROGRES":
            return {
            ...state,
            inProgress: action.value
            }
        case "COMPLETED":
            return {
            ...state,
            completed: action.value
            }
        default:
            return state
    }
}

export default reducer