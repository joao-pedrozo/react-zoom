import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";

import LogoInteractInfo from "./LogoInteractInfo";
import SelectedImageComponent from "./CropAndSave";
import SavedImage from "./SavedImage";
import UploadFailed from "./UploadFailed";

interface WrapperProps {
  isErrored: boolean;
  isSaved: boolean;
  image: File | null;
}

const Wrapper = styled.div<WrapperProps>`
  margin: 50px auto;
  padding: 32px;
  background: #f2f5f8;
  width: 553px;
  height: 177px;
  ${({ isSaved, image, isErrored }) => `
    ${
      !image || isSaved
        ? css`
            border: 2px dashed #c7cdd3;
          `
        : ""
    }
    ${
      (!image && !isErrored) || isSaved
        ? css`
            cursor: pointer;
          `
        : ""
    }
  `}
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  input {
    display: none;
  }

  .content-wrapper {
    width: 100%;
    display: flex;
  }
`;

const Home = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isErrored, setError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [zoomLevel, setZoomlevel] = useState(1);

  const inputRef = useRef<HTMLInputElement>(null);

  const onClickContainer = () => {
    inputRef.current?.click();
  };

  const isFileValid = (file: File) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (!validTypes.includes(file.type)) return setError(true);

    return true;
  };

  const fileDrop = (e: any) => {
    e.preventDefault();
    const file = e.dataTransfer?.files[0];
    if (file && isFileValid(file)) {
      setImageFile(file);
    }
  };

  const onChangeInput = (ev: React.FormEvent<HTMLInputElement>) => {
    const selectedFile = (ev.target as HTMLInputElement).files?.[0];

    if (selectedFile && isFileValid(selectedFile)) {
      setImageFile(selectedFile || null);
      setIsSaved(false);
      setZoomlevel(1);
    }

    setError(!isFileValid);
  };

  const handleSliderChange = (
    event: React.ChangeEvent<{}>,
    value: number | number[]
  ) => {
    setZoomlevel(value as number);
  };

  const reset = () => {
    setImageFile(null);
    setZoomlevel(1);
    setError(false);
    setIsSaved(false);
  };

  const dragOver = (e: any) => {
    e.preventDefault();
  };

  const dragEnter = (e: any) => {
    e.preventDefault();
  };

  const dragLeave = (e: any) => {
    e.preventDefault();
  };

  const renderChild = () => {
    if (isErrored) return <UploadFailed reset={reset} />;

    if (!isErrored && !imageFile)
      return (
        <LogoInteractInfo inputRef={inputRef} onChangeInput={onChangeInput} />
      );
    if (!isErrored && imageFile && !isSaved)
      return (
        <SelectedImageComponent
          handleSliderChange={handleSliderChange}
          imageFile={imageFile}
          isErrored={isErrored}
          reset={reset}
          zoomLevel={zoomLevel}
          setIsSaved={setIsSaved}
        />
      );
    return (
      <SavedImage
        imageFile={imageFile}
        zoomLevel={zoomLevel}
        inputRef={inputRef}
        onChangeInput={onChangeInput}
      />
    );
  };

  return (
    <Wrapper
      image={imageFile}
      isErrored={isErrored}
      isSaved={isSaved}
      onClick={onClickContainer}
      onDrop={fileDrop}
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
    >
      {renderChild()}
    </Wrapper>
  );
};

export default Home;
