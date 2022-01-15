import React from 'react';
import { Modal, Button} from 'react-bootstrap';

import { useLanguage } from '../../hooks/useLanguage';

export const ChartDeleteModal = (props) => {
	const language = useLanguage();

	return (
		<Modal show={props.show} onHide={props.handleClose} size="lg">
			<Modal.Header closeButton>
				<Modal.Title>{language.currentDictionary.Charts.ChartDeleteModal.Header}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{language.currentDictionary.Charts.ChartDeleteModal.Text}</Modal.Body>
			<Modal.Footer className="d-flex flex-row-reverse">
				<Button variant="secondary" onClick={props.handleClose} className="mx-1">
					{language.currentDictionary.Charts.ChartDeleteModal.CancelButton}
				</Button>
				<Button variant="danger" onClick={props.handleSubmit} className="mx-1">
					{language.currentDictionary.Charts.ChartDeleteModal.DeleteButton}
				</Button>
			</Modal.Footer>
		</Modal>
	);
};