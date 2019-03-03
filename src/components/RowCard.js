import React from "react";
import { MDBCard, MDBCardImage, MDBCardBody,
  MDBCardTitle,MDBCardText, MDBCardFooter,MDBTooltip,NavLink
} from "mdbreact";
import { withNamespaces } from 'react-i18next';

const RowCard = ( props) => {
  const {announcement , t } = props;
  return (
    <NavLink to={`/details/${announcement.id}?ownerId=${announcement.ownerId}`}>
    <MDBCard narrow ecommerce className="mb-2 mt-5" >
    <MDBCardImage
      cascade
      top
      src={announcement.images[0].thumb}
      alt={announcement.title}
    />
    <MDBCardBody cascade>
      <strong href="" className="text-muted">
        <h5>{t('common.categories.'+announcement.category.toString())}</h5>
      </strong>
      <MDBCardTitle>
        <strong>
          <h4 href="">{announcement.title}</h4>
        </strong>
      </MDBCardTitle>
      <MDBCardText>
      {announcement.shortDescription}
      </MDBCardText>
      <MDBCardFooter className="px-1">
        <span className="float-left">{announcement.amount}</span>
        <span className="float-right">
          <MDBTooltip
            placement="top"
            tag="span"
            component="i"
            componentClass="fa fa-eye grey-text ml-3"
            tooltipContent="Quick look"
          />
          <MDBTooltip
            placement="top"
            tag="span"
            component="i"
            componentClass="fa fa-heart grey-text ml-3"
            tooltipContent="Add to favoritlist"
          />
        </span>
      </MDBCardFooter>
    </MDBCardBody>
  </MDBCard>
    </NavLink>

  );
}

const RowCardWrapped = withNamespaces()(RowCard);
export default RowCardWrapped

