import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import NavBar from "./components/NavBar";
import TestBlog from "./components/testBlog";
import Forum from "./components/forum/Forum";
import ColorExamples from "./components/ColorExamples";
import DataForm from "./components/dataForm";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" component={TestBlog} exact />
        <Route path="/about" component={null} />
        <Route path="/blog" component={null} />
        <Route path="/forum" component={Forum} />
        <Route path="/dataform" component={DataForm} />
        <Route path="/login" component={null} />
        <Route path="/color-examples" component={ColorExamples} />
        <Route component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
