import React from 'react';
import './App.css';
import CreateListing from "./Pages/CreateListing";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider,} from '@tanstack/react-query'
import {Login} from "./Pages/Login";
import {AllListings} from "./Pages/AllListings";

function App() {
    const queryClient = new QueryClient()

  return (
      <QueryClientProvider client={queryClient}>

      <BrowserRouter>
          <Routes>
              <Route path='listings/create' element={<CreateListing/>}/>
              <Route path='listings' element={<AllListings/>}/>
              <Route path='login' element={<Login/>}/>
          </Routes>
      </BrowserRouter>
      </QueryClientProvider>

  );
}

export default App;
