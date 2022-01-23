import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteTag({ category }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseNo = () => {
        setOpen(false);
    };

    const handleCloseYes = () => {
        const url = "/todos/tag/delete"
        const token = document.querySelector('meta[name="csrf-token"]').content
        fetch(url, {
            method: "DELETE",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error("Network response was not ok")
            })
            .then(response => {
                console.log(response)
                window.location.reload()
            })
            .catch(() => console.log("Error"))
    }

    return (
        <div>
            <Button color="error" variant="outlined" onClick={handleClickOpen}>
                Delete Category
            </Button>
            <Dialog
                open={open}
                onClose={handleCloseNo}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete Tag"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This will just delete the {category.tag} tab,
                        your tasks will still remain. Do you wish to proceed?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseNo}>No</Button>
                    <Button onClick={handleCloseYes} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
