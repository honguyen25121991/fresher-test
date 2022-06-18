import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "./App.scss";
import Header from "./components/Header";
import { handleRefresh } from "./redux/actions/userAction";
import AppRoute from "./routers/AppRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(handleRefresh());
    }
  }, []);
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <AppRoute />
        </Container>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
