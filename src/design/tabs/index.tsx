import React, { useState } from "react";
import styles from "./index.module.css";

type TabsProps = {
  tabsContent: {
    title: string;
    content: React.ReactNode;
  }[];
};

const Tabs: React.FC<TabsProps> = ({ tabsContent }) => {
  const [activeTab, setActiveTab] = useState(tabsContent[0].title);

  const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setActiveTab(e.currentTarget.innerText);
  };

  const filterContentByTitle = (): React.ReactNode => {
    return tabsContent.find((tab) => tab.title === activeTab)?.content;
  };

  return (
    <div className={styles.tabs}>
      <div className={styles.tabs_header}>
        {tabsContent.map((tab) => (
          <button
            key={tab.title}
            className={`${styles.tabs_header_button} ${
              activeTab === tab.title ? styles.active : ""
            }`}
            onClick={handleTabClick}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className={styles.tabs_content}>{filterContentByTitle()}</div>
    </div>
  );
};

export default Tabs;
