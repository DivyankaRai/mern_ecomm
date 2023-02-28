import { Add_Product_Failure, Add_Product_Request, Add_Product_Success } from "./AdminActionType"


export const adminProductReducer = (state={adminProduct:{}}, action) => {
    switch (action.type) {
        case Add_Product_Request: {
            return {
                isLoading: true,
                isError: false
            }
        }
        case Add_Product_Success: {
            return {
                ...state,
                isLoading: true,
                isError: false,
                adminProduct: action.payload
            }
        }
        case Add_Product_Failure: {
            return {
                ...state,
                isLoading: true,
                isError: true,
                adminProduct:null,
            }
        }
        default:
            return state
    }
}