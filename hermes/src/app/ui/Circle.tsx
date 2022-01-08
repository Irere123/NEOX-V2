import React from "react";

const Circle: React.FC = ({ children }) => {
  return (
    <div className="hover:cursor-pointer bg-primary-600 h-6 w-6 flex justify-center items-center rounded-full">
      {children}
    </div>
  );
};

export default Circle;
