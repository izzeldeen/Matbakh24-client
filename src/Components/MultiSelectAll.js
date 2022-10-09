import { textAlign } from "@mui/system";
import React, { useState, useEffect } from "react";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
const MultiSelectAll = ({handleChange,data}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    setSelectedOptions([{ label: " الكل", value: "*" }, ...data]);
  }, []);



  function getDropdownButtonLabel({ placeholderButtonLabel, value }) {
    if (value && value.some((o) => o.value === "*")) {
      return `${placeholderButtonLabel}: الكل`;
    } else {
      return `${placeholderButtonLabel}: ${value.length} عنصر`;
    }
  }

  
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
      borderBottom: '1px dotted orange',
      color: state.selectProps.menuColor,
    }),
    dropdownButton: (provided) => ({
     ...provided,
      textAlign:'right'
    }),

    control: (_, { selectProps: { width }}) => ({
      width: width,
      textAlign: 'right',
      color: 'orange'
    }),
  
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition };
    }
  }

  const buttonStyle = {
    menu: (provided, state) => ({
      textAlign:'right',
      color:'orange'
    })
   
  }

  
    // const App = () => (
    //   <Select
    //     styles={customStyles}
    //     width='200px'
    //     menuColor='red'
    //     options={[{ label: "الكل", value: "*" }, ...data]}
    //   />
    // );

  function onChange(value, event) {
    if (event.action === "select-option" && event.option.value === "*") {
      this.setState(this.options);
      handleChange(this.options)
    } else if (
      event.action === "deselect-option" &&
      event.option.value === "*"
    ) {
      this.setState([]);
      handleChange([])

    } else if (event.action === "deselect-option") {
        handleChange(value.filter((o) => o.value !== "*"))

      this.setState(value.filter((o) => o.value !== "*"));

    } else if (value.length === this.options.length - 1) {
      this.setState(this.options);
      handleChange(this.options)

    } else {
      this.setState(value);
      handleChange(value)

    }
    
  }

  return (
   
        <ReactMultiSelectCheckboxes
       
      options={[{ label: "الكل", value: "*" }, ...data]}
      placeholderButtonLabel="اختر"
      rightAligned = {'true'}
      styles = {customStyles}
      placeholder={"بحث"}
      getDropdownButtonLabel={getDropdownButtonLabel}
      value={selectedOptions}
      width = "250px"
      onChange={onChange}
      setState={setSelectedOptions}
    />
  );
};

export default MultiSelectAll;
