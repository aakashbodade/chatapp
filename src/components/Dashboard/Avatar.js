import React, { useState, useRef } from "react";
import { Modal, Button, Alert } from "rsuite";
import { useModalState } from "../../misc/CustomHooks";
import AvatarEditor from "react-avatar-editor";
import { useProfile } from "../../context/Profile.Context";
import { database, storage } from "../../misc/firebase";
import ProfileAvatar from "./ProfileAvatar";

const fileTypes = ".png, .jpg, .jpeg";
const acceptedFileTypes = ["image/png", "image/jpeg", "image/pjpeg"];
const isValidFile = (file) => acceptedFileTypes.includes(file.type);

const getBlob = (canvas) => {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("File Process Error"));
      }
    });
  });
};

const Avatar = () => {
  const { isOpen, open, close } = useModalState(null);

  const [isLoading, setIsLoading] = useState(false);

  const { profile } = useProfile();

  const avatarEditorRef = useRef();

  const [img, setImage] = useState();

  const onFileInputChange = (ev) => {
    const currFiles = ev.target.files;
    if (currFiles.length === 1) {
      const file = currFiles[0];

      if (isValidFile(file)) {
        setImage(file);
        open();
      } else {
        Alert.warning(`Wrong File Type Selected ${file.type}`);
      }
    }
  };

  const onUploadClick = async () => {
    const canvas = avatarEditorRef.current.getImageScaledToCanvas();
    setIsLoading(true);
    try {
      const blob = await getBlob(canvas);

      const avatarFileRef = storage
        .ref(`/profile/${profile.uid}`)
        .child("avatar");

      const uploadAvatarResult = await avatarFileRef.put(blob, {
        cacheControl: `public, max-age=${3600 * 24 * 4}`,
      });

      const downloadUrl = await uploadAvatarResult.ref.getDownloadURL();

      const userAvatarRef = database
        .ref(`/profiles/${profile.uid}`)
        .child("avatar");

      userAvatarRef.set(downloadUrl);

      setIsLoading(false);

      Alert.info("Avatar Has Been Uploaded", 4000);
    } catch (error) {
      setIsLoading(false);
      Alert.error(error.message, 4000);
    }
  };

  return (
    <div className="mt-3 text-center">
      <ProfileAvatar
        src={profile.avatar}
        name={profile.name}
        className="width-200 height-200"
      />
      <div>
        <label
          className="d-block cursor-pointer padded"
          htmlFor="avatar-upload"
        >
          Select New Avatar
          <input
            id="avatar-upload"
            type="file"
            className="d-none"
            accept={fileTypes}
            onChange={onFileInputChange}
          />
        </label>
        <Modal show={isOpen} onHide={close}>
          <Modal.Header>
            <Modal.Title>Adjust And Upload</Modal.Title>
          </Modal.Header>
          <div className="d-flex justify-content-center align-items-center h-100">
            <Modal.Body>
              {img && (
                <AvatarEditor
                  ref={avatarEditorRef}
                  image={img}
                  width={200}
                  height={200}
                  border={10}
                  borderRadius={100}
                  rotate={0}
                />
              )}
            </Modal.Body>
          </div>
          <Modal.Footer>
            <Button
              block
              appearance="ghost"
              disabled={isLoading}
              onClick={onUploadClick}
            >
              Upload New Avatar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Avatar;
