import "./App.css";
import MoviesPage from "./pages/MoviesPage";
import ActorsPage from "./pages/ActorsPage";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <>
      <ActorsPage />
      {/* <MoviesPage /> */}
    </>
  );
}

export default App;
