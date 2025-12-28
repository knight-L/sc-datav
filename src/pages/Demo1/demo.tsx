import styled from "styled-components";
import Panel from "./panel";
import Map from "./map";

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

export default function Index() {
  return (
    <Wrapper>
      <Map />
      <Panel />
    </Wrapper>
  );
}
