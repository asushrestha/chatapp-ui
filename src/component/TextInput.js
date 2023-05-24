import React, { useEffect, useRef, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import { fetchMessagesByChatRoomId, sendMessageToSocket } from '../slice/chatRoom/roomSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
const useStyles = makeStyles((theme) =>
    createStyles({
        wrapForm: {
            display: "flex",
            justifyContent: "center",
            width: "95%",
            margin: `${theme.spacing(0)} auto`
        },
        wrapText: {
            width: "100%"
        },
        button: {
            //margin: theme.spacing(1),
        },
    })
);


export const TextInput = ({ chatId }) => {
    const [plainText, setPlainText] = useState('');
    const dispatch = useDispatch();
    const ref = useRef('');
    const handleSendSocketMessage = (e) => {
        e.preventDefault();
        console.log(JSON.stringify(plainText))
        console.log(chatId)
        
        dispatch(sendMessageToSocket({ chatId, plainText })).unwrap()
        .then(()=>{

        })
        setPlainText('')



    }
    useEffect(()=>{
        setPlainText('')
    },[dispatch])
    const data = useSelector((state) => state);
    console.log(data)


    const classes = useStyles();

    return (
        <>
            <form className={classes.wrapForm} noValidate autoComplete="off" onSubmit={handleSendSocketMessage}>
                <TextField
                
                    id="standard-text"
                    label="Enter your text"
                    className={classes.wrapText}
                    name='plainText'
                    value={plainText}
                    onChange={(e) => setPlainText(e.target.value)                   
                    }
                //margin="normal"
                />
                <Button variant="contained" color="primary" className={classes.button} type='submit'>
                    <SendIcon />
                </Button>
            </form>
        </>
    )
}