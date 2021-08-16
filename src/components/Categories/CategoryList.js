import React, { useState, useEffect, useRef } from 'react';
import toast from "react-hot-toast";
import {
    allCategories,
    getSingleCategory,
    editCategory,
    deleteCategory,
    addSubCategory,
    } from "../../actions/categoryActions";
import EditAddModal from "../modal";
import { useDispatch, useSelector } from "react-redux";
    
export const CategoryList = ({ item }) => {
    const dispatch = useDispatch();
    const category = useSelector((state) => state.category);
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
  
    const initialState = {
      categoryName: "",
      type: "",
      id: "",
      isRightOpen: false,
    };
    const [expand,setExpand] = useState(false)
    const [details, setDetails] = useState(initialState);

    const useOutsideAlerter = (ref) => {
      useEffect(() => {
        const handleClickOutside = (event) => {
          if (ref.current && !ref.current.contains(event.target)) {
            setDetails({ ...details, isRightOpen: false });
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref, details]);
    };
    
   const wrapperRef = useRef(null);
   useOutsideAlerter(wrapperRef);
   const loadItem = async (id) => { 
     setData(null);
     dispatch(getSingleCategory(id))
    };
    useEffect(() => {
      if(!category) return
        const { currentCategory } = category;
        setData(currentCategory?.currentCategory?.subs);
    }, [category]);

  
    const openMenus = (id) => {
      setDetails({ ...details, id, isRightOpen: true });
    };
  
  
    const handleClose = (type, value) => {
      if (type === "open") {
        if (value === "edit") {
          setDetails({ ...details, type: value, categoryName: item.categoryName });
        } else {
          setDetails({ ...details, type: value });
        }
      } else {
        setDetails(initialState);
      }
      setShow(!show);
    };
  
    const EditAddCategory = async () => {
      try {
        const { id, categoryName, type } = details;
        if (!categoryName.trim()) {
          toast.error("Please add sub category name.");
          return;
        }
        if (type === "edit") {
          dispatch(editCategory(id, categoryName));
          handleClose();
        }
         else if (type === "add") {
           dispatch(addSubCategory({_id: id, categoryName}));
           handleClose();
        }
      } catch (e) {
        return;
      }
    };
    const DeleteSub = async (id) => {
      dispatch(deleteCategory(id));
      dispatch(allCategories())
    };
  
    return (
      <div className="category">
        <EditAddModal
          show={show}
          handleClose={handleClose}
          details={details}
          setDetails={setDetails}
          EditAddCategory={EditAddCategory}
        />
  
        {details.isRightOpen && (
          <div className="menu" ref={wrapperRef}>
            <h6 onClick={() => handleClose("open", "edit")}> Edit</h6>
            <h6 onClick={() => handleClose("open", "add")}>Add sub category</h6>
            <h6 onClick={() => DeleteSub(details.id)}> Delete</h6>
          </div>
       )}
  
        <div
          className={`category-name ${"data" ? "open" : ""}`}
          onClick={() =>{ loadItem(item._id)
          setExpand(!expand)
          }}
          onContextMenu={(e) => {
            openMenus(item._id);
            e.preventDefault();
          }}
        >
          {item.categoryName}
        </div>
       
          {expand && <ul>
            {item?.subs?.map((child, i) => (
  
              <li key={i}>
                <Parent item={child} />
              </li>
            ))}
          </ul>}
      </div>
    );
  };
  
const Parent = ({ item }) => {
    const Component = item.type ? CategoryList : Section;
    return <Component item={item} />;
  };
const Section = ({ item: { categoryName } }) => <div className="section">{categoryName}</div>;

