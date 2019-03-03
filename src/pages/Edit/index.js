import React from "react";
import { MDBContainer, toast, ToastContainer } from "mdbreact";
import Form from '../../components/Form';
import EndCreateUpdate from '../../components/modals/EndCreateUpdate';
import categoryArray from './categories';


// Firebase
import base, { storage } from '../../base';
import firebase from 'firebase/app'
import 'firebase/auth'

class EditPage extends React.Component {
  state = {
    modal: false,
    saving: false,
    user: null,
    users: {},
    images: [],
    announcement: {
      id: null,
      mainPicture: "",
      images: [],
      description: "",
      shortDescription: "",
      createAt: "",
      lastModifDate: "",
      viewCount: 0,
      likeCount: 0,
      currency: "",
      title: "",
      category: 0,
      type: 0,
      amount: "",
      status: 1,
      ownerId: "",
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
        typeOfProfile: 0,
        id: "",
        profileUrl: 'http://placehold.it/50x50',
        name: "",
        gender: 0,
        company: "",
        email: "",
        phone: "",
        address: "",
        hidePhone: true,
        toBeContacted: false,
        toBeContactedForMarketing: false,
        isConneted: false,
        likeCount: 0
      },
      location: {
        city: "",
        country: "",
        zipCode: "",
        numberOfStreet: "",
        placeKnownAs: "",
        streetName: ""
      }
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        base.fetch(`users/${user.uid}`, {
          context: this,
          then(user) {
            if (user) {
              this.formateUser(user);
            }
          }
        });
      }
    });
    this.setState({ toggle: false })
  }

  formateUser = async user => {
    let announcement = this.state.announcement;
    announcement.owner.id = user.id;
    announcement.owner.profileUrl = user.photoURL ? user.photoURL : "";
    announcement.owner.phone = user.phone ? user.phone : "";
    announcement.owner.name = user.displayName ? user.displayName : "";
    announcement.owner.email = user.email;
    this.setState({ announcement });
  }

  componentDidUpdate() {
    if (this.props.match.params.id && !this.state.announcement.id) {
      base.fetch(`announcements/${this.props.match.params.id}`, {
        context: this,
        then(data) {
          if (Object.keys(data).length !== 0 && data.constructor === Object) {
            this.setState({ announcement: data });
          }
        }
      });
    }
  }

  AnnouncementFromISValid() {
    let formIsValid = true;
    let errors = {};

    if (!this.state.announcement.title || this.state.announcement.title.length < 5) {
      errors.title = "Title must be at least 5 characters.";
      formIsValid = false;
    }
    this.setState({ errors: errors });
    return formIsValid;
  }

  handleOnSubmitForm = (event) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        event.persist();
        if (!this.AnnouncementFromISValid()) {
          toast.error("You must fell all teh required fields :(", {
            position: "top-right",
            autoClose: 5000,
            closeButton: true,
          });
          return;
        }
        this.setState({ saving: true });
        this.addAnnouncement(user);
      }
      else {
        toast.error("You must connect to continue :(", {
          position: "top-right",
          autoClose: 5000,
          closeButton: true,
        });
      }
    })

  }

  addAnnouncement = (user) => {
    let announcement = this.state.announcement;
    let id = this.props.match.params.id ? this.props.match.params.id : Date.now() / 1000 | 0;
    announcement.id = id;
    announcement.ownerId = user.uid;
    if (this.props.match.params.id) {
      announcement.lastModifDate = Date.now() / 1000 | 0;
    } else {
      announcement.createAt = Date.now() / 1000 | 0;
    }
    this.uploadImages(announcement);
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

  fileInputHandler = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      let { images } = this.state;
      for (let i = 0; i < event.target.files.length; i++) {
        let file = event.target.files[i];
        let image = {
          id: Date.now() / 1000 | 0,
          file: file
        };
        images.push(image);
      }
      this.setState({ images });
    }
  }

  handleRemove = (id) => {
    const images = this.state.images;
    for (let i = 0; i < images.length; i++) {
      if (images[i].id === id) {
        images.splice(i, 1);
      }
    }
    this.setState({ images: images })
  }
  handleRemovePicture = (image) => {
    let { announcement } = this.state;
    for (let i = 0; i < announcement.images.length; i++) {
      if (announcement.images[i].id === image.id) {
        var desertRef = storage.ref('images/').child(`${image.id + image.name}`);
        desertRef.delete().then(() => {
          announcement.images[i] = null;
          this.setState({ announcement })
        }).catch((error) => {
          console.log(error)
        });
      }
    }
  }

  uploadImageAsPromise(image, announcement, lastId) {
    let that = this;
    return new Promise(function (resolve, reject) {
      let fullName = image.id + image.file.name;
      let task = storage.ref(`images/${fullName}`).put(image.file);
      //Update progress bar
      task.on('state_changed',
        function progress(snapshot) {
          var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
          //uploader.value = percentage;
        },
        (err) => {
          console.error(err);
        },
        () => {
          let encoded = encodeURI(fullName);
          task.snapshot.ref.getDownloadURL().then((downloadURL) => {
            let picture = {
              id: image.id,
              name: image.file.name,
              url: downloadURL,
              thumb: downloadURL.replace(encoded, "thumb_" + encoded)
            }
            announcement.images.push(picture);
            base.update(`/announcements/${announcement.id}`, {
              data: announcement
            })
          });
          if (image.id === lastId)
          that.setState({ saving: false, modal: true })
        }
      );
    })
  };

  uploadImages = (announcement) => {
    base.post(`/announcements/${announcement.id}`, {
      data: announcement
    })
    const { images } = this.state;
    if (images && images.length > 0) {
      Promise.all(images.map(image => this.uploadImageAsPromise(image, announcement, images[images.length - 1].id)))
        .then(() => {
          this.setState({ saving: false, modal: true })
        })
        .catch((error) => {
          console.log(`Some failed: `, error.message)
        });
    }
    else {
      this.setState({ saving: false, modal: true });
    }
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

  handleOwnerInputChange = (event) => {
    const field = event.target.name;
    let announcement = this.state.announcement;
    announcement.owner[field] = event.target.value;
    this.setState({ announcement: Object.assign({}, announcement) });
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
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
            handleOwnerInputChange={this.handleOwnerInputChange}
            handleOnSubmitForm={this.handleOnSubmitForm}
            saving={this.state.saving}
            fileInputHandler={this.fileInputHandler}
            handleRemove={this.handleRemove}
            handleRemovePicture={this.handleRemovePicture}
            images={this.state.images}
          />
          {this.state.announcement && this.state.announcement.id &&
            <EndCreateUpdate
              modal={this.state.modal}
              toggle={this.toggle}
              isUpdating={this.props.match.params.id ? true : false}
            />
          }
          <ToastContainer
            position="top-right"
            autoClose={5000}
            closeButton={false}
            newestOnTop={false}
            rtl={false}>
          </ToastContainer>
        </form>
      </MDBContainer>
    );
  }
}
export default EditPage;