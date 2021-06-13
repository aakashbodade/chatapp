import React from "react";
import { Button, Drawer } from "rsuite";
import { useProfile } from "../../context/Profile.Context";

const Dashboard = ({ onSignOut }) => {
  const { profile } = useProfile();
  return (
    <>
      <Drawer.Header>
        <Drawer.Title className="text-center ">
          <h5>Dashboard</h5>
        </Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <h4>Hey, {profile.name}</h4>
      </Drawer.Body>
      <Drawer.Footer>
        <Button block color="red" onClick={onSignOut}>
          SignOut
        </Button>
      </Drawer.Footer>
    </>
  );
};

export default Dashboard;
