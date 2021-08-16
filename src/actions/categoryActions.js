import axios from "axios";
import {toast} from "react-toastify";
import { IS_LOADING, ALL_CATEGORY, CURRENT_CATEGORY } from "./types";
import { categoryInstance } from "../utils/api";

/* category ------------------------------------------------------------------------------------- */
export const addMainCategory = (name) => async(dispatch) => {
    dispatch({ type: IS_LOADING, payload: true });
        try {
          const response = await categoryInstance.post("/addMainCategory", {categoryName: name});
          const { error, status, data, msg } = response;
          if (error) {
            dispatch({ type: IS_LOADING, payload: false });
            return toast.error(error);
          }
          if (status) {
            dispatch({
              type: ALL_CATEGORY,
              payload: data?.allCategory,
            });
    
            dispatch({ type: IS_LOADING, payload: false });
    
            toast.success(msg);
          }
        } catch (error) {
          return error;
        }
      };
  
  export const allCategories = () => async(dispatch) => {
    dispatch({ type: IS_LOADING, payload: true });
    try {
        const response = await categoryInstance.get("/getAllCategory");
        const { error, status, data } = response;
       
        if (error) {
            dispatch({ type: IS_LOADING, payload: false });
            return toast.error(error);
          }
          if (status === 200) {
            dispatch({
              type: ALL_CATEGORY,
              payload: data.allCategory,
            });
    
            dispatch({ type: IS_LOADING, payload: false });
          }
      } catch (error) {
        return error;
      }
  };

  export const getSingleCategory =  (id) => async(dispatch) =>  {
    try{
    const response = await categoryInstance.get(`/getSingleCategory/${id}`);
    const { error, status, data, msg } = response;
    if (error) {
      dispatch({ type: IS_LOADING, payload: false });
      return toast.error(error);
    }
    if (status === 200) {
      dispatch({
        type: CURRENT_CATEGORY,
        payload: data,
      });
      dispatch({ type: IS_LOADING, payload: false });
      toast.success(msg);
}}
catch(error){
  return error;
}
  };
  export const addSubCategory =  (payload) => async(dispatch) =>  {
    try{
      const response = await categoryInstance.post("/addSubCategory", payload);
          const { error, status, data, msg } = response;
          if (error) {
            dispatch({ type: IS_LOADING, payload: false });
            return toast.error(error);
          }
          if (status === 200) {
            dispatch({
              type: ALL_CATEGORY,
              payload: data.allCategory,
            });
            dispatch({ type: IS_LOADING, payload: false });
            toast.success(msg);
    }}
    catch(error){
      return error;
    }
  }
  export const editCategory = (id, payload) => async(dispatch) => {
   try{
    const response = await categoryInstance.patch(`/editCategory/${id}`, {categoryName:payload});
    const { error, status, msg, data } = response;
    if (error) {
      dispatch({ type: IS_LOADING, payload: false });
      return toast.error(error);
    }
    if (status === 200) {
      dispatch({
        type: ALL_CATEGORY,
        payload: data.allCategory,
      });
      dispatch({ type: IS_LOADING, payload: false });
      toast.success(msg);    
   }
  }
   catch(error){
     return error;
   }
  };
  
  export const deleteCategory = (id) => async (dispatch) => {
    try {
      const response = await categoryInstance.delete(
        `/deleteCategory/${id}`
      );
      const { status, msg } = response;
      if (status === 200) {
        toast.success(msg);
      }
    } catch (error) {
      return error;
    }
 
  };