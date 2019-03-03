import React, { Component, Fragment } from 'react'
import { MDBRow, MDBChip } from 'mdbreact'

class FileInput extends Component {

    renderFile = (file) => {
        let reader = new FileReader();
        let url = "";
        reader.readAsDataURL(file);
        reader.onload = event => {
            url = reader.result;
        }
        return url;
    }

    render() {
        const { fileInputHandler, images, handleRemove, handleRemovePicture, pictures } = this.props;
        return (
            <Fragment>
                <input type="file" onChange={fileInputHandler} multiple />
                <MDBRow className="mt-5">
                    {pictures.map(picture => (
                        <MDBChip
                            close handleClose={() => handleRemovePicture(picture)}
                            key={picture.id} size="md" src={picture.url} alt="Contact Person" waves>
                        </MDBChip>
                    ))}
                    {images.map(image => (
                        <MDBChip
                            close handleClose={() => handleRemove(image.id)}
                            key={image.id} size="md" src={this.renderFile(image.file)} alt="Contact Person" waves>
                            {image.file.name}
                        </MDBChip>
                    ))}
                </MDBRow>
            </Fragment>
        )
    }
}

export default FileInput