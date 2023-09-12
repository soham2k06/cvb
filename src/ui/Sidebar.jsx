import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";
import { useState } from "react";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3.2rem;
`;

const StyledDevToolsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const StyledDevTools = styled.div`
  display: flex;
  gap: 1rem;
`;

function Sidebar() {
  const [isDev, setIsDev] = useState(false);
  return (
    <StyledSidebar>
      <div>
        <Logo />
        <MainNav />
      </div>
      <StyledDevToolsContainer>
        {isDev && <Uploader />}
        <StyledDevTools>
          <p>Are you developer?</p>
          <label className="switch">
            <input type="checkbox" onChange={() => setIsDev((prev) => !prev)} />
            <span className="slider round"></span>
          </label>
        </StyledDevTools>
      </StyledDevToolsContainer>
    </StyledSidebar>
  );
}

export default Sidebar;
