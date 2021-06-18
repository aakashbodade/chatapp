import React, { useState } from "react";
import { Modal, Button, Alert } from "rsuite";
import { useModalState } from "../../misc/CustomHooks";
import AvatarEditor from "react-avatar-editor";

const fileTypes = ".png, .jpg, .jpeg";
const acceptedFileTypes = ["image/png", "image/jpeg", "image/pjpeg"];
const isValidFile = (file) => acceptedFileTypes.includes(file.type);

const Avatar = () => {
  const { isOpen, open, close } = useModalState(null);

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

  return (
    <div className="mt-3 text-center">
      <div>
        <label
          htmlFor="avatar-upload"
          className="d-block cursor-pointer padded"
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
            <Button block appearance="ghost">
              Upload New Avatar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Avatar;
