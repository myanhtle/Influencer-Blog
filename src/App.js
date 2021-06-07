import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import NavBar from "./components/NavBar";
import ColorExamples from "./components/ColorExamples";
import DataForm from "./components/dataForm";
import Blog from "./components/Blog";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" component={null} exact />
        <Route path="/about" component={null} />
        <Route path="/blog" component={Blog} />
        <Route path="/forum" component={null} />
        <Route path="/dataform" component={DataForm} />
        <Route path="/login" component={null} />
        <Route path="/color-examples" component={ColorExamples} />
        <Route component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
