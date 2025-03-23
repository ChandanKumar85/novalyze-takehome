import React from "react";
import { ToastType } from "../../lib/types/interfaces";
import SVGIcon from "../../lib/utils/SVGIcon";

const Toast: React.FC<ToastType> = ({ message, isVisible }: ToastType) => {
  return (
    <>
      {isVisible ? (
        <div
          id="toast-success"
          className="flex items-center max-w-xs absolute mt-2 right-5 p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-sm min-w-[300px]"
          role="alert"
        >
          <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <SVGIcon name="success_icon" size={16} />
            <span className="sr-only">Check icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">{message}</div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Toast;
