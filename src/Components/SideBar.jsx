import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
  CDBSidebarFooter,
} from "cdbreact";
import "../css/SideBar.css";
import { Link, useNavigate } from "react-router-dom";

const SideBar = () => {
  return (
    <CDBSidebar textColor="#333" backgroundColor="#f0f0f0">
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
        Task-Flow
      </CDBSidebarHeader>
      <CDBSidebarContent>
        <CDBSidebarMenu>
          <CDBSidebarMenuItem icon="th-large"> Dashboard</CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="sticky-note"> Tasks</CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="chart-line"> Habits</CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="folder">
            Projects Manager
          </CDBSidebarMenuItem>
        </CDBSidebarMenu>
      </CDBSidebarContent>

      <CDBSidebarFooter>
        <CDBSidebarMenuItem icon="arrow-left">
          <Link
            className="link-dark link-offset-2 link-underline-opacity-0"
            to="/auth/login"
            onClick={() => {
              localStorage.removeItem("token");
            }}
          >
            Logout
          </Link>
        </CDBSidebarMenuItem>
      </CDBSidebarFooter>
    </CDBSidebar>
  );
};

export default SideBar;
