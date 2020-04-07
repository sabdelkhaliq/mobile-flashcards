import React from "react";

// this is the equivalent to the createStore method of Redux
// https://redux.js.org/api/createstore

const MyContext = React.createContext();

// create the consumer as higher order component
export const withGlobalContext = (ChildComponent) => (props) => (
  <MyContext.Consumer>
    {(context) => <ChildComponent {...props} global={context} />}
  </MyContext.Consumer>
);

export default MyContext;
