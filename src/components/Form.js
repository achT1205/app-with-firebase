import React, { Fragment } from 'react'
import { MDBRow, MDBCol, MDBInput } from 'mdbreact'
import CategorySelect from './common/categorySelect'
import VehiculeCriteria from './common/vehiculeCriteria'
import ImmovableCriteria from './common/immovableCriteria'
import VacationCriteria from './common/vacationCriteria'
import { withNamespaces } from 'react-i18next';

const Form = ({
    handelGesSelectChange, handelEnergyClassificationSelectChange, handelNumberOfRoomsSelectChange, handelIsEquipedSelectChange, handelImmovableTypesSelectChange, handelFuelsSelectChange, handelGearBoxSelectChange, handleCriteriaInputChange, handelYearsSelectChange, handelModelsSelectChange, handelCategorySelectChange, handelMarksSelectChange, announcement, handleInputChange, t
}) => {
    return (
        <Fragment>
            <MDBRow>
                <MDBCol md="6">
                    <CategorySelect
                        handelCategorySelectChange={handelCategorySelectChange}
                        multiple={false}
                        search={true}
                        hideLabe={false}
                        label={"Category"}
                        selectedValues={[announcement.category]}
                        selectedDefault={"Select on category"}
                    />
                </MDBCol>
                <MDBCol md="6">
                    <MDBInput
                        value={announcement.title}
                        label={announcement.category === 1 ? t('common.labels.titleJob') : t('common.labels.title')}
                        type="text"
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
                />
            }
            {announcement.category > 14 && announcement.category < 19 &&
                <VacationCriteria
                    announcement={announcement}
                    handleCriteriaInputChange={handleCriteriaInputChange}
                />
            }
        </Fragment>
    )
}
const FormWrapped = withNamespaces()(Form);
export default FormWrapped