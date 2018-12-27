import React, { Fragment } from 'react'
import MultiCarousel from '../../components/MultiCarousel'
import { withNamespaces } from 'react-i18next'
import {
  Row,
  Col,
  CardBody,
  EdgeHeader,
  FreeBird
} from "mdbreact";

const HomePage = ({ t }) => {
  return (
    <Fragment>
      <EdgeHeader color="indigo darken-3" />
      <FreeBird>
        <Row>
          <Col
            md="10"
            className="mx-auto float-none white z-depth-1 py-2 px-2"
          >
            <CardBody>
              <h2 className="h2-responsive mb-4">
                <strong>{t('home.title')}</strong>
              </h2>
              <p className="pb-4">
                {t('home.description.part2')}
              </p>
            </CardBody>
          </Col>
        </Row>
      </FreeBird>
      <MultiCarousel />
    </Fragment>
  )
}
const HomePageWrapped = withNamespaces()(HomePage);
export default HomePageWrapped