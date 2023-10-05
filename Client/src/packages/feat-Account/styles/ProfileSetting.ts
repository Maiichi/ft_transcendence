import styled from "styled-components";

const CardForm = styled.div`
  width: 65%;
  margin-left: 5px;

  background-color: rgb(255, 255, 255);
  color: rgb(17, 25, 39);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 2px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 32px 24px 10px 32px;
  @media (max-width: 426px) {
    margin: 5px 0px;
    width: 75%;
  }
`
const ButtonAvatar = styled.button`
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  background-color: transparent;
  outline: 0px;
  border: 0px;
  margin: 0px;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-decoration: none;
  font-weight: 600;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 0.875rem;
  line-height: 1.75;
  min-width: 64px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  color: rgb(99, 102, 241);
  width: 100%;
  border-radius: 12px;
  text-transform: none;
  padding: 9px 16px;
  &:hover {
    text-decoration: none;
    background-color: rgba(99, 102, 241, 0.04);
  }
`
const ButtonForm = styled.button`
  border: 0px;
  margin: 0px;
  font-weight: 600;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 0.875rem;
  line-height: 1.75;
  color: rgb(255, 255, 255);
  background-color: rgb(99, 102, 241);
  border-radius: 12px;
  padding: 8px 20px;
  width: fit-content;
  margin-left: auto;
  &:hover {
    text-decoration: none;
    background-color: rgb(67, 56, 202);
    box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 10px;
  }
`

const Divider = styled.hr`
  margin-top: 15px;
  width: -webkit-fill-available;

  border-width: 0px 0px thin;
  border-style: solid;
  border-color: rgb(242, 244, 247);
`
const CardAvatar = styled.div`
  min-width: 85%;
  /* height: fit-content; */
  margin: 5px;
  padding: 32px 24px 6px 32px;
  background-color: rgb(255, 255, 255);
  color: rgb(17, 25, 39);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 2px;
  border-radius: 20px;
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 426px) {
    margin: 5px 0px;
    width: 75%;
  }
`
/**
 * `Setting Cards`
 */
const SettingCards = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
`
/**
 * `PICTURE EDIT`
 */
const PictureEdit = styled.ul`
`
/**
 * `Title` as title element
 */
// const Title = styled.section`
//   padding: 20px 0 10px 0;
//   margin-bottom: 0px;
//   text-align: center;
//   font-family: "Plus Jakarta Sans", sans-serif;
//   letter-spacing: 3px;
//   font-weight: 700;
//   line-height: 1.2;
//   font-size: 2rem;
//   border-top: 1px solid;
// `


/**
 * styled Components exporting >/
 */
export {
    SettingCards,
    CardAvatar,
    Divider,
    ButtonAvatar,
    CardForm,
    ButtonForm,
    PictureEdit
} 
