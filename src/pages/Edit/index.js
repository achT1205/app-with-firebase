import React from "react";
import { MDBBtn, Card, CardBody, MDBContainer } from "mdbreact";
import Form from '../../components/Form'
import categoryArray from './categories';

class EditPage extends React.Component {
  state = {
    announcement: {
      title: "",
      category: 0,
      criteria: {
        mark: null,
        model: null,
        yearOfModel: null,
        cylinder: null,
        typeOfFuel: null,
        typeOfGearBox: null,
        mileage: null,
        immovableType: null,
        isEquiped: null,
        numberOfRooms: null,
        ges: null,
        sizeOfSurface: null,
        numberOfPeople: null,
        numberOfVacationRooms: null
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
    debugger;
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
      <Card wide>
        <CardBody cascade>
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
              />
              <MDBBtn color="success" type="submit">
                Submit Form
              </MDBBtn>
            </form>
          </MDBContainer>
        </CardBody>
      </Card>
    );
  }
}

export default EditPage;