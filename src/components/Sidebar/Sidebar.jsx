import { bottomItems, topItems } from "../../configs/sidebarConfig";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <nav className="sidebar-nav">
      <div className="sidebar-top-items">
        <ul className="sidebar-icon-list">
          {topItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.url}
                className={`sidebar-link ${
                  item.id === "dashboard" ? "active" : ""
                }`}
                title={item.label}
              >
                {item.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
