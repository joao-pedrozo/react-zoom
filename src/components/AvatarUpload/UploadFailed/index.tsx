import React from "react";
import styled from "styled-components";

import Image from "../../Image";

const UploadFailedTitle = styled.span`
  font-weight: 400;
  color: #c64d32;
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-shrink: 0;
`;

const TryAgain = styled.a`
  color: #3d485f;
  margin-top: 10px;
  font-weight: 500;
  text-decoration-line: underline;
  cursor: pointer;
`;

const CloseArea = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;

  div {
    height: 15px;
  }

  img {
    cursor: pointer;
  }
`;

const CloseIcon = styled.img`
  width: 12px;
  height: 12px;
`;

interface Props {
  reset: () => void;
}

const UploadFailed = ({ reset }: Props) => {
  return (
    <div className="content-wrapper">
      <Image error={true} />
      <TextWrapper>
        <UploadFailedTitle>Sorry, the upload failed.</UploadFailedTitle>
        <TryAgain onClick={reset}>Try again</TryAgain>
      </TextWrapper>
      <CloseArea>
        <CloseIcon src="/close.svg" onClick={reset} />
      </CloseArea>
    </div>
  );
};

export default UploadFailed;
