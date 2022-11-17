import React, { Component } from "react";
import "../App.css";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import logo from "../imgs/logo/logo.png";
import envelope from "../imgs/icones/envelopeAzul.png";
import password from "../imgs/icones/passwordAzul.png";
import userPic from "../imgs/icones/userAzul.png";
import fakeUser from "../imgs/icones/user4.jpg";
import { Form, InputGroup, FormControl } from "react-bootstrap";
import axios from "axios";
import { QuestionCircleFill } from "react-bootstrap-icons";

const divStyle = {
  fontSize: "0.9rem",
  color: "white!important",
  textAlign: "end",
  display: "block",
};

const divStyle2 = {
  display: "block",
};

class EditUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nomeUser: "",
      emailUser: "",
      password: "",
      checkPassword: "",
      errorMsg: "",
      buttonActive: "disabled",
      responseFrom: "",
      typeUser: "0",
      showModal: false,
      showModalTypeUser: false,
      errorMessage: "",
      idUser: "",
      selectedFile: null,
      classBorder: "borderNormal",
      userImg: "",
    };
  }
  //funcao global
  checkSession() {
    const cookieUser = localStorage.getItem("username");
    /*console.log('username',cookieUser);*/
    if (cookieUser) {
      console.log("Existe sessão aberta");
      //window.location.href = '/home/';
    } else {
      console.log("Não existe sessão aberta - redirecionar");
      window.location.href = "/login/";
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    // On submit of the form, send a POST request with the data to the server.
    console.log("cheguei aqui");
    console.log(this.state.nomeUser);
    console.log(this.state.emailUser);
    console.log(this.state.password);
    console.log(this.state.typeUser);
    const stateIdUser = this.state.idUser;
    const stateNomeUser = this.state.nomeUser;
    const stateEmailUser = this.state.emailUser;
    const statePasswordUser = this.state.password;
    const stateTypeUser = this.state.typeUser;
    let urlUpdate;
    if (statePasswordUser == "") {
      urlUpdate = "https://geo-navsafety.ua.pt:443/updateInfoUserNoPassword";
      axios
        .post(urlUpdate, {
          idUserDB: stateIdUser,
          usernameDB: stateNomeUser,
          emailDB: stateEmailUser,
          typeUserDB: stateTypeUser,
        })
        .then((response) => {
          //para mostrar a resposta da api da bd
          console.log("response from then", response);
          //this.onClickHandler();
          if (response.data.affectedRows) {
            this.setState({
              showModal: true,
              errorMessage: "Profile edited with sucess!",
            });
            localStorage.setItem("typeUsers_id", stateTypeUser);
            localStorage.setItem("username", stateNomeUser);
          } else {
            this.setState({
              showModal: true,
              errorMessage: "Something went wrong! Please try again!",
            });
          }
        });
    } else {
      urlUpdate = "https://geo-navsafety.ua.pt:443/updateInfoUser";
      axios
        .post(urlUpdate, {
          idUserDB: stateIdUser,
          usernameDB: stateNomeUser,
          emailDB: stateEmailUser,
          typeUserDB: stateTypeUser,
          passwordDB: statePasswordUser,
        })
        .then((response) => {
          //para mostrar a resposta da api da bd
          console.log("response from then", response);
          //this.onClickHandler();
          if (response.data.affectedRows) {
            this.setState({
              showModal: true,
              errorMessage: "Profile edited with sucess!",
            });
            localStorage.setItem("typeUsers_id", stateTypeUser);
            localStorage.setItem("username", stateNomeUser);
            /*localStorage.setItem('userImgSrc',);*/
          } else {
            this.setState({
              showModal: true,
              errorMessage: "Something went wrong! Please try again!",
            });
          }
        });
    }
  }
  onClickHandler(event) {
    if (!(this.state.selectedFile == null)) {
      console.log("há imagem");
      //uploadImagem
      const data = new FormData();
      data.append("file", this.state.selectedFile);
      data.append("idUser", this.state.idUser);

      //let uploadImagem='https://localhost:443/uploadImagem';
      let uploadImagem = "https://geo-navsafety.ua.pt:443/uploadImagem";

      axios
        .post(uploadImagem, data, {
          // receive two parameter endpoint url ,form data
        })
        .then((res) => {
          // then print response status
          console.log(res.statusText);
          event.preventDefault();
          this.setState({ imgStatus: res.status });
          //alert(res.status);
          console.log("!!!!!!!!!!!!!!!!!!!!!!!!!", res);
          //alert(res.data.affectedRows);
          if (res.status == "200") {
            this.setState({
              showModal: true,
              errorMessage: "Image changed with sucess!",
            });
            console.log("aqui--------------", this.state.selectedFile);
            this.getInfoUser();

            //alert(this.state.userImg);
            /*let pathImage='../imgs/users/';
                        let fileSelected=this.state.selectedFile;
                        let fullPath=pathImage+fileSelected;
                        localStorage.setItem('userImgSrc',fullPath);*/
          } else {
            this.setState({
              showModal: true,
              errorMessage: "Something went wrong! Please try again!",
            });
          }
        });
    } else {
      console.log("nao há imagem");
    }
  }
  checkPassword1(event) {
    //verificar se as duas passes sao iguais
    console.log("password", event.target.value);
    console.log("checkPassword", this.state.checkPassword);
    var passUser = event.target.value;
    var checkpassUser = this.state.checkPassword;

    if (passUser == checkpassUser) {
      console.log("1 - passes estao iguais");
      this.setState({ buttonActive: "" });
      if (passUser == "" && checkpassUser == "") {
        this.setState({ errorMsg: "" });
      } else {
        this.setState({ errorMsg: "Passwords Match!" });
      }
    } else {
      console.log("1 - passes estao diferentes");
      this.setState({ buttonActive: "disabled" });
      this.setState({ errorMsg: "Passwords Don't Match!" });
    }
  }

  checkPassword2(event) {
    //verificar se as duas passes sao iguais
    console.log("password", this.state.password);
    console.log("checkPassword", event.target.value);
    var passUser = this.state.password;
    var checkpassUser = event.target.value;
    if (passUser == checkpassUser) {
      console.log("2-passes estao iguais");
      this.setState({ buttonActive: "" });
      if (passUser == "" && checkpassUser == "") {
        this.setState({ errorMsg: "" });
      } else {
        this.setState({ errorMsg: "Passwords Match!" });
      }
    } else {
      console.log("2-passes estao diferentes");
      this.setState({ buttonActive: "disabled" });
      this.setState({ errorMsg: "Passwords Don't Match!" });
    }
  }

  handleClose() {
    console.log("Vamos fechar a modal Sucesso");
    this.setState({ showModal: false });
    this.getInfoUser();
    //window.location.reload();
  }

  handleShow() {
    console.log(this.state.showModal);
    console.log("Temos de redirecionar porque foi feito com sucesso");

    this.setState({ showModal: true });
  }

  handleCloseTypeUser() {
    console.log("Vamos fechar a Modal type user");
    this.setState({ showModalTypeUser: false });
  }

  handleShowTypeUser() {
    console.log("Mostrar Modal type user");
    this.setState({ showModalTypeUser: true });
  }

  getInfoUser() {
    this.setState({ buttonActive: "" });
    const urlUserInfo = "https://geo-navsafety.ua.pt:443/getInfoUser";
    const cookieUser = localStorage.getItem("idUser");

    this.setState({ idUser: cookieUser });
    axios
      .post(urlUserInfo, {
        idUserDB: cookieUser,
      })
      .then((response) => {
        // console.log("response from then", response);
        // console.log("data.length", response.data.length);
        const userInfo = response.data[0];
        localStorage.setItem("userImgSrc", userInfo.userImgSrc);
        this.setState({
          nomeUser: userInfo.username,
          emailUser: userInfo.email,
          typeUser: userInfo.typeUsers_id,
          userImg: userInfo.userImgSrc,
        });

        if (userInfo.typeUsers_id == 0) {
          this.setState({
            classBorder: "borderNormal",
          });
        } else if (userInfo.typeUsers_id == 1) {
          this.setState({
            classBorder: "borderProfissional",
          });
        } else if (userInfo.typeUsers_id == 2) {
          this.setState({
            classBorder: "borderAcademico",
          });
        }
      });
  }
  componentDidMount() {
    this.getInfoUser();
  }
  onChangeHandler(event) {
    console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
  }

  render() {
    const profileUserImg = localStorage.getItem("userImgSrc");

    //verificar se já existe sessão
    //this.checkSession();
    return (
      <div className="maincontainer editProfileClass" style={divStyle}>
        <Container>
          <Row className="pt-3">
            <Button
              id="backBtnInfoGeral"
              className="voltarBtn"
              href="/"
            ></Button>
          </Row>
          <Row className="SubTitles pt-3 valueInfo">Edit profile</Row>
          <Row className="sliderText pt-2 textEditProfile">
            Here you can edit the information of your profile
          </Row>
          <Form
            onSubmit={(e) => {
              this.handleSubmit(e);
            }}
          >
            {/* Edit user profile */}
            <Row className="pt-2">
              <img
                id="perfilEdit"
                src={profileUserImg}
                //src={fakeUser}
                className={this.state.classBorder}
              />
            </Row>
            <Row className="pt-2">
              <input
                type="file"
                name="file"
                onChange={(event) => {
                  this.onChangeHandler(event);
                }}
              />
              <button
                type="button"
                className="btn btn-success btn-block btnUploadImage mb-2 mt-2"
                onClick={(event) => this.onClickHandler(event)}
              >
                Change image
              </button>
            </Row>
            {/* Username */}
            <Form.Group
              as={Row}
              className="pt-2 profileEdit"
              controlId="nomeUserProfile"
            >
              <Form.Label column xs="1">
                <img src={userPic} className="iconsLogin" />
              </Form.Label>
              <Col xs="11" className="ps-0">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  aria-describedby="nomeUserProfile"
                  className="editProfileForm placeEditProfile"
                  value={this.state.nomeUser}
                  onChange={(e) => this.setState({ nomeUser: e.target.value })}
                />
              </Col>
            </Form.Group>

            {/* Email */}
            <Form.Group
              as={Row}
              className="mb-2 pt-1 profileEdit"
              controlId="emailUserProfile"
            >
              <Form.Label column xs="1">
                <img src={envelope} className="iconsLogin" />
              </Form.Label>
              <Col xs="11" className="ps-0">
                <Form.Control
                  placeholder="Email"
                  aria-label="emailUserProfile"
                  type="email"
                  aria-describedby="emailUserProfile"
                  className="editProfileForm placeEditProfile"
                  value={this.state.emailUser}
                  onChange={(e) => this.setState({ emailUser: e.target.value })}
                />
              </Col>
            </Form.Group>
            {/* New Password */}
            <Form.Group
              as={Row}
              className="mb-2 pt-1 profileEdit"
              controlId="passwordUserProfile"
            >
              <Form.Label column xs="1">
                <img src={password} className="iconsLogin" />
              </Form.Label>
              <Col xs="11" className="ps-0">
                <Form.Control
                  type="password"
                  placeholder="Insert new password"
                  aria-label="passwordUserProfile"
                  aria-describedby="passwordUserProfile"
                  className="editProfileForm"
                  onChange={(e) => {
                    // console.log('targetPassword',e.target.value);
                    const eventTargetValue = e.target.value;
                    this.setState({ password: eventTargetValue });
                    // console.log('esta é a password',this.state.password);
                    this.checkPassword1(e);
                  }}
                />
              </Col>
            </Form.Group>
            {/* Check New Password */}
            <Form.Group
              as={Row}
              className="mb-2 pt-1 profileEdit"
              controlId="checkPasswordUserProfile"
            >
              <Form.Label column xs="1">
                <img src={password} className="iconsLogin" />
              </Form.Label>
              <Col xs="11" className="ps-0">
                <Form.Control
                  type="password"
                  placeholder="Insert new password again"
                  aria-label="checkPasswordUser"
                  aria-describedby="checkPasswordUserProfile"
                  className="editProfileForm placeEditProfile"
                  onChange={(e) => {
                    console.log(e.target.value);
                    this.setState({ checkPassword: e.target.value });
                    //console.log('esta é a checkPassword',this.state.checkPassword);
                    this.checkPassword2(e);
                  }}
                />
              </Col>
            </Form.Group>
            <Row style={divStyle2}>
              <div id="erroPassword" style={divStyle}>
                {this.state.errorMsg}
              </div>
            </Row>
            {/* Type of User */}
            <Form.Group as={Row} className="mb-3" controlId="typeUserProfile">
              <Form.Label
                column
                xs="12"
                className="divSelect1 divSelectBold editProfileForm d-flex"
              >
                Type of User
                <Button
                  className="btnTypeUser p-0"
                  onClick={() => {
                    this.handleShowTypeUser();
                  }}
                >
                  <QuestionCircleFill
                    color="#005086"
                    size={25}
                    className="btnTypeUser ps-1"
                  />
                </Button>
              </Form.Label>
              <Col xs="12" className="ps-0">
                <Form.Control
                  className="borderSelect profileEditSelect editProfileForm"
                  aria-describedby="typeUserProfile"
                  as="select"
                  id="selectUserProfile"
                  value={this.state.typeUser}
                  onChange={(e) => {
                    console.log("Select" + e.target.value);
                    this.setState({ typeUser: e.target.value });
                  }}
                >
                  <option className="optionSelect" value={"0"}>
                    Amateur
                  </option>
                  <option className="optionSelect" value={"1"}>
                    Professional
                  </option>
                  <option className="optionSelect" value={"2"}>
                    Academic
                  </option>
                </Form.Control>
              </Col>
            </Form.Group>
            {/* Botao Edit Info */}
            <Row className="text-center pb-3">
            <Row className="text-center">
                <Button
                  className="btnLogin btnEditProfile ms-auto me-auto"
                  variant="outline-primary"
                  type="submit"
                  disabled={this.state.buttonActive}
                >
                  Change Info
                </Button>
              </Row>
            </Row>
          </Form>
        </Container>
        <Modal className="" show={this.state.showModal} onHide={() => this.handleClose()}>
                            <Modal.Header closeButton>
                                <Modal.Body>
                                    <p>{this.state.errorMessage}</p>
                                </Modal.Body>
                            </Modal.Header>
                        </Modal>

                        {/*Modal Type User*/}
                        <Modal centered className="" show={this.state.showModalTypeUser} onHide={() => this.handleCloseTypeUser()}>
                            <Modal.Header closeButton>
                                <Modal.Title>Type of Users </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>There are 3 types of user for you to choose:</p>
                                <p><span className="font-weight-bold colorAmateur">Amateur: </span> users with specific interests in the information presented (eg. sea state, waves, etc.) </p>
                                <p><span className="font-weight-bold colorProfissional">Professional: </span> users with special information needs (eg. port management entities) </p>
                                <p><span className="font-weight-bold colorAcademico">Academic: </span> academic users with a scientific interest in analyzing the collected data</p>
                            </Modal.Body>
                        </Modal>
      </div>
    );
  }
}

export default EditUserProfile;
