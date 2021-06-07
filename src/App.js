import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={null} exact />
        <Route path="/about" component={null} />
        <Route path="/blog" component={null} />
        <Route path="/forum" component={null} />
        <Route path="/login" component={null} />
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
