import { useTheme } from "./theme/ThemeContext.jsx";

const sizePx = (s) =>
  s === "small" ? "14px" : s === "large" ? "20px" : "16px";

function Layout() {
  const { theme } = useTheme();
  const bg = theme === "light" ? "#ffffff" : "#1a1a1a";
  const color = theme === "light" ? "#000000" : "#ffffff";
  return (
    <div style={{ backgroundColor: bg, color, minHeight: "60vh", padding: 20 }}>
      <Header />
      <Content />
    </div>
  );
}

function Header() {
  return (
    <header style={{ marginBottom: 20 }}>
      <Navigation />
      <Controls />
    </header>
  );
}

function Navigation() {
  const { fontSize } = useTheme();
  return (
    <nav style={{ fontSize: sizePx(fontSize), marginBottom: 10 }}>
      <a href="#home">Home</a> | <a href="#about">About</a> |{" "}
      <a href="#contact">Contact</a>
    </nav>
  );
}

function Controls() {
  return (
    <div>
      <ThemeToggle />
      <FontControl />
    </div>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
}

function FontControl() {
  const { fontSize, setFontSize } = useTheme();
  return (
    <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
      <option value="small">Small</option>
      <option value="medium">Medium</option>
      <option value="large">Large</option>
    </select>
  );
}

function Content() {
  const { fontSize } = useTheme();
  return (
    <main style={{ fontSize: sizePx(fontSize) }}>
      <Article />
      <Sidebar />
    </main>
  );
}

function Article() {
  const { theme } = useTheme();
  return (
    <article>
      <h1>Article Title</h1>
      <p>
        This content uses the <strong>{theme}</strong> theme. No prop drilling
        🎉
      </p>
    </article>
  );
}

function Sidebar() {
  const { theme } = useTheme();
  return (
    <aside style={{ marginTop: 20, padding: 10, border: "1px solid #ccc" }}>
      <h3>Sidebar</h3>
      <p>Current theme: {theme}</p>
    </aside>
  );
}

export default function ThemeDemo() {
  return <Layout />;
}
