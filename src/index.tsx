import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import "./main.less"
import Root from "./views/Root";
// import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// const client = new ApolloClient({
//   uri: 'https://flyby-router-demo.herokuapp.com/',
//   // uri: 'http://212.56.40.235:5005',
//   cache: new InMemoryCache(),
// });

// client
//   .query({
//     query: gql`
//       query all_users {
//         id,
//         pub_key,
//         post
//       }
//     `,
//   })
//   .then((result) => console.log('apollo client',result));

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);


root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
