import styled from '@emotion/styled';

interface Props {
  children: JSX.Element;
  title: string;
}

export function Layout({children, title}: Props) {
  const customTitle = title.replaceAll('-', ' ');

  return (
    <AppLayout>
      <header>
        <AppBar>
          <AppName href="/">
            <span>{customTitle}</span>
          </AppName>
        </AppBar>
      </header>

      <AppMain>{children}</AppMain>
    </AppLayout>
  );
}

const AppLayout = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #101418;
  color: white;
  overflow: hidden;
`;

const AppBar = styled.div`
  display: flex;
  align-items: center;
  padding-inline: 1rem;
  height: 60px;
  font-size: 1.5rem;
  border-style: solid;
  border-color: rgba(194, 224, 255, 0.08);
  border-width: 0px 0px thin;
  background-color: rgba(16, 20, 24, 0.8);
`;

const AppName = styled.a`
  text-decoration: none;
  text-transform: capitalize;

  & > span {
    color: white;
  }
`;

const AppMain = styled.main`
  height: calc(100vh - 60px);
  width: 100vw;
  display: flex;
  overflow-x: auto;
`;
