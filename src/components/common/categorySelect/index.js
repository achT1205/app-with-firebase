import React, { Component } from "react";
import {
  MDBSelect
} from "mdbreact";
import { withNamespaces } from 'react-i18next';
import getCategoryOptions from './categoryOptions';
import './index.css';

class CategorySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    }
  }

  componentDidMount() {
    const { t, selectedValues } = this.props
    let ops = getCategoryOptions(t);
    this.setState({ options: ops })
    this.formatOptions(t, selectedValues)
  }

  componentWillReceiveProps(nextProps) {
    const { t, selectedValues, lng, i18n } = nextProps;
    let isEqual = this.isEqual(selectedValues, this.props.selectedValues);
    if (!isEqual) {
      debugger;
      let ops = getCategoryOptions(t);
      this.setState({ options: ops })
      this.formatOptions(t, selectedValues)
    }
    if (lng !== this.props.lng) {
      i18n.changeLanguage(lng);
      let ops = getCategoryOptions(t);
      this.setState({ options: ops })
      this.formatOptions(t, selectedValues)
    }
  }

  isEqual(array1 , array2){
    if(array1.length !== array2.length){
      return false
    }
    for (let i = 0; i < array1.length ; i++) {
      if (array2[i] !== array1[i]) {
        return false;
      }
    }
    return true;
  } 
  formatOptions(t, selectedValues) {
    this.setState(prevState => {
      let prevOptions = [...prevState.options];
      selectedValues.forEach((val) => {
        prevOptions.forEach((op) => {
          if (op.value === t('common.categories.'.concat(val.toString()))) {
            op.checked = true;
          }
        });
      });
      return { options: prevOptions };
    });
  }

  render() {
    const { handelCategorySelectChange, multiple, search, hideLabe, label, selectedDefault } = this.props;
    return (
      <div>
        <MDBSelect getValue={handelCategorySelectChange}
          color="primary"
          multiple={multiple}
          search={search}
          options={this.state.options}
          selected={selectedDefault}
        />
        {!hideLabe && <label>
          {label}
        </label>
        }
      </div>
    );
  }
}

const CategorySelectWrapped = withNamespaces()(CategorySelect);
export default CategorySelectWrapped
