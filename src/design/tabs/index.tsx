import React, { useState } from "react";
import styles from "./index.module.css";

type TabsProps = {
  tabsContent: {
    icon?: React.ReactNode | string;
    title: string;
    content: React.ReactNode;
  }[];
  tabPosition?: "top" | "bottom";
  height?: string;
  stylesTab?: "default" | "bordered-bottom" | "darken";
};

const Tabs: React.FC<TabsProps> = ({ tabsContent, tabPosition = "top", height, stylesTab = "default" }) => {
  const [activeTab, setActiveTab] = useState(tabsContent[0].title);

  const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setActiveTab(e.currentTarget.innerText);
  };

  const filterContentByTitle = (): React.ReactNode => {
    return tabsContent.find((tab) => tab.title === activeTab)?.content;
  };

  const tabsStyles: React.CSSProperties = {
    height: height,
  };

  return (
    <div className={`${styles.tabs} ${styles[stylesTab]}`} style={tabsStyles}>
      {
        tabPosition === "top" && (
          <div className={`${styles.tabs_header} ${styles.top}`}>
            {tabsContent.map((tab, index) => (
              <button
                key={Math.random().toString(36).substring(2, 15) + index}
                className={`${styles.tabs_header_button} ${tab.title === activeTab ? styles.active : ""
                  }`}
                onClick={handleTabClick}
              >
                <div className={styles.tabs_header_button_content}>
                    <i>
                      {tab.icon}
                    </i>
                    {tab.title}
                  </div>
              </button>
            ))}
          </div>
        )
      }
      <div className={styles.tabs_content}>{filterContentByTitle()}</div>

      {
        tabPosition === "bottom" && (
          <div className={`${styles.tabs_header} ${styles.bottom}`}>
            <div className={styles.tabs_header_buttons}>
              {tabsContent.map((tab, index) => (
                <button
                  key={Math.random().toString(36).substring(2, 15) + index}
                  className={`${styles.tabs_header_button} ${tab.title === activeTab ? styles.active : ""
                    }`}
                  onClick={handleTabClick}
                >
                  <div className={styles.tabs_header_button_content}>
                    <i>
                      {tab.icon}
                    </i>
                    {tab.title}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Tabs;
