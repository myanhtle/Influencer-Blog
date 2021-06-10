// Configs
import "./App.css";
import firebase from "./configs/firebase";

// Module components
import { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Testing documents
// import TestBlog from "./components/testBlog";
// import TestUsers from "./components/testUser";

// Our active components
import ErrorPage from "./components/ErrorPage";
import NavBar from "./components/NavBar";
import Forum from "./components/forum/Forum";
import ColorExamples from "./components/ColorExamples";
import DataForm from "./components/dataForm";
import LoginPage from "./components/LoginPage";
import { UserContext } from "./contexts/UserContext";
import AccountPage from "./components/AccountPage";
import Blog from "./components/blogs/Blogs";
import Landing from "./components/blogs/Landing";
import HomePage from "./components/HomePage";
import MerchPage from "./components/merch/merchPage";
import About from "./components/About";
// import MerchForm from "./components/merchForm";
import Footer from "./components/Footer";

function App() {
  const { setUser } = useContext(UserContext);
  firebase.auth().onAuthStateChanged((user) => {
    setUser(user);
  });

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/about" component={About} />
        <Route exact path="/blog" component={Landing} />
        <Route exact path="/blog/:id" component={Blog} />
        <Route path="/forum" component={Forum} />
        <Route path="/dataform" component={DataForm} />
        <Route path="/login" component={LoginPage} />
        <Route path="/color-examples" component={ColorExamples} />
        <Route path="/account" component={AccountPage} />
        <Route path="/merchForm" component={MerchPage} />
        <Route component={ErrorPage} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
