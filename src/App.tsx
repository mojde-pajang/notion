import { nanoid } from "nanoid";
import { Page } from "./Page/Components";
import { AppStateProvider } from "./store/AppStateContext";
import { Routes, Route } from "react-router-dom";

function App() {
  const createPage = () => {
    return {
      title: "untitled",
      id: nanoid(),
      slug: nanoid(),
      nodes: [],
      cover: "",
    };
  };

  const Login = () => {
    return <div>Login</div>;
  };

  const initialPage = createPage();
  return (
    <AppStateProvider initialPage={initialPage}>
      <div>
        <Routes>
          <Route path="/" element={<Page />} />
          <Route path="/page/:id" element={<Page />} />
          <Route path="/auth" element={<Login />} />
        </Routes>
      </div>
    </AppStateProvider>
  );
}

export default App;
