import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import { Provider } from "react-redux";
import store from "./store";
import Categories from "./components/Categories/Categories";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar
            newestOnTop
            closeOnClick
            transition={Slide}
          />
          <Switch>
            <Route exact path="/" component={Categories} />
         
            
          </Switch>
        </React.Fragment>
      </Router>
    </Provider>
  );
}

export default App;
