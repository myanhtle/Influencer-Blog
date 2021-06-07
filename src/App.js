import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ErrorPage from "./components/ErrorPage"

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={null} exact />
        <Route path="/about" component={null} />
        <Route path="/blog" component={null} />
        <Route path="/forum" component={null} />
        <Route path="/login" component={null} />
        <Route component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
