import React, { StrictMode } from "react";
import "@fontsource/inter";
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import "./styles/index.css"
import ScanMain from "./components/main";
import Login from "./routes/Login";
import SearchPage from "./routes/Search";
import { Provider } from "react-redux";
import store from "./redux/store";
import Results from "./routes/Results";
import DateInput from "./components/date";



// Clear the existing HTML content
document.body.innerHTML = '<div id="root"></div>';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <ScanMain />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/search',
                element: <SearchPage />
            },
            {
                path: '/results',
                element: <Results />
            },
            {
                path: '/test',
                element: <DateInput />
            }
        ]
    }        
])

const root = createRoot(document.getElementById('root'));
root.render(
   <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
   </StrictMode>
);