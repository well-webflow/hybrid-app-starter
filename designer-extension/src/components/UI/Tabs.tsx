import React from 'react';
import { useState } from 'react';

type TabProps = {
  label: string;
  children: React.ReactNode;
};

type TabsProps = {
  children: React.ReactNode;
};

export const Tab = ({ children }: TabProps) => {
  return <div>{children}</div>;
};

export const Tabs = ({ children }: TabsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = React.Children.toArray(
    children
  ) as React.ReactElement<TabProps>[];

  return (
    <div>
      {/* Tab Headers */}
      <div className="tabs-header flex space-x-4 border-b">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`py-2 px-4 ${
              index === activeIndex
                ? 'border-b-2 border-blue-500 font-semibold'
                : 'text-gray-500'
            }`}
          >
            {tab.props.label}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div className="tabs-content mt-4">{tabs[activeIndex]}</div>
    </div>
  );
};
