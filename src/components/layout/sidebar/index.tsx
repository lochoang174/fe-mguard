import SidebarBody from "./SidebarBody";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";

const Sidebar = () => {
  return (
    <div className="w-18 px-1.5 py-4 border-r-2 border-[#fbdbec]">
      <div className="mx-auto flex h-full flex-col items-center justify-between">
        <SidebarHeader />
        <SidebarBody />
        <SidebarFooter />
      </div>
    </div>
  );
};

export default Sidebar;
