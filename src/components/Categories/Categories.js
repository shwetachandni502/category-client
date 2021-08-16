
import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import './categories.css';
import {
  allCategories,
  addMainCategory,
  } from "../../actions/categoryActions";
  import {CategoryList} from './CategoryList';

const ManageCategory = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const [categoryName, setCategoryName] = useState('');
 
    const handleAddCategory = (e) => {
        e.preventDefault();
       dispatch(addMainCategory(categoryName));
      setCategoryName('');
    }
    
    useEffect(() => {
        dispatch(allCategories());
      }, []);

    return (
        <div className="expand-page">
          <h6>Categories Tree</h6>
            <div className="expand-section">
                
               <div className="left-section">
             <form onSubmit={handleAddCategory}>
                <Form.Group className="" controlId="formBasicEmail">
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control
                     type="text" 
                     name="categoryName"
                     value={categoryName}
                     onChange={(e) => setCategoryName(e.target.value)}
                     />
                </Form.Group>
                <div className="add-btn">
                    <Button type="submit">Add Category</Button>
                </div>
                </form>
               
               </div>
                <div className="right-section">
                <div className="add-item">
                <ul>
               {category?.allCategories?.map((el, i) => {
                  return (
                    <CategoryList
                      item={el}
                      index={i}
                      allCategories={category.allCategories}
                      category={category}
                      dispatch={dispatch}
                    />
                  );
                })}
            </ul>
                </div>
            </div>
            </div>
        </div>
    )
}

export default ManageCategory;


