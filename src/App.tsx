import React from "react";
import AppRouter from "./routes/Router";
import { AppProvider } from "./lib/hoc/AppContext";
import Header from "./components/Header";
import './App.css'

const App: React.FC = () => {
  return (
    <AppProvider>
      <Header />
      <div className="min-h-[85vh]">
        <AppRouter />
      </div>
    </AppProvider>
  );
};

export default App;
