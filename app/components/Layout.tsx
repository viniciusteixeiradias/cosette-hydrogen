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
  color: #dedbd7;
  overflow-x: hidden;
`;

const AppBar = styled.div`
  display: flex;
  align-items: center;
  padding-inline: 1rem;
  height: 60px;
  font-size: 1.5rem;
  border-style: solid;
  border-color: rgb(51, 55, 57);
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
  width: 100vw;
  display: flex;
  justify-content: center;
`;
