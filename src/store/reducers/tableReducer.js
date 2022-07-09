import { tableActionType } from "../types/tableTypes"

const initialState = {
    table: []
}

export const tableReducer = (state = initialState, action) => {
    switch (action.type){
        case tableActionType.GET_TABLE_DATA:
            return {...state, table: action.payload}
        default: 
            return state
    }

}