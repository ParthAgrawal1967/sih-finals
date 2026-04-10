import { Navigate } from "react-router-dom";

import React, { useEffect, useState } from "react";

import { supabase } from "../../lib/supabaseClient";

export default function ProtectedRoute({ children }) {

const [session, setSession] = useState(undefined); // undefined = loading

useEffect(() => {

// Check session on load

supabase.auth.getSession().then(({ data }) => {

setSession(data.session);

});

// Listen to login/logout events

const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {

setSession(session);

});

// Cleanup listener

return () => listener.subscription.unsubscribe();

}, []);

// While checking session

if (session === undefined) return <div>Loading authentication...</div>;

// If NOT logged in → redirect to login

if (!session) return <Navigate to="/login" replace />;

// If logged in → allow component to render

return children;

}