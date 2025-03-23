import React from "react";
import Chat from "../components/Chat";
import PdfViewer from "../components/pdfViewer";
import { useTheme } from "../lib/hoc/AppContext";

const Home: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <>
      <div className={`flex flex-col sm:flex-row min-h-[85vh] ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} transition-colors duration-300`}>
        <Chat />
        <PdfViewer
          url={"/src/resources/sample.pdf"}
          title={"Home PDF Viewer"}
        />
      </div>
    </>
  );
};

export default Home;