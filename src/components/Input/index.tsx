import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react";
import styled from "styled-components";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  error?: any;
  isError?: boolean;
  bg?: string;
  numberPad?: boolean;
}

const Input = ({ error, isError, ...rest }: Props, ref: any) => {
  return (
    <>
      {/* @ts-ignore */}
      <InputWrapper {...rest} error={isError} ref={ref} />
      {isError ? <span>{error?.message}</span> : null}
    </>
  );
};

export default forwardRef(Input);

// ------- style declerations --------
const InputWrapper = styled.input`
  min-height: 50px;
  border-radius: 10px;
  display: block;
  border: ${({ error = false }: { error?: boolean }) =>
    error ? "1px solid var(--red)" : "1px solid var(--blue)"};
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 1.125rem;
  color: var(--text-light);
  transition: 0.2s ease-in-out;

  &:focus {
    outline: 1px solid var(--accent-1);
    box-shadow: 0 0 0 2px var(--blue);
  }

  & + span {
    color: var(--red);
    display: block;
    padding-top: 0.5rem;
  }
`;
