import React, { useState } from "react";
import {
  Dropdown,
  DropdownPosition,
  DropdownToggle,
  DropdownItem,
} from "@patternfly/react-core";
import { FilterIcon } from "@patternfly/react-icons";

export interface SimpleFilterDropdownProps {
  label: string;
  options: string[];
  onSelect: (value: string) => void;
}

export const SimpleFilterDropdown: React.FC<SimpleFilterDropdownProps> = ({
  label,
  options,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnSelect = () => {
    setIsOpen((current) => !current);
  };

  const handleOnToggle = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  return (
    <Dropdown
      position={DropdownPosition.left}
      isOpen={isOpen}
      onSelect={handleOnSelect}
      toggle={
        <DropdownToggle onToggle={handleOnToggle}>
          <FilterIcon />
          {label}
        </DropdownToggle>
      }
      dropdownItems={options.map((f, index) => (
        <DropdownItem
          key={index}
          component="button"
          onClick={() => onSelect(f)}
        >
          {f}
        </DropdownItem>
      ))}
    />
  );
};
