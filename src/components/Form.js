import React, { Fragment } from 'react'
import { MDBRow, MDBCol, MDBInput, Input, Card, CardBody, CardTitle } from 'mdbreact'
import CategorySelect from './common/categorySelect'
import VehiculeCriteria from './common/vehiculeCriteria'
import ImmovableCriteria from './common/immovableCriteria'
import VacationCriteria from './common/vacationCriteria'
import { withNamespaces } from 'react-i18next';

const Form = ({
    handleOwnerInputChange, onClickMarketingCheck, onClickHidePhoneCheck, onClickGenderRadio, handleLocationInputChange, fileInputHandler, handleDescriptionInputChange, onClickTypeRadio, onClickProfileRadio, handelHasSwimingPoolSelectChange, handelGesSelectChange, handelEnergyClassificationSelectChange, handelNumberOfRoomsSelectChange, handelIsEquipedSelectChange, handelImmovableTypesSelectChange, handelFuelsSelectChange, handelGearBoxSelectChange, handleCriteriaInputChange, handelYearsSelectChange, handelModelsSelectChange, handelCategorySelectChange, handelMarksSelectChange, announcement, handleInputChange, t
}) => {
    return (
        <Fragment>
            <Card wide>
                <CardBody cascade>
                    <CardTitle>{t('common.labels.announcement')}</CardTitle>
                        <Fragment>
                            <MDBRow>
                                <MDBCol md="6" style={{ height: 100 }}>
                                    <CategorySelect
                                        handelCategorySelectChange={handelCategorySelectChange}
                                        multiple={false}
                                        search={true}
                                        hideLabe={true}
                                        label={t('common.labels.category.label')}
                                        selectedValues={[announcement.category]}
                                        selectedDefault={t('common.labels.category.select')}
                                    />
                                </MDBCol>
                                <MDBCol md="6">
                                    <MDBInput
                                        value={announcement.title}
                                        label={announcement.category === 1 ? t('common.labels.titleJob') : t('common.labels.title')}
                                        name="title"
                                        onChange={handleInputChange} />
                                </MDBCol>
                            </MDBRow>
                            {announcement.category > 1 && announcement.category < 11 &&
                                <VehiculeCriteria
                                    handelYearsSelectChange={handelYearsSelectChange}
                                    handelModelsSelectChange={handelModelsSelectChange}
                                    handelMarksSelectChange={handelMarksSelectChange}
                                    handleCriteriaInputChange={handleCriteriaInputChange}
                                    handelFuelsSelectChange={handelFuelsSelectChange}
                                    handelGearBoxSelectChange={handelGearBoxSelectChange}
                                    announcement={announcement} />
                            }
                            {announcement.category > 10 && announcement.category < 15 &&
                                <ImmovableCriteria
                                    announcement={announcement}
                                    handelImmovableTypesSelectChange={handelImmovableTypesSelectChange}
                                    handelIsEquipedSelectChange={handelIsEquipedSelectChange}
                                    handelNumberOfRoomsSelectChange={handelNumberOfRoomsSelectChange}
                                    handelEnergyClassificationSelectChange={handelEnergyClassificationSelectChange}
                                    handelGesSelectChange={handelGesSelectChange}
                                    handleCriteriaInputChange={handleCriteriaInputChange}
                                />
                            }
                            {announcement.category > 14 && announcement.category < 19 &&
                                <VacationCriteria
                                    announcement={announcement}
                                    handleCriteriaInputChange={handleCriteriaInputChange}
                                    handelHasSwimingPoolSelectChange={handelHasSwimingPoolSelectChange}
                                />
                            }
                            <MDBRow>
                                <MDBCol md="12">
                                    <h6>{t('common.typeOfProfile.0')}</h6>
                                </MDBCol>
                                <MDBCol md="12">
                                    <div className="form-inline">
                                        <Input
                                            onClick={() => onClickProfileRadio(1)}
                                            checked={announcement.owner.typeOfProfile === 1 ? true : false}
                                            label={t('common.typeOfProfile.1')}
                                            type="radio"
                                            id="profile1"
                                        />
                                        <Input
                                            onClick={() => onClickProfileRadio(2)}
                                            checked={announcement.owner.typeOfProfile === 2 ? true : false}
                                            label={t('common.typeOfProfile.2')}
                                            type="radio"
                                            id="profile2"
                                        />
                                    </div>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="12">
                                    <h6>{t('common.types.0')}</h6>
                                </MDBCol>
                                <MDBCol md="12">
                                    <div className="form-inline">
                                        <Input
                                            onClick={() => onClickTypeRadio(1)}
                                            checked={announcement.type === 1 ? true : false}
                                            label={t('common.types.1')}
                                            type="radio"
                                            id="type1"
                                        />
                                        <Input
                                            onClick={() => onClickTypeRadio(2)}
                                            checked={announcement.type === 2 ? true : false}
                                            label={t('common.types.2')}
                                            type="radio"
                                            id="type2"
                                        />
                                    </div>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="12">
                                    <MDBInput
                                        label={t('common.labels.amount.title')}
                                        name="amount"
                                        value={announcement.amount}
                                        onChange={handleInputChange}
                                    />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="12">
                                    <MDBInput
                                        type="textarea"
                                        label={t('common.labels.description.title')}
                                        name="description"
                                        value={announcement.description}
                                        rows="3"
                                        onChange={handleDescriptionInputChange} />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="12">
                                    <input type="file" />
                                </MDBCol>
                            </MDBRow>
                        </Fragment>
                </CardBody>
            </Card>
            <Card wide className="mt-3">
                <CardBody cascade>
                    <CardTitle>{t('common.labels.location')}</CardTitle>
                        <MDBRow>
                            <MDBCol md="6">
                                <MDBInput
                                    label={t('common.labels.city')}
                                    value={announcement.location.city}
                                    onChange={handleLocationInputChange}
                                    name="city" />
                            </MDBCol>
                            <MDBCol md="6">
                                <MDBInput
                                    label={t('common.labels.zipCode')}
                                    value={announcement.location.zipCode}
                                    onChange={handleLocationInputChange}
                                    name="zipCode" />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md="3">
                                <MDBInput
                                    label={t('common.labels.numberOfStreet')}
                                    value={announcement.location.numberOfStreet}
                                    onChange={handleLocationInputChange}
                                    name="numberOfStreet" />
                            </MDBCol>
                            <MDBCol md="9">
                                <MDBInput
                                    label={t('common.labels.streetName')}
                                    value={announcement.location.streetName}
                                    onChange={handleLocationInputChange}
                                    name="streetName" />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md="12">
                                <MDBInput
                                    label={t('common.labels.placeKnownAs')}
                                    value={announcement.location.placeKnownAs}
                                    onChange={handleLocationInputChange} />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md="12">
                                <MDBInput
                                    label={t('common.labels.country')}
                                    value={announcement.location.country}
                                    onChange={handleLocationInputChange}
                                    name="country" />
                            </MDBCol>
                        </MDBRow>
                </CardBody>
            </Card>
            <Card wide className="mt-3">
                <CardBody cascade>
                    <CardTitle>{t('common.labels.owner.title')}</CardTitle>
                        <MDBRow>
                            <MDBCol md="12">
                                <h6>{t('common.labels.owner.gender')}</h6>
                            </MDBCol>
                            <MDBCol md="12">
                                <div className="form-inline">
                                    <Input
                                        onClick={() => onClickGenderRadio(1)}
                                        checked={announcement.owner.gender === 1 ? true : false}
                                        label={t('common.labels.gender1')}
                                        type="radio"
                                        id="gender1"
                                    />
                                    <Input
                                        onClick={() => onClickGenderRadio(2)}
                                        checked={announcement.owner.gender === 2 ? true : false}
                                        label={t('common.labels.gender2')}
                                        type="radio"
                                        id="gender2"
                                    />
                                    <Input
                                        onClick={() => onClickGenderRadio(3)}
                                        checked={announcement.owner.gender === 3 ? true : false}
                                        label={t('common.labels.gender3')}
                                        type="radio"
                                        id="gender3"
                                    />
                                </div>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md="6">
                                <MDBInput
                                    type="text"
                                    label={t('common.labels.name')}
                                    value={announcement.owner.name}
                                    onChange={handleOwnerInputChange}
                                    name="name" />
                            </MDBCol>
                            <MDBCol md="6">
                                <MDBInput
                                    type="text"
                                    label={t('common.labels.phone')}
                                    value={announcement.owner.phone}
                                    onChange={handleOwnerInputChange}
                                    name="phone" />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md="12">
                                <MDBInput
                                    type="email"
                                    label={t('common.labels.email')}
                                    value={announcement.owner.email}
                                    onChange={handleOwnerInputChange}
                                    name="email" />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md="6">
                                <Input
                                    label={t('common.labels.hidePhone')}
                                    type="checkbox"
                                    id="hidePhone"
                                    name="hidePhone"
                                    checked={announcement.owner.hidePhone}
                                    onClick={() => onClickHidePhoneCheck} />
                            </MDBCol>
                            <MDBCol md="6">
                                <Input
                                    label={t('common.labels.toBeContactedForMarketing')}
                                    type="checkbox"
                                    id="toBeContactedForMarketing"
                                    name="toBeContactedForMarketing"
                                    checked={announcement.owner.toBeContactedForMarketing}
                                    onClick={() => onClickMarketingCheck} />
                            </MDBCol>
                        </MDBRow>
                </CardBody>
            </Card>
        </Fragment>
    )
}
const FormWrapped = withNamespaces()(Form);
export default FormWrapped