import { nanoid } from "nanoid";
import { Page } from "./Page/Components";
import { AppStateProvider } from "./store/AppStateContext";

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

  const initialPage = createPage();
  return (
    <AppStateProvider initialPage={initialPage}>
      <Page />
    </AppStateProvider>
  );
}

export default App;
