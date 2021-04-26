import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "reactjs-popup/dist/index.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "../../index.css";
import {
  ModalProvider,
  Modal,
  useModal,
  ModalTransition,
} from "react-simple-hook-modal";
import "react-simple-hook-modal/dist/styles.css";
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>;
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const Card = (props) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const classes = useStyles();

  return (
    <>
      <div className="col-md-4 col-10 mx-auto">
        <div className="card">
          <img src={props.imgsrc} className="card-img-top" alt={props.imgsrc} />
          <div className="card-body">
            <h5 className="card-title font-weight-bold">{props.title}</h5>
            <p className="card-text">⭐⭐⭐⭐⭐(17)</p>
            <p className="card-text">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>

            <NavLink className="btn-card" exact to="/chat">
              View Profile
            </NavLink>
            <ModalProvider>
              <NavLink
                onClick={openModal}
                className="btn-book"
                exact
                to="/counselors"
              >
                Book now
              </NavLink>
              <Modal
                id="any-unique-identifier"
                isOpen={isModalOpen}
                transition={ModalTransition.BOTTOM_UP}
              >
                <form className={classes.container} noValidate>
                  <TextField
                    id="datetime-local"
                    label="Next appointment"
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </form>
                <button onClick={closeModal}>OK</button>
              </Modal>
            </ModalProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
