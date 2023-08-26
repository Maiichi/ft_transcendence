import React, { useState } from 'react'
import { Add, Close, LockSharp, LockOpenSharp } from '@mui/icons-material'
import { Box, FormControlLabel, Modal } from '@mui/material';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

import './createChannelModal.css'
export const CreateChannelModal = () => {
    const [open, setOpen]           = useState(false);
    const [activate, setActivate]   = useState(false);
    // const [locked, setLocked]       = useState(false);

    const toggleActivate = () => {
        setActivate(!activate);
    };

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
                onClose={() => setOpen(false)}
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
                        <div className="channelNameHolder">
                            Channel name*
                            <input 
                                className='channel-name-input' 
                                type="text" 
                                placeholder='new-channel' 
                            />
                        </div>
                        <div className="channelDescriptionHolder">
                            Channel Description (optional) 
                            <textarea 
                                className='channel-desc-input' 
                                placeholder='channel description' 
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
                                />
                                </div>
                            )}
                        </div>
                    </div>  
                    <div className="modalFooter">
                        <button className='button-cancel' onClick={() => setOpen(false)}>Cancel</button>
                        <button className='button-create'>Create</button>
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