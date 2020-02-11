import React from 'react';
import {
  arrayOf,
  any,
  string,
  func
} from 'prop-types';

function Dropdown({
  data,
  selectedValue,
  valueKey = 'value',
  nameKey = 'name',
  selectItemValue
}) {
  function handleSelectedValueChange(event) {
    const value = event.target.value;

    selectItemValue(value);
  }

  return (
    <select value={ selectedValue } onChange={ handleSelectedValueChange }>
      {
        data.map(item => <option key={ item[valueKey] } value={ item[valueKey] }>{ item[nameKey] }</option>)
      }
    </select>
  );
}

Dropdown.propTypes = {
  data: arrayOf(any),
  selectedValue: any,
  valueKey: string,
  nameKey: string,
  selectItemValue: func
};

export default Dropdown;