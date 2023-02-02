import { css } from "@emotion/react"
import styled from "@emotion/styled"

const border = css`
  border: 1px solid white;
`

const borderRadius = css`
  border-radius: 4px;
`

interface StatModifierContainerProps {
  gridPosition: string
}
export const StatModifierContainer = styled.div<StatModifierContainerProps>`
  ${border}
  ${borderRadius}

  grid-area: ${(props) => props.gridPosition};
  padding: 5px;
  padding-bottom: 0;
  position: relative;
  display: inline-flex;
  justify-content: center;
  flex-wrap: wrap;
`

const commonInputStyles = css`
  display: block;
  height: 2rem;
  background: transparent;
  color: white;
  text-align: center;

  &:focus {
    outline-style: outset;
    outline-offset: -2px;
  }
`

export const StatMainInput = styled.input`
  ${borderRadius}
  ${commonInputStyles}

  width: 100%;
  border: none;
`

export const StatModifierInput = styled.input`
  ${border}
  ${commonInputStyles}

  width: 80%;
  border-bottom: none;
  border-radius: 8px 8px 0 0;
`

export const StatLabel = styled.label`
  width: 100%;
  font-size: 0.65rem;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
