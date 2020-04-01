import React from 'react';
import styled from 'styled-components';

import {Map} from './Map';

const SandboxComp = styled.div`
  height: 100%;
  padding: 100px 50px 50px 50px;
`;
const Wrapper = styled.div`
  height: 100%;
  max-width: 1366px;
  margin: auto;

  flex-grow: 10;
  flex-shrink: 0;
  flex-basis: auto;
  display: flex;
`;
const TableWrapper = styled.div`
  min-width: 33.3%;

  flex-basis: ${props => props.isExpanded ? "66.7%" : "33.3%"};
  transition: flex-basis 500ms ease-in-out;
`;
const MapWrapper = styled.div`
  min-width: 33.3%;

  flex-basis: ${props => props.isExpanded ? "33.3%" : "66.7%" };
  transition: flex-basis 500ms ease-in-out;
`;

export const Sandbox = (props) => {
  return (
    <SandboxComp>
      <Wrapper>
        <TableWrapper />
        <MapWrapper>
          <Map />
        </MapWrapper>
      </Wrapper>
    </SandboxComp>
  )
};