import { Html } from "@react-three/drei";
import styled from "styled-components";
import { useConfigStore } from "../stores";
import type { ComponentProps } from "react";

const Label = styled(Html)`
  pointer-events: none;
  width: max-content;
  display: flex;
  color: #ffffff;
`;

export default function Index(props: ComponentProps<typeof Label>) {
  const mapPlayComplete = useConfigStore((s) => s.mapPlayComplete);

  return mapPlayComplete ? <Label {...props} /> : null;
}
