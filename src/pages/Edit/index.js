import React from "react";
import { MDBBtn, MDBContainer } from "mdbreact";
import Form from '../../components/Form'
import categoryArray from './categories';

class EditPage extends React.Component {
  state = {
    announcement: {
      title: "",
      category: 0,
      type: 0,
      amount: "",
      status: 1,
      criteria: {
        mark: null,
        model: null,
        yearOfModel: null,
        cylinder: "",
        typeOfFuel: null,
        typeOfGearBox: null,
        mileage: "",
        immovableType: null,
        isEquiped: null,
        numberOfRooms: "",
        ges: null,
        sizeOfSurface: "",
        numberOfPeople: "",
        numberOfVacationRooms: "",
        hasSwimingPool: null
      },
      owner: {
        typeOfProfile: 0
      },
      location: {

      }
    }
  }

  handleInputChange = (event) => {
    const field = event.target.name;
    let announcement = this.state.announcement;
    if (field === "title" && event.target.value.length > 15) {
      announcement[field] = event.target.value.substring(0, 15);
    }
    announcement[field] = event.target.value;
    this.setState({ announcement: Object.assign({}, announcement) });
  }

  handelCategorySelectChange = (value) => {
    let id = 0;
    let announcement = this.state.announcement;
    if (value.length === 1)
      id = this.getCategoryId(value[0]);
    if (value.length === 1 && announcement.category !== id) {
      announcement.category = id;
      this.setState({ announcement: announcement });
    }
  }

  handelMarksSelectChange = (value) => {
    let announcement = this.state.announcement;
    if (value[0] && value[0].length) {
      announcement.criteria.mark = value[0];
      this.setState({ announcement: Object.assign({}, announcement) });
    }
  }

  handelYearsSelectChange = (value) => {
    let announcement = this.state.announcement;
    if (value[0] && value[0].length > 0 && announcement.criteria.yearOfModel !== parseInt(value[0])) {
      announcement.criteria.yearOfModel = parseInt(value[0]);
      this.setState({ announcement: Object.assign({}, announcement) });
    }
  }

  handelModelsSelectChange = (value) => {
    let announcement = this.state.announcement;
    if (value[0] && value[0].length > 0 && announcement.criteria.model !== value[0]) {
      announcement.criteria.model = value[0];
      this.setState({ announcement: Object.assign({}, announcement) });
    }
  }

  handleCriteriaInputChange = (event) => {
    const field = event.target.name;
    let announcement = this.state.announcement;
    announcement.criteria[field] = event.target.value;
    this.setState({ announcement: Object.assign({}, announcement) });
    console.log(this.state.announcement);
  }

  handelFuelsSelectChange = (value) => {
    let announcement = this.state.announcement;
    if (value[0] && value[0].length > 0 && announcement.criteria.typeOfFuel !== this.getFuelId(value[0])) {
      announcement.criteria.typeOfFuel = this.getFuelId(value[0]);
      this.setState({ announcement: Object.assign({}, announcement) });
    }
  }

  handelGearBoxSelectChange = (value) => {
    let announcement = this.state.announcement;
    if (value[0] && value[0].length > 0 && announcement.criteria.typeOfGearBox !== this.getGearBoxId(value[0])) {
      announcement.criteria.typeOfGearBox = this.getGearBoxId(value[0]);
      this.setState({ announcement: Object.assign({}, announcement) });
    }
  }

  handelImmovableTypesSelectChange = (value) => {
    let announcement = this.state.announcement;
    if (value[0] && value[0].length > 0 && announcement.criteria.immovableType !== this.getImmovableTypeId(value[0])) {
      announcement.criteria.immovableType = this.getImmovableTypeId(value[0]);
      this.setState({ announcement: Object.assign({}, announcement) });
    }
  }

  handelIsEquipedSelectChange = (value) => {
    let announcement = this.state.announcement;
    if (value[0] && value[0].length > 0 && announcement.criteria.isEquiped !== this.isEquiped(value[0])) {
      announcement.criteria.isEquiped = this.isEquiped(value[0]);
      this.setState({ announcement: Object.assign({}, announcement) });
    }
  }

  handelNumberOfRoomsSelectChange = (value) => {
    let announcement = this.state.announcement;
    if (announcement.criteria.numberOfRooms !== parseInt(value[0])) {
      announcement.criteria.numberOfRooms = parseInt(value[0]);
      this.setState({ announcement: Object.assign({}, announcement) });
    }
  }
  handelEnergyClassificationSelectChange = (value) => {
    let announcement = this.state.announcement;
    if (announcement.criteria.energyClassification !== this.getEnergyClassificationId(value[0])) {
      announcement.criteria.energyClassification = this.getEnergyClassificationId(value[0]);
      this.setState({ announcement: Object.assign({}, announcement) });
    }
  }

  handelGesSelectChange = (value) => {
    let announcement = this.state.announcement;
    if (announcement.criteria.ges !== this.getGesId(value[0])) {
      announcement.criteria.ges = this.getGesId(value[0]);
      this.setState({ announcement: Object.assign({}, announcement) });
    }
  }

  handelHasSwimingPoolSelectChange = (value) => {
    let announcement = this.state.announcement;
    if (announcement.criteria.hasSwimingPool !== this.swimingPoolOptionId(value[0])) {
      announcement.criteria.hasSwimingPool = this.swimingPoolOptionId(value[0]);
      this.setState({ announcement: Object.assign({}, announcement) });
    }
  }

  handleDescriptionInputChange = (event) => {
    let announcement = this.state.announcement;
    let field = event.target.name;
    announcement[field] = event.target.value;
    announcement.shortDescription = event.target.value.substring(0, 80) + " ..."
    this.setState({ announcement: Object.assign({}, announcement) });
  }

  onClickProfileRadio = (value) => {
    let announcement = this.state.announcement;
    announcement.owner.typeOfProfile = value;
    this.setState({ announcement: Object.assign({}, announcement) });
  }

  onClickTypeRadio = (value) => {
    let announcement = this.state.announcement;
    announcement.type = value;
    this.setState({ announcement: Object.assign({}, announcement) });
  }

  onClickGenderRadio = (nr) => {
    let announcement = this.state.announcement;
    announcement.owner.gender = nr;
    this.setState({ announcement: Object.assign({}, announcement) });
  }
  onClickMarketingCheck = () => {
    let announcement = this.state.announcement;
    announcement.owner.toBeContactedForMarketing = !announcement.owner.toBeContactedForMarketing;
    this.setState({ announcement: Object.assign({}, announcement) });
  }

  onClickHidePhoneCheck = () => {
    let announcement = this.state.announcement;
    announcement.owner.hidePhone = !announcement.owner.hidePhone;
    this.setState({ announcement: Object.assign({}, announcement) });
  }

  handleLocationInputChange = (event) => {
    const field = event.target.name;
    let announcement = this.state.announcement;
    announcement.location[field] = event.target.value;
    this.setState({ announcement: Object.assign({}, announcement) });
  }


  swimingPoolOptionId(label) {
    if (label === "Yes" || label === "Oui") {
      return true;
    };
    if (label === "No" || label === "Non") {
      return false;
    };
  }

  getGesId(word) {
    let list = ["A", "B", "C", "D", "E", "F", "G", "I"];
    return list.findIndex(w => w === word) + 1;
  }

  getEnergyClassificationId(word) {
    let list = ["A", "B", "C", "D", "E", "F", "G", "I"];
    return list.findIndex(w => w === word) + 1;
  }

  isEquiped(label) {
    if (label === "Equiped" || label === "Equipé") {
      return true;
    };
    if (label === "Non Equiped" || label === "Non équipé") {
      return false;
    };
  }

  getCategoryId(value) {
    let categories = categoryArray.filter(category => category.label === value);
    return categories[0].id ? parseInt(categories[0].id) : 0;
  }

  getImmovableTypeId(label) {
    if (label === "House" || label === "Maison") {
      return 1;
    };
    if (label === "Appartment" || label === "Appartement") {
      return 2;
    };
    if (label === "Land" || label === "Terrain") {
      return 3;
    };
    if (label === "Parking") {
      return 4;
    };
    if (label === "Others" || label === "Autre") {
      return 5;
    };
  }

  getGearBoxId(label) {
    if (label === "Manual" || label === "Manuelle") {
      return 1;
    };
    if (label === "Automatique" || label === "Automatic") {
      return 2;
    };
  }

  getFuelId(label) {
    if (label === "Diesel") {
      return 1;
    };
    if (label === "Electric" || label === "Electrique") {
      return 2;
    };
    if (label === "Essence" || label === "Gasoline") {
      return 3;
    };
  }

  render() {
    return (
      <MDBContainer>
        <form>
          <Form
            announcement={this.state.announcement}
            handelYearsSelectChange={this.handelYearsSelectChange}
            handleInputChange={this.handleInputChange}
            handelMarksSelectChange={this.handelMarksSelectChange}
            handelCategorySelectChange={this.handelCategorySelectChange}
            handelModelsSelectChange={this.handelModelsSelectChange}
            handleCriteriaInputChange={this.handleCriteriaInputChange}
            handelFuelsSelectChange={this.handelFuelsSelectChange}
            handelGearBoxSelectChange={this.handelGearBoxSelectChange}
            handelImmovableTypesSelectChange={this.handelImmovableTypesSelectChange}
            handelIsEquipedSelectChange={this.handelIsEquipedSelectChange}
            handelNumberOfRoomsSelectChange={this.handelNumberOfRoomsSelectChange}
            handelEnergyClassificationSelectChange={this.handelEnergyClassificationSelectChange}
            handelGesSelectChange={this.handelGesSelectChange}
            handelHasSwimingPoolSelectChange={this.handelHasSwimingPoolSelectChange}
            handleDescriptionInputChange={this.handleDescriptionInputChange}
            onClickProfileRadio={this.onClickProfileRadio}
            onClickTypeRadio={this.onClickTypeRadio}
            onClickGenderRadio={this.onClickGenderRadio}
            onClickHidePhoneCheck={this.onClickHidePhoneCheck}
            onClickMarketingCheck={this.onClickMarketingCheck}
            handleLocationInputChange={this.handleLocationInputChange}
          />
          <MDBBtn color="success" type="submit">
            Submit Form
          </MDBBtn>
        </form>
      </MDBContainer>
    );
  }
}

export default EditPage;