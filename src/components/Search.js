import React, { Component } from 'react'
import { MDBDropdownMenu, MDBCol, FormInline, Input, Badge, Card, CardBody, Fa, MDBDropdown, MDBDropdownToggle, MDBRow, MDBInput } from 'mdbreact';

import CategorySelect from '../components/common/categorySelect'
import categoryArray from '../pages/edit/categories';
class Search extends Component {
    state = {
        isCar: false,
        categories: ["0"],
        marks: [],
        models: [],
        yearsOfModels: [],
        fuels: [],
        gearBoxes: [],
        offer: false,
        demande: false,
        typeOptions: [
            {
                checked: false,
                disabled: false,
                icon: null,
                value: "Offer"
            },
            {
                checked: false,
                disabled: false,
                icon: null,
                value: "Demande"
            }
        ]
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

    getCategoryId(value) {
        let categories = categoryArray.filter(category => category.label === value);
        return categories[0].id ? parseInt(categories[0].id) : 0;
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
                                                    type="number"
                                                    name="minimumAmount"
                                                />
                                            </MDBCol>
                                            <MDBCol>
                                                <MDBInput
                                                    label={'Max'}
                                                    type="number"
                                                    name="maximumAmount"
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
                                    <div style={{ width: 500, height: 100 }}>
                                        More
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