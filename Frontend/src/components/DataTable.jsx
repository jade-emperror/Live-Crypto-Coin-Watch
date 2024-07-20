// src/components/DataTable.jsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Modal, Button, Form, Toast, ToastContainer } from 'react-bootstrap';
import { setProducts, setShowEditModal, setEditableValue, setRowIndex, setToastMessage } from '../state/actions';
import { socket } from '../services/socketClient';
import { addIndex } from '../helpers/addIndex';
import { FaPencilAlt } from 'react-icons/fa';
import { updateCoinSymbol } from '../services/coinService';

function DataTable({ columns }) {
  const products = useSelector((state) => state.products);
  const showEditModal = useSelector((state) => state.ui.showEditModal);
  const editableValue = useSelector((state) => state.ui.editableValue);
  const rowIndex = useSelector((state) => state.ui.rowIndex);
  const toastMessage = useSelector((state) => state.ui.toastMessage);
  const dispatch = useDispatch();

  const getCodeColumnIndex = () => {
    const codeColumn = columns.findIndex(col => col.field === 'code');
    return codeColumn >= 0 ? codeColumn : null;
  };

  const onCellSelect = (row) => {
    const index = getCodeColumnIndex();
    if (index !== null) {
      dispatch(setRowIndex(row));
      dispatch(setEditableValue(products[row]['code']));
      dispatch(setShowEditModal(true));
    }
  };

  const handleSave = async () => {
    const updatedProducts = [...products];
    const currentCode = updatedProducts[rowIndex]['code'];

    try {
      await updateCoinSymbol(currentCode, editableValue);

      updatedProducts[rowIndex]['code'] = editableValue;
      console.log('Updated Products:', updatedProducts);

      dispatch(setProducts(updatedProducts));
      dispatch(setToastMessage({ type: 'info', title: 'Cell Updated', message: `Code Updated to: ${editableValue}` }));

      dispatch(setShowEditModal(false));
    } catch (error) {
      dispatch(setToastMessage({ type: 'warning', title: 'Update Failed', message: error.message }));
    }
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('initCoinLogUpdate', (data) => {
      const updatedProducts = [...addIndex(data)];
      dispatch(setProducts(updatedProducts));
    });

    socket.on('liveCoinLogUpdate', (data) => {
      const updatedProducts = [...addIndex(data)];
      dispatch(setProducts(updatedProducts));
    });

    return () => {
      socket.off('initCoinLogUpdate');
      socket.off('liveCoinLogUpdate');
    };
  }, [dispatch]);

  return (
    <div style={{ margin: '5% 15%', borderRadius: '20px', overflow: 'hidden', boxShadow: '-10px 10px 80px 20px #DAE3EC' }} className="card">
      <ToastContainer position="top-end" className="p-5">
        {toastMessage && (
          <Toast bg={toastMessage.type === 'info' ? 'primary' : 'warning'} onClose={() => dispatch(setToastMessage(null))} delay={3000} autohide>
            <Toast.Header>
              <strong className="me-auto">{toastMessage.title}</strong>
            </Toast.Header>
            <Toast.Body>{toastMessage.message}</Toast.Body>
          </Toast>
        )}
      </ToastContainer>

      <Table striped bordered hover responsive className="custom-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                style={{
                  backgroundColor: '#2e5cb8',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  boxShadow: 'inset 0 -1px 0 rgba(0, 0, 0, 0.2)',
                  padding: '12px',
                  border: "solid #1f3d7a 1px",
                  letterSpacing: "1px"
                }}
              >
                {col.header}
              </th>
            ))}
            <th
              style={{
                backgroundColor: '#2e5cb8',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '14px',
                boxShadow: 'inset 0 -1px 0 rgba(0, 0, 0, 0.2)',
                padding: '12px',
                border: "solid #1f3d7a 1px",
                letterSpacing: "1px"
              }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    fontSize: '14px',
                    transition: 'background-color 0.3s',
                    border: 'solid #DEDEDE 1px'
                  }}
                >
                  {col.field.includes('.')
                    ? col.field.split('.').reduce((o, i) => o[i], product)
                    : product[col.field]}
                </td>
              ))}
              <td
                style={{
                  textAlign: 'center',
                  cursor: 'pointer',
                  border: 'solid #DEDEDE 1px'
                }}
                onClick={() => onCellSelect(rowIndex)}
              >
                <FaPencilAlt style={{fontSize:'1rem',color:'#ffc107'}} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal style={{ marginTop: '15vh' }} show={showEditModal} onHide={() => dispatch(setShowEditModal(false))} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicCode">
              <Form.Label>Code</Form.Label>
              <Form.Control
                type="text"
                value={editableValue}
                onChange={(e) => dispatch(setEditableValue(e.target.value))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch(setShowEditModal(false))}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DataTable;
