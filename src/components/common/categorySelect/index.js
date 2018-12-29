import React, { Component } from "react";
import {
  MDBSelect
} from "mdbreact";
import { withNamespaces } from 'react-i18next';
import getCategoryOptions from './categoryOptions'; 

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

  componentWillReceiveProps(nextProps){
    const { t, selectedValues, lng, i18n } = nextProps;
    if( selectedValues !== this.props.selectedValues){
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
    const { handelCategorySelectChange, multiple, search, hideLabe, label , selectedDefault} = this.props;
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
