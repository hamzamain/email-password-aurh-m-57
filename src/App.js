import "./App.css";
import RegisterReactBootstrap from "./components/RegisterReactBootstrap/RegisterReactBootstrap";
import RegisterBootstrap from "./components/RegisterBootstrap/RegisterBootstrap";
import FormExample from "./components/explore/FormWithValidation";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./Layout/Main";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <RegisterReactBootstrap></RegisterReactBootstrap>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
]);

function App() {
  const handlerRegister = (event) => {
    event.preventDefault();
    console.log(event.target.email.value);
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(password);
  };

  const handleEmailChange = (event) => {
    console.log(event.target.value);
  };

  const handleEmailBlur = (event) => {
    console.log(event.target.value);
  };

  const handlePasswordChange = (event) => {
    console.log(event.target.value);
  };

  const handlePasswordBlur = (event) => {
    console.log(event.target.value);
  };
  return (
    <div className="mt-2">
      <RouterProvider router={router}>
        <RegisterReactBootstrap></RegisterReactBootstrap>
        {/* <FormExample></FormExample> */}
        {/* <RegisterBootstrap></RegisterBootstrap> */}
      </RouterProvider>
    </div>
  );
}

export default App;
