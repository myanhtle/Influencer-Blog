// Configs
import "./App.css";
import firebase from "./configs/firebase";

// Module components
import { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Our components
import ErrorPage from "./components/ErrorPage";
import NavBar from "./components/NavBar";
import TestBlog from "./components/testBlog";
import Forum from "./components/forum/Forum";
import ColorExamples from "./components/ColorExamples";
import DataForm from "./components/dataForm";
import LoginPage from "./components/LoginPage";
import { UserContext } from "./contexts/UserContext";
import AccountPage from "./components/AccountPage";
import Blog from "./components/blog/Blog";

function App() {
  const { setUser } = useContext(UserContext);
  firebase.auth().onAuthStateChanged((user) => {
    setUser(user);
    console.log(user);
  });

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" component={TestBlog} exact />
        <Route path="/about" component={null} />
        <Route path="/blog" component={Blog} />
        <Route path="/forum" component={Forum} />
        <Route path="/dataform" component={DataForm} />
        <Route path="/login" component={LoginPage} />
        <Route path="/color-examples" component={ColorExamples} />
        <Route path="/account" component={AccountPage} />
        <Route component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
