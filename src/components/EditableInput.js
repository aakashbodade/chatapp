import React, { useCallback, useState } from "react";
import { Alert, Icon, Input, InputGroup } from "rsuite";

const EditableInput = ({
  initialValue,
  onSave,
  label = null,
  placeholder = "Write your name",
  emptyMsg = "Input is empty",
  ...inputProps
}) => {
  const [input, setInput] = useState(initialValue);
  const [isEditiable, setIsEditiable] = useState(false);

  const onInputChange = useCallback((value) => {
    setInput(value);
  }, []);

  const onEditClick = useCallback(() => {
    setIsEditiable((p) => !p);
    setInput(initialValue);
  }, [initialValue]);

  const onSaveClick = async () => {
    const trimmed = input.trim();
    if (trimmed === "") {
      Alert.info(emptyMsg, 4000);
    }

    if (trimmed !== initialValue) {
      await onSave(trimmed);
    }

    setIsEditiable(false);
  };

  return (
    <div>
      {label}
      <InputGroup>
        <Input
          {...inputProps}
          disabled={!isEditiable}
          placeholder={placeholder}
          value={input}
          onChange={onInputChange}
        />
        <InputGroup.Button onClick={onEditClick}>
          <Icon icon={isEditiable ? "close" : "edit2"} />
        </InputGroup.Button>
        {isEditiable && (
          <InputGroup.Button onClick={onSaveClick}>
            <Icon icon="check" />
          </InputGroup.Button>
        )}
      </InputGroup>
    </div>
  );
};

export default EditableInput;
