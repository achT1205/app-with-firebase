import React, { Component } from 'react'
import { MDBDropdownMenu, MDBCol, FormInline, Input, Badge, Card, CardBody, Fa, MDBDropdown, MDBDropdownToggle, MDBRow, MDBInput } from 'mdbreact';

import CategorySelect from './common/categorySelect'
import categoryArray from '../pages/edit/categories';
import Filter from './Filter'
class Search extends Component {
    state = {
        isCar: false,
        minimumAmount: '',
        maximumAmount: '',
        categories: ["0"],
        marks: [],
        models: [],
        yearsOfModels: [],
        fuels: [],
        gearBoxes: [],
        offer: false,
        demande: false,
        yearOfModels: [],
        typeOfFuels: [],
        yearOfModels: [],
        typeOfGearBox: [],
        cylinder: '',
        mileage: ''
    };

    onClickOfferType = () => {
        let val = this.state.offer;
        this.setState({ offer: !val });
    }
    onClickDemandeType = () => {
        let val = this.state.demande;
        this.setState({ demande: !val });
    }

    handelCategorySelectChange = (values) => {
        if (values && values.length > 0 && this.state.categories !== values)
            this.setState((prevState) => {
                let categories = [];
                values.forEach((value) => {
                    let id = this.getCategoryId(value);
                    categories.push(id);
                });
                return { categories: categories }
            });
    }

    handelYearsSelectChange = (values) => {
        let yearsOfModels = [];
        if (values && values.length > 0) {
            values.forEach((value) => {
                yearsOfModels.push(value);
            });
            this.setState({ yearsOfModels: yearsOfModels });
        }
    }

    handelFuelsSelectChange = (values) => {
        let fuels = [];
        if (values && values.length > 0) {
            values.forEach((value) => {
                fuels.push(value);
            });
            this.setState({ fuels: fuels });
        }
    }

    handelGearBoxSelectChange = (values) => {
        let gearBoxes = [];
        if (values && values.length > 0) {
            values.forEach((value) => {
                gearBoxes.push(value);
            });
            this.setState({ gearBoxes: gearBoxes });
        }
    }

    getCategoryId(value) {
        let categories = categoryArray.filter(category => category.label === value);
        return categories[0].id ? parseInt(categories[0].id) : 0;
    }

    handleInputChange = (event) => {
        const field = event.target.name;
        if (event.target.value) {
            let state = this.state;
            state[field] = event.target.value;
            this.setState({ state: Object.assign({}, state) });
        }
    }

    handelMarksSelectChange = (values) => {
        let marks = [];
        if (values && values.length > 0) {
            values.forEach((value) => {
                marks.push(value);
            });
        }
        this.setState({ marks: marks });
        this.setState({ models: [] });
    }

    handelModelsSelectChange = (values) => {
        let models = [];
        if (values && values.length > 0) {
            values.forEach((value) => {
                models.push(value);
            });
            this.setState({ models: models });
        }
    }


    render() {
        return (
            <div style={{ marginTop: 20 }}>
                <Card>
                    <CardBody>
                        <FormInline className="md-form">
                            <Fa className="search" icon="search" />
                            <input className="form-control form-control-sm ml-3 w-100" type="text" placeholder="Search" aria-label="Search" />
                        </FormInline>
                        <FormInline>
                            <MDBDropdown>
                                <MDBCol md="2">
                                    <MDBDropdownToggle color="primary">
                                        Type
                            </MDBDropdownToggle>
                                </MDBCol>
                                <MDBDropdownMenu basic>
                                    <div style={{ width: 500, height: 200 }}>
                                        <MDBCol md="10">
                                            <FormInline>
                                                <Input
                                                    label="Offer"
                                                    checked
                                                    type="checkbox"
                                                    id="checkbox2"
                                                    onClick={() => this.onClickOfferType()}
                                                    checked={this.state.offer} />

                                                <Input
                                                    label="Demande"
                                                    checked
                                                    type="checkbox"
                                                    id="checkbox3"
                                                    onClick={() => this.onClickDemandeType()}
                                                    checked={this.state.demande} />
                                            </FormInline>
                                        </MDBCol>
                                    </div>
                                    <Badge className="float-left" tag="a" href="#!" color="secondary">Clean</Badge>
                                    <Badge className="float-right" tag="a" href="#!" color="primary">Apply</Badge>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                            <MDBDropdown>
                                <MDBCol md="2">
                                    <MDBDropdownToggle color="primary">
                                        Category
                                    </MDBDropdownToggle>
                                </MDBCol>
                                <MDBDropdownMenu basic>
                                    <div style={{ width: 500, height: 100 }}>
                                        <MDBCol md="10">
                                            <CategorySelect
                                                multiple={true}
                                                search={true}
                                                hideLabe={true}
                                                handelCategorySelectChange={this.handelCategorySelectChange}
                                                selectedValues={this.state.categories}
                                                label={"Select a categpory"}
                                                selectedDefault={"Select a categpory"}
                                            />
                                        </MDBCol>
                                    </div>
                                    <Badge className="float-left" tag="a" href="#!" color="secondary">Clean</Badge>
                                    <Badge className="float-right" tag="a" href="#!" color="primary">Apply</Badge>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                            <MDBDropdown>
                                <MDBCol md="2">
                                    <MDBDropdownToggle color="primary">
                                        Amount
                                    </MDBDropdownToggle>
                                </MDBCol>
                                <MDBDropdownMenu basic>
                                    <div style={{ width: 500, height: 100 }}>
                                        <MDBRow>
                                            <MDBCol>
                                                <MDBInput
                                                    label={'Min'}
                                                    name="minimumAmount"
                                                    value={this.state.minimumAmount}
                                                    onChange={this.handleInputChange}
                                                />
                                            </MDBCol>
                                            <MDBCol>
                                                <MDBInput
                                                    label={'Max'}
                                                    name="maximumAmount"
                                                    value={this.state.maximumAmount}
                                                    onChange={this.handleInputChange}
                                                />
                                            </MDBCol>
                                        </MDBRow>
                                    </div>
                                    <Badge className="float-left" tag="a" href="#!" color="secondary">Clean</Badge>
                                    <Badge className="float-right" tag="a" href="#!" color="primary">Apply</Badge>
                                </MDBDropdownMenu>
                            </MDBDropdown>

                            <MDBDropdown>
                                <MDBCol md="2">
                                    <MDBDropdownToggle color="primary">
                                        More
                                    </MDBDropdownToggle>
                                </MDBCol>
                                <MDBDropdownMenu basic>
                                    <div style={{ width: 700, height: 350 }}>
                                        <Filter
                                            marks={this.state.marks}
                                            categories={this.state.categories}
                                            models={this.state.models}
                                            handelModelsSelectChange={this.handelModelsSelectChange}
                                            handelMarksSelectChange={this.handelMarksSelectChange}
                                            handleInputChange={this.handleInputChange}
                                            handelYearsSelectChange={this.handelYearsSelectChange}
                                            handelGearBoxSelectChange={this.handelGearBoxSelectChange}
                                            handelFuelsSelectChange={this.handelFuelsSelectChange}
                                            yearOfModels={this.state.yearOfModels}
                                            typeOfFuels={this.state.typeOfFuels}
                                            typeOfGearBox={this.state.typeOfGearBox}
                                            cylinder={this.state.cylinder}
                                            mileage={this.state.mileage}
                                        />
                                    </div>
                                    <Badge className="float-left" tag="a" href="#!" color="secondary">Clean</Badge>
                                    <Badge className="float-right" tag="a" href="#!" color="primary">Apply</Badge>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </FormInline>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default Search