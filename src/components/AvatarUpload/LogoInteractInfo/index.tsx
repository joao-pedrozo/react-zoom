import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  flex-direction: column;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

interface Props {
  inputRef: any;
  onChangeInput: (ev: React.FormEvent<HTMLInputElement>) => void;
}

const LogoInteractInfo = ({ inputRef, onChangeInput }: Props) => {
  return (
    <Wrapper>
      <b>Organization Logo</b>
      <span>Drop the image here or click to browse.</span>
      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={onChangeInput}
      />
    </Wrapper>
  );
};

export default LogoInteractInfo;
