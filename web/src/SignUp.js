import React, { AsyncStorage } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Home from "./Home";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }
const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // fileList:'',
      name: "",
      email: "",
      password: "",
      education: "",
      about: "",
    };

    this.handelName = this.handelName.bind(this);
    this.handelEmail = this.handelEmail.bind(this);
    this.handelPassword = this.handelPassword.bind(this);
    this.handelEducation = this.handelEducation.bind(this);
    this.handelAbout = this.handelAbout.bind(this);
    this.handelSubmit = this.handelSubmit.bind(this);
    // this.handelImage =this.handelImage.bind(this);
  }

  async sendCred(props) {
    fetch("http://localhost:3001/counselorSignup", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileList: this.state.fileList,
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        education: this.state.education,
        about: this.state.about,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {
          console.log(data.token);
          localStorage.setItem("token", data.token);
          console.log(localStorage.getItem("token"));
          props.history.push("/home");
        } catch (e) {
          console.log(e);
        }
      });
  }

  // handelImage=(e)=>{

  //   const source = {uri: image.path};
  //     let item = {
  //       contentType: 'image/jpg',
  //       data: image.data,
  //     };
  //   this.setState({
  //     fileList: e.target.value
  //   })
  // }

  handelName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  handelEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handelPassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handelEducation = (e) => {
    this.setState({
      education: e.target.value,
    });
  };

  handelAbout = (e) => {
    this.setState({
      about: e.target.value,
    });
  };

  handelSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.name);
    console.log(this.state.email);
    console.log(this.state.password);
    console.log(this.state.education);
    console.log(this.state.about);

    this.sendCred();
  };

  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {/* //     <Avatar className={classes.avatar}>
    //       <LockOutlinedIcon />
    //     </Avatar>
    //     <Typography component="h1" variant="h5">
    //       Sign up
    //     </Typography> */}
          <form
            className={classes.form}
            noValidate
            onSubmit={this.handelSubmit}
          >
            <Grid item xs={12}>
              <IconButton>
                <input
                  accept="image/*"
                  className={classes.input}
                  onChange={this.handelImage}
                  style={{ display: "none" }}
                  id="raised-button-file"
                  multiple
                  type="file"
                />
                <label htmlFor="raised-button-file">
                  <Avatar className={classes.avatar} alt="Remy Sharp" />
                </label>
              </IconButton>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handelName}
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  value={this.state.email}
                  onChange={this.handelEmail}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  onChange={this.handelPassword}
                  value={this.state.password}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  value={this.state.education}
                  fullWidth
                  onChange={this.handelEducation}
                  id="education"
                  label="Education"
                  name="education"
                  autoComplete="education"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  value={this.state.about}
                  onChange={this.handelAbout}
                  fullWidth
                  id="about"
                  label="About"
                  name="about"
                  autoComplete="about"
                />
              </Grid>

              {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="SignIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        {/* <Box mt={5}>
        <Copyright />
      </Box> */}
      </Container>
    );
  }
}

const mySignUp = withRouter(SignUp);
export default withStyles(useStyles)(mySignUp);
