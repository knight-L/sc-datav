import styled from "styled-components";
import Map from "./map";
import Panel from "./panel";

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
