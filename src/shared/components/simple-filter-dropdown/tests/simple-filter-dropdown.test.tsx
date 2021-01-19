import React from "react";
import { shallow, mount } from "enzyme";
import { SimpleFilterDropdown } from "../simple-filter-dropdown";

describe("SimpleFilterDropdown", () => {
  it("Renders without crashing", () => {
    const wrapper = shallow(
      <SimpleFilterDropdown
        label="My label"
        options={["option1", "option2", "option3"]}
        onSelect={jest.fn()}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("Check onSelect callback", () => {
    const onSelectSpy = jest.fn();

    const wrapper = mount(
      <SimpleFilterDropdown
        label="My label"
        options={["option1", "option2", "option3"]}
        onSelect={onSelectSpy}
      />
    );

    // Open dropdown
    wrapper.find(".pf-c-dropdown__toggle").simulate("click");
    wrapper.update();

    // Select option
    wrapper.find(".pf-c-dropdown__menu-item").at(1).simulate("click");
    expect(onSelectSpy).toHaveBeenCalledWith("option2");
  });
});
