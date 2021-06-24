import React from "react";
import CreateRoomBtn from "./Dashboard/CreateRoomBtn";
import DashboardToggle from "./Dashboard/DashboardToggle";

const Sidebar = () => {
  return (
    <div className="h-100" pt-2>
      <div>
        <DashboardToggle />
        <CreateRoomBtn />
      </div>
    </div>
  );
};

export default Sidebar;
