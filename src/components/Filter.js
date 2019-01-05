import React, { Component, Fragment } from 'react';
import MarksSelect from './common/markSelect';
import ModelSelect from './common/modelSelect';
import ModelYear from './common/modelYearSelect';
import Fuel from './common/fuelSelect';
import GearBox from './common/gearBoxSelect';
import { MDBRow, MDBCol, MDBInput } from 'mdbreact';

class Filter extends Component {

    includes = (array1, array2) => {
        for (let i = 0; i < array1.length; i++) {
            for (let j = 0; j < array2.length; j++) {
                if (array1[i] === array2[j]) {
                    return true;
                }
            }
        }
        return false;
    }

    render() {
        const {
            marks,
            categories,
            models,
            handelModelsSelectChange,
            handelMarksSelectChange,
            handelYearsSelectChange,
            handelGearBoxSelectChange,
            handelFuelsSelectChange,
            handleInputChange,
            typeOfFuels,
            yearOfModels,
            typeOfGearBox,
            cylinder,
            mileage } = this.props;

        return (
            <Fragment>
                <MDBRow>
                    <MDBCol>
                        <MarksSelect
                            categories={categories}
                            handelMarksSelectChange={handelMarksSelectChange}
                            selectedMarks={marks}
                            multiple={true}
                            search={true}
                            hideLabe={true}
                            selectedDefault={'select one mark'}
                            label={'select one mark'}
                        />
                    </MDBCol>
                    <MDBCol>
                        {
                            marks.length > 0 &&
                            <ModelSelect
                                categories={categories}
                                handelModelsSelectChange={handelModelsSelectChange}
                                multiple={true}
                                search={true}
                                hideLabe={true}
                                selectedDefault={'select one model'}
                                label={'select one model'}
                                selectedMarks={marks}
                                selectedModels={models}
                            />
                        }
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    {this.includes([1, 2, 3, 4, 5], categories) &&
                        <MDBCol md="6">
                            <ModelYear
                                handelYearsSelectChange={handelYearsSelectChange}
                                multiple={true}
                                search={true}
                                hideLabe={true}
                                selectedDefault={'Years of models'}
                                label={'Years of models'}
                                selectedYear={yearOfModels}
                                yearLimit={30}
                                currentYear={2019}
                            />
                        </MDBCol>
                    }

                    {this.includes([2, 5], categories) &&
                        <MDBCol md="6">
                            <Fuel
                                handelFuelsSelectChange={handelFuelsSelectChange}
                                multiple={true}
                                search={false}
                                hideLabe={true}
                                selectedDefault={'types of fuel'}
                                label={'types of fuel'}
                                selectedfuels={typeOfFuels}
                            />
                        </MDBCol>
                    }
                    {
                        categories.includes(2) &&
                        <MDBCol md="6">
                            <GearBox
                                handelGearBoxSelectChange={handelGearBoxSelectChange}
                                multiple={true}
                                search={false}
                                hideLabe={true}
                                selectedDefault={'type of gear'}
                                label={'type of gear'}
                                selectedGearBox={typeOfGearBox}
                            />
                        </MDBCol>
                    }
                    {categories.includes(3) &&
                        <MDBCol md="6">
                            <MDBInput
                                label={'cylinder'}
                                name="cylinder"
                                value={cylinder}
                                onChange={handleInputChange} />
                        </MDBCol>
                    }
                    {
                        this.includes([1, 2, 3, 4, 5], categories) &&
                        <MDBCol md="6">
                            <MDBInput
                                label={'mileage'}
                                value={mileage}
                                name="mileage"
                                onChange={handleInputChange} />
                        </MDBCol>
                    }
                </MDBRow>
            </Fragment>
        )
    }
}

export default Filter