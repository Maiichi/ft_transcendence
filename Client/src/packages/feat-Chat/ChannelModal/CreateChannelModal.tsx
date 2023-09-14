import  { useContext, useEffect, useState } from 'react'
import { Add, Close, LockSharp, LockOpenSharp } from '@mui/icons-material'
import { Box, Modal } from '@mui/material';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import './createChannelModal.css'
import { useSocket } from '../../../core/socket/socketContext';
import { useAppDispatch, useAppSelector } from '../../../core';
import { createRoom } from '../components/rooms/chatThunk';
import { Socket } from 'socket.io-client';


export const CreateChannelModal = () => {
    const dispatch = useAppDispatch();
    const account = useAppSelector((state) => state.auth.user);
    const [open, setOpen]                 = useState(false);
    const [activate, setActivate]         = useState(false);
    const [roomName, setRoomName]         = useState('');
    const [roomDesc, setRoomDesc]         = useState('');
    // const [roomPrivacy, setRoomPrivacy]   = useState(false);
    const [roomPassword, setRoomPassword] = useState('');
    const [roomCreationError, setRoomCreationError] = useState(null);
    // const [locked, setLocked]       = useState(false);
    const toggleActivate = () => {
        setActivate(!activate);
    };

    const closeModal = () => {
      setOpen(false);
      if (roomCreationError)
        setRoomCreationError(null);
    }

    const socket = useSocket();
    const handleCreateRoom = () => {
      const roomData = {
        name: roomName,
        ownerId: account.intraId,
        description: roomDesc,
        type: activate ? 'private' : 'public',
        password: roomPassword
      };
      dispatch(createRoom({ socket: socket as Socket , room: roomData }))
      .catch((err) => {
        console.log("err ==", err);
      })
      setRoomName('');
      setRoomDesc('');
      setRoomPassword('')
      setOpen(false);
    }

    useEffect(() => {
          if (socket) {
        socket.on('roomCreationError', (data) => {
          if (data && data.message) {
            setRoomCreationError(data.message);
            setOpen(true);
          }
        });
      }
    }, [socket]);

    const AntSwitch = styled(Switch)(({ theme }) => ({
        width: 32,
        height: 20,
        padding: 0,
        display: 'flex',
        '&:active': {
          '& .MuiSwitch-thumb': {
            width: 18,
          },
          '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
          },
        },
        '& .MuiSwitch-switchBase': {
          padding: 2.5,
          '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              opacity: 1,
              backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : 'rgb(178, 163, 201)',
            },
          },
        },
        '& .MuiSwitch-thumb': {
          boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
          width: 15,
          height: 15,
          borderRadius: 6,
          transition: theme.transitions.create(['width'], {
            duration: 200,
          }),
        },
        '& .MuiSwitch-track': {
          borderRadius: 16 / 2,
          opacity: 1,
          backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
          boxSizing: 'border-box',
        },
      }));
    return (
        <div>
            <Add className={"icon-add-channel"} onClick={() => setOpen(true)}/>
            <Modal
                open={open}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={boxStyle}>
                <div>
                    <div className="modalHeader">
                        <h2>Channel Settings</h2>
                        <Close className={"close-button"}/>
                    </div>
                    <div className="modalBody">
                      {/* Display the error message here */}
                        {roomCreationError && (
                          <div className="error-message">{roomCreationError}</div>
                        )}

                        <div className="channelNameHolder">
                            Channel name*
                            <input 
                                className='channel-name-input' 
                                type="text" 
                                placeholder='new-channel'
                                value= {roomName}
                                onChange={(text) => setRoomName(text.target.value)}
                            />
                        </div>
                        <div className="channelDescriptionHolder">
                            Channel Description (optional) 
                            <textarea 
                                className='channel-desc-input' 
                                placeholder='channel description'
                                value= {roomDesc}
                                onChange={(text) => setRoomDesc(text.target.value)}
                            />
                        </div>
                        <div className="channelPrivacyHolder">
                            <div className="passwordHeaderHolder">
                                {
                                   activate ? <LockSharp /> : <LockOpenSharp />
                                }
                                <AntSwitch checked={activate} onChange={toggleActivate} />
                            </div>
                            {activate && (
                                <div className="passwordHolder">
                                password
                                <input
                                    className="channel-password-input"
                                    type="password"
                                    placeholder=""
                                    value={roomPassword}
                                    onChange={(text) => setRoomPassword(text.target.value)}
                                />
                                </div>
                            )}
                        </div>
                    </div>  
                    <div className="modalFooter">
                        <button className='button-cancel' onClick={closeModal}>Cancel</button>
                        <button 
                          className='button-create'
                          onClick={() => handleCreateRoom()}
                        >
                          Create
                        </button>
                    </div>
                </div>
                </Box>
            </Modal>
        </div>
    )
}

const boxStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "20px",
  };