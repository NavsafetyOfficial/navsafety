import React, {Component} from "react";

import {Button, Modal} from "react-bootstrap";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModalLogout: false,
        }
        this.handleShow=this.handleShow.bind(this);
        this.handleClose=this.handleClose.bind(this);
    }

    /* Set the width of the side navigation to 250px */
    openNav() {
        document.getElementById("mySidenav").style.width = "250px";
        //document.getElementById('fullscreen').style.display = 'block';
        // document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    }

    /* Set the width of the side navigation to 0 */
    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        //document.getElementById('fullscreen').style.display = 'none';
        // document.body.style.backgroundColor = "white";
    }


    handleClose() {
        this.setState({showModalLogout: false});
    }

    handleShow() {
        this.setState({showModalLogout: true});
    }

    logout() {
        localStorage.removeItem('idUser');
        localStorage.removeItem('username');
        localStorage.removeItem('typeUsers_id');
        localStorage.removeItem('userImgSrc');
        window.location.href="/login";
    }


    render() {
        const pathPage = window.location.pathname;

        const profileUserImg = localStorage.getItem('userImgSrc');
        let profileUser = null;
        let borderUser = null;
        const userName = localStorage.getItem('username');

        const typeUsers_id = localStorage.getItem('typeUsers_id');
        if (typeUsers_id == 0) {
            //Tipos de utilizadores normais
            borderUser = "borderNormal";
        } else if (typeUsers_id == 1) {
            borderUser = "borderProfissional";
        } else if (typeUsers_id == 2) {
            borderUser = "borderAcademico";
        }

        if (profileUserImg === "null") {
            profileUser = "../imgs/icones/user4.jpg";
        } else {
            
            profileUser = profileUserImg;
            //profileUser="http://geo-navsafety.ua.pt/imgs/users/fundoazul.png"

        }
       
        return (
            <div>
                <span onClick={this.openNav} className="pr-2">
                    <img id="perfil" src={profileUser} className={borderUser}/>
                </span>
                <div className="">
                    <div id="mySidenav" className="sidenav">
                        <div className="topsideNav">
                            <a href="javascript:void(0)" className="closebtn " onClick={this.closeNav}>&times;</a>
                            <img id="perfil2" src={profileUser} className={borderUser}/>
                            <p className="align-text-center mb-0 pt-2 pb-2">{userName}</p>
                        </div>
                        <div className="bottomsideNav">
                            <a href="/editProfile/" className="pt-3" >Edit profile</a>
                            <a onClick={this.handleShow} className="">Logout</a>
                        </div>
                    </div>
                </div>
                <Modal className="modalLogout" show={this.state.showModalLogout} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Body>Are you sure you want to Logout?</Modal.Body>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=>this.handleClose()}>Cancel</Button>
                        <Button variant="primary" onClick={()=>this.logout()}>Logout</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }


}

export default Profile;
