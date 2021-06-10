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
import Blog from "./components/blogs/Blog";
import HomePage from "./components/HomePage";
import MerchPage from "./components/merch/merchPage";
import Cart from "./components/merch/cart";
import About from "./components/About";
// import MerchForm from "./components/merchForm";
import Footer from "./components/Footer";
import MusicPage from "./components/music/MusicPage";

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
        <Route path="/blog" component={Blog} />
        <Route path="/forum" component={Forum} />
        <Route path="/dataform" component={DataForm} />
        <Route path="/login" component={LoginPage} />
        {/* <Route path="/color-examples" component={ColorExamples} /> */}
        <Route path="/cart" component={Cart} />
        <Route path="/account" component={AccountPage} />
        <Route path="/shop" component={MerchPage} />
        <Route path="/music" component={MusicPage} />
        <Route component={ErrorPage} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
