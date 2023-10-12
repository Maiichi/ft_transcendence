import { TextField } from '@mui/material';
import styled from 'styled-components';

export const Search = () => {
  return (
    <Root>
      <Holder>
        <SearchBar>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            style = {{width: '100%', color: 'grey', borderColor: 'red'}}
            InputProps={{
                style: {
                    color: "black"
                }
            }}
            InputLabelProps={{
              style: { color: "black" },
            }}
            FormHelperTextProps={{
              style: {
                color: 'red'
              }
            }}
          />
        </SearchBar>
        <Select name='Channels'>
          <option value="channels">channels</option>
          <option value="users">users</option>
        </Select>
      </Holder>
      <ListHolder>
        <ChannelList>
            Channel
        </ChannelList>
      </ListHolder>
    </Root>
  )
}


const Root = styled.div`
  display: flex; 
  flex-direction: column;
  width : 40%;
  height: 100%;
  margin: auto;
  background-color: green;
`;

const Holder = styled.div`
  display: flex;
  gap: 0.5em;
  align-items: center;
  justify-content: center;
`;

const SearchBar = styled.div`
  width: 80%;
  height: 50px;
  padding: 10px;
  border-radius: 5px;
  position: relative;
`;

const Select = styled.select`
  width: 20%;
  height: 80%;
  border-radius: 5px;
`;

const ListHolder = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  gap: 0.5rem; 
  justify-content: center; 
  align-items: center; 
  width: 100%; 

`;

const UserList = styled.div``;

const ChannelList = styled.div``;

// import { TextField } from '@mui/material';
// import styled from 'styled-components'

// export const Search = () => {
//   return (
//     <Root>
//       <Holder>
//         <SearchBar>
//           <TextField 
//             id="outlined-basic" 
//             label="Search" 
//             variant="outlined" 
//             style={{borderColor: 'grey'}}
//           />
//         </SearchBar>
//         <Select name='Channels'>
//           <option value="channels">channels</option>
//           <option value="users">users</option>
//         </Select>
//       </Holder>
//       <ListHolder>
//         <ChannelList>
//             Channel
//         </ChannelList>
//       </ListHolder>
//     </Root>
//   )
// }


// const Root = styled.div`
//   display: flex; 
//   flex-direction: column;
//   width : 50%;
//   height: 100%;
//   margin: auto;
//   background-color: green;
// `;

// const Holder = styled.div`
//   display: flex;
//   gap: 0.5em;
//   align-items: center;
//   justify-content: center;
// `;

// const SearchBar = styled.div`
// background-color: grey;
//   width: 80%;
//   height: 40px;
//   padding: 10px;
//   border-radius: 5px;
//   position: relative; 
// width: 100%; 
// `;

// const Select = styled.select`
//   width: 20%;
//   height: 80%;
//   border-radius: 5px;
// `;

// const ListHolder = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-top: 10px;
//   gap: 0.5rem; 
//   justify-content: center; 
//   align-items: center; 
//   width: 100%; 

// `;

// const UserList = styled.div``;

// const ChannelList = styled.div``;

