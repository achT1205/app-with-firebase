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
    MDBBtn,
    Fa
} from "mdbreact";
import logo from "../../../flags/blank.gif";
import "../../../flags/flags.min.css";
import weDealLogo from '../../../logo.png'
import { withNamespaces } from 'react-i18next';
import './index.css'


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

        const { handleChange, t, signIn, user, logout } = this.props;
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
                                <Dropdown>
                                    <DropdownToggle className="dopdown-toggle" nav>
                                        <span className="waves-effect waves-light d-flex align-items-center">
                                            <Fa icon="envelope" className="ml-1 mt-2" />
                                            <span className="notif-label" color="danger" > 1290 </span>
                                        </span>
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-default">
                                        <DropdownItem href="/chats">chats</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </NavItem>
                            <NavItem>
                                <Dropdown>
                                    <DropdownToggle className="dopdown-toggle" nav>
                                        <span className="waves-effect waves-light d-flex align-items-center">
                                            <Fa icon="bell" className="ml-1 mt-2" />
                                            <span className="notif-label" color="danger" > 1290 </span>
                                        </span>
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-default">
                                        <DropdownItem href="/notifications">Notif #1</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </NavItem>
                            <NavItem>
                                <div className="flags">
                                    <img src={logo} onClick={() => handleChange("fr")} className="flag flag-fr" alt="French" />
                                    <img src={logo} onClick={() => handleChange("us")} className="flag flag-us" alt="English" />
                                </div>
                            </NavItem>
                            {(!user || !user.isConnected) &&
                                <NavItem>
                                    <MDBBtn rounded color="info" size="sm" onClick={signIn}>LOG IN <Fa icon="sign-in" /></MDBBtn>
                                </NavItem>
                            }

                            {user && user.isConnected &&
                                <NavItem>
                                    <Dropdown>
                                        <DropdownToggle className="dopdown-toggle" nav>
                                            <img src={user.photoURL ? user.photoURL : 'http://placehold.it/50x50'} className="rounded-circle z-depth-0" style={{ height: "35px", padding: 0 }} alt="" />
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-default" right>
                                            <DropdownItem href={`users/${user.id}`}>{t('header.nav.menus.profile.account')}</DropdownItem>
                                            <DropdownItem href="/manage">Manage</DropdownItem>
                                            <DropdownItem onClick={logout}> {t('header.nav.menus.profile.logout')}</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </NavItem>
                            }
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