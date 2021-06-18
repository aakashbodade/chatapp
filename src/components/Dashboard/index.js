import React from "react";
import { Alert, Button, Divider, Drawer } from "rsuite";
import { useProfile } from "../../context/Profile.Context";
import { database } from "../../misc/firebase";
import EditableInput from "../EditableInput";
import ProviderBlock from "./ProviderBlock";

const Dashboard = ({ onSignOut }) => {
  const { profile } = useProfile();

  const onSave = async (newData) => {
    const userNicknameRef = database
      .ref(`/profiles/${profile.uid}`)
      .child("name");

    try {
      await userNicknameRef.set(newData);
      Alert.success("Nickname has been updated", 4000);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };

  return (
    <>
      <Drawer.Header>
        <Drawer.Title className="text-center ">
          <h5>Dashboard</h5>
        </Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <h4>Hey, {profile.name}</h4>
        <ProviderBlock></ProviderBlock>
        <Divider />
        <EditableInput
          name="nickname"
          initialValue={profile.name}
          onSave={onSave}
          label={<h6 className="mb-2">Nickname</h6>}
        />
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
