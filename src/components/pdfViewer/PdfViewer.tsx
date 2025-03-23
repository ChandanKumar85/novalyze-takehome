import React from "react";
import { PdfData } from "../../lib/types/interfaces";

const PdfViewer: React.FC<PdfData> = (props: PdfData) => {
  const { url, title } = props;
  return (
    <div className="flex-1 p-6 pb-2">
      <div className="h-full rounded-lg overflow-hidden shadow-lg">
        <iframe loading="lazy" src={url} className="w-full h-full" title={title} />
      </div>
    </div>
  );
};

export default PdfViewer;
