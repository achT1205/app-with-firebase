import React, { Fragment, Component } from 'react'
import {
    Navbar,
    NavbarBrand,
    NavbarNav,
    NavbarToggler,
    Collapse,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Fa
} from "mdbreact";
import logo from "../../../flags/blank.gif";
import "../../../flags/flags.min.css";
import weDealLogo from '../../../logo.png'
import { withNamespaces } from 'react-i18next';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseID: ""
        };
    }

    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));

    closeCollapse = collapseID => () =>
        this.state.collapseID === collapseID && this.setState({ collapseID: "" });

    render() {

        const { handleChange, t } = this.props;
        const overlay = (
            <div
                id="sidenav-overlay"
                style={{ backgroundColor: "transparent" }}
                onClick={this.toggleCollapse("mainNavbarCollapse")}
            />
        );

        return (
            <Fragment>
                <Navbar color="indigo" dark expand="md" fixed="top" scrolling>
                    <NavbarBrand href="/">
                        <img
                            src={weDealLogo}
                            alt=""
                            height="20"
                        />{" "}
                        Lest's deal
                    </NavbarBrand>
                    <NavbarToggler
                        onClick={this.toggleCollapse("mainNavbarCollapse")}
                    />
                    <Collapse
                        id="mainNavbarCollapse"
                        isOpen={this.state.collapseID}
                        navbar
                    >
                        <NavbarNav right>
                            <NavItem>
                                <NavLink
                                    exact
                                    to="/"
                                    onClick={this.closeCollapse("mainNavbarCollapse")}
                                >
                                    {t('header.nav.menus.home')}
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    onClick={this.closeCollapse("mainNavbarCollapse")}
                                    to="/create"
                                >
                                    {t('header.nav.menus.edit')}
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    onClick={this.closeCollapse("mainNavbarCollapse")}
                                    to="/announcements"
                                >
                                    {t('header.nav.menus.announcements')}
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    onClick={this.closeCollapse("mainNavbarCollapse")}
                                    to="/shop"
                                >
                                    {t('header.nav.menus.shop')}
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="waves-effect waves-light" to="#!"><Fa icon="twitter" /></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="waves-effect waves-light" to="#!"><Fa icon="google-plus" /></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="waves-effect waves-light d-flex align-items-center" to="#!">1<Fa icon="envelope" className="ml-1" /></NavLink>
                            </NavItem>
                            <NavItem>
                                <div className="flags">
                                    <img src={logo} onClick={() => handleChange("fr")} className="flag flag-fr" alt="French" />
                                    <img src={logo} onClick={() => handleChange("us")} className="flag flag-us" alt="English" />
                                </div>
                            </NavItem>
                            <NavItem>
                                <Dropdown>
                                    <DropdownToggle className="dopdown-toggle" nav>
                                        <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg" className="rounded-circle z-depth-0" style={{ height: "35px", padding: 0 }} alt="" />
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-default" right>
                                        <DropdownItem href="/manage">Manage</DropdownItem>
                                        <DropdownItem href="#!">{t('header.nav.menus.profile.account')}</DropdownItem>
                                        <DropdownItem href="#!"> {t('header.nav.menus.profile.logout')}</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </NavItem>
                        </NavbarNav>
                    </Collapse>
                </Navbar>
                {this.state.collapseID && overlay}
            </Fragment>
        )
    }
}
const HeaderWrapped = withNamespaces()(Header);
export default HeaderWrapped