export function Layout({children, title}) {
  return (
    <div>
      <header>
        <div>
          <a href="/">{title}</a>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
