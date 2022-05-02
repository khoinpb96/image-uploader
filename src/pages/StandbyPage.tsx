import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useRef } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Title from "../components/Title";
import { storage } from "../firebase.config";

function StandbyPage(props: any) {
  const { setState, setPercent, setImgURL } = props.setters;
  const inputRef = useRef<HTMLInputElement>(null);

  const fileInputHandler = (e: any) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, file.name);
    const res = uploadBytesResumable(storageRef, file);

    res.on(
      "state_changed",
      (snapshot: any) => {
        setState("uploading");
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercent(progress);
      },
      (error: any) => {
        console.log(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(storageRef);
        setImgURL(downloadURL);
        setState("finished");
        console.log(downloadURL);
      }
    );
  };

  const buttonClickHandler = () => {
    inputRef?.current?.click();
  };

  return (
    <>
      <Title textAlign="center">Upload your image</Title>
      <Subtitle textAlign="center">File should be Jpeg, Png, ...</Subtitle>
      <Uploader>
        <Para2>Drag & Drop your image here</Para2>
      </Uploader>
      <Para textAlign="center">Or</Para>
      <Button onClick={buttonClickHandler}>Choose a file</Button>
      <FileInput
        ref={inputRef}
        type="file"
        name="image-upload"
        accept=".jpeg,.img,.svg,.png"
        onChange={fileInputHandler}
      />
    </>
  );
}

type SubtitleProps = {
  textAlign?: "start" | "end" | "center";
};

const Subtitle = styled.div<SubtitleProps>`
  font-size: 10px;
  line-height: 15px;
  color: #828282;
  text-align: ${(props) => props.textAlign || ""};
`;

const Uploader = styled.div`
  width: 338px;
  height: 218.9px;
  background: #f6f8fb url("./assets/image.svg") no-repeat;
  background-position: bottom 80px right 50%;
  border: 1px dashed #97bef4;
  border-radius: 12px;

  position: relative;
`;

type ParaProps = {
  textAlign?: "start" | "end" | "center";
};

const Para = styled.p<ParaProps>`
  font-size: 12px;
  line-height: 18px;
  color: #bdbdbd;
  text-align: ${(props) => props.textAlign || ""};
`;

const Para2 = styled(Para)`
  position: absolute;
  bottom: 38px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
`;

const FileInput = styled.input`
  display: none;
`;

export default StandbyPage;
