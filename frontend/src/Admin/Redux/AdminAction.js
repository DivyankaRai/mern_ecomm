import { Add_Product_Failure, Add_Product_Request, Add_Product_Success } from "./AdminActionType"

export const addProductRequest = () =>{
    return {
        type: Add_Product_Request
    }
}

export const addProductSuccess = (payload) =>{
    return {
        type: Add_Product_Success,
        payload
    }
}

export const addProductFailure = () =>{
    return {
        type: Add_Product_Failure
    }
}