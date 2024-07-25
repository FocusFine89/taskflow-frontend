import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
  CDBSidebarFooter,
} from "cdbreact";
import "../css/SideBar.css";

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

      <CDBSidebarFooter style={{ textAlign: "center" }}>
        <div className="sidebar-btn-wrapper" style={{ padding: "20px 5px" }}>
          Sidebar Footer
        </div>
      </CDBSidebarFooter>
    </CDBSidebar>
  );
};

export default SideBar;
