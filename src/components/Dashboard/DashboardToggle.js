import React, { useCallback } from "react";
import { Alert, Button, Drawer, Icon } from "rsuite";
import Dashboard from ".";
import { useModalState } from "../../misc/CustomHooks";
import { auth } from "../../misc/firebase";

const DashboardToggle = () => {
  const { isOpen, close, open } = useModalState();

  const onSignOut = useCallback(() => {
    auth.signOut();
    Alert.info("Signout", 5000);
    close();
  }, []);

  return (
    <div>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" />
        Dashboard
      </Button>
      <Drawer show={isOpen} onHide={close} placement="left">
        <Dashboard onSignOut={onSignOut} />
      </Drawer>
    </div>
  );
};

export default DashboardToggle;
