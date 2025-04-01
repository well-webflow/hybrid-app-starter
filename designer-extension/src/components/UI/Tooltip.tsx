import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

interface TooltipProps {
  content: string;
  defaultValue: string;
}

function Tooltip({ content, defaultValue }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative flex items-center z-0"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <FontAwesomeIcon
        icon={faQuestionCircle}
        className="text-gray-500 cursor-pointer"
      />
      {visible && (
        <div className="absolute left-5 top-1/2 transform -translate-y-1/2 ml-2 z-10 bg-gray-900 text-white text-sm py-2 px-2 rounded shadow-lg whitespace-normal max-w-xs w-max transition-opacity duration-200 ease-in-out opacity-100">
          {/* Triangle */}
          <div className="absolute left-[-6px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-r-4 border-b-4 border-transparent border-r-gray-900" />
          {content}
          <div className="w-full h-2 border-t-2 border-border1 my-2"></div>
          <div>Default: {defaultValue}</div>
        </div>
      )}
    </div>
  );
}

export default Tooltip;
