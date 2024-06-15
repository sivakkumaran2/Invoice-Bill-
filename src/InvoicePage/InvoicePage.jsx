import React, { useState, useEffect, useRef } from "react";
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const styles = {
  root: { 
    width: '210mm', margin: 'auto', marginTop: '2rem', 
    marginBottom: '2rem', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', 
    justifyContent: 'flex-start',
  },
  companyName: { 
    marginBottom: '1rem',  
  }, 
  contentContainer: { 
    display: 'flex', flexDirection: 'row', justifyContent: 'space-between',   width: '100%',
  }, 
  leftContent: { 
    textAlign: 'left', 
    flex: '1',  
  }, 
  rightContent: {  
    textAlign: 'right',  
    flex: '1',
  },
  thanksMessage: { 
    marginTop: '1rem',
  },
  buttonContainer: {
    marginTop: '1rem',
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'space-around', // Adjusted to space around
    width: '100%',
  },
 
  input: { 
    border: 'none', 
    outline: 'none', 
    background: 'transparent', 
    width: '100%', 
    textAlign: 'left', 
    fontSize: '1.1rem',
  },
  alignTop: { 
    verticalAlign: 'top',
  },
  alignLeft: { 
    textAlign: 'left',
  },
  alignRight45: { 
    textAlign: 'right',
    width: '45px', 
  },
  alignRight150: {
    textAlign: 'right',
    width: '150px',
  },
  Add:{
    border:"None",
    outline: 'none', 
    fontSize: '1.1rem',
  },
  textarea: {
    border: 'none',
    outline: 'none',
    background: 'transparent',
    width: '100%',
    fontSize: '1.1rem',
    resize: 'none',
    overflow: 'hidden', 
    lineHeight: '1.5rem', 
  },
};

const InvoicePage = () => {
  const [companyName, setCompanyName] = useState("YourCompanyName");
  const [companyAddress, setCompanyAddress] = useState("123 Your Street");
  const [companyAddress2, setCompanyAddress2] = useState("Your Town");
  const [companyAddress4, setCompanyAddress4] = useState("Address Line 3");
  const [companyAddress5, setCompanyAddress5] = useState("(123) 456 789");
  const [companyAddress6, setCompanyAddress6] = useState("email@yourcompany.com");
  const [companyAddress3, setCompanyAddress3] = useState("Invoice #2334889");
  const [companyAddress7, setCompanyAddress7] = useState("PO 456001200");
  const [companyAddress8, setCompanyAddress8] = useState("Att: Ms. Jane Doe");
  const [companyAddress9, setCompanyAddress9]  = useState("Client Company Name");
  const [companyAddress10, setCompanyAddress10] = useState("Dear Ms. Jane Doe,");
  const [companyAddress11, setCompanyAddress11] = useState("Please find below a cost breakdown for the recent work completed. Please make payment at your earliest .");
  const [companyAddress12, setCompanyAddress12] = useState("Many thanks,");
  const [companyAddress13, setCompanyAddress13] = useState("Your Name");

  const [tableData, setTableData] = useState([
    { description: 'Item 1', quantity: 2, price: 10, total: 20 },
  ]);
  const [subtotal, setSubtotal] = useState(20);
  const [tax, setTax] = useState(2);
  const [total, setTotal] = useState(22);
  const contentRef = useRef(null);
  const [companyAddress14, setCompanyAddress14]  = useState("Many thanks for your custom! I look forward to doing business with you again in due course.");
  const [companyAddress15, setCompanyAddress15]  = useState("Payment terms: to be received within 60 days.");

  useEffect(() => {
    const sub = tableData.reduce((acc, curr) => acc + curr.total, 0);
    const taxAmount = sub * 0.1;
    const totalAmount = sub + taxAmount;
    setSubtotal(sub);
    setTax(taxAmount);
    setTotal(totalAmount);
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      contentRef.current.style.height = `${height}px`;
    }
  }, [tableData]);

  const handleAddRow = () => {
    setTableData([
      ...tableData,
      { description: 'Item 1', quantity: 1, price: 20, total: 20 },
    ]);
  };

  const handleDeleteRow = (index) => {
    const newData = [...tableData];
    newData.splice(index, 1);
    setTableData(newData);
  };

  const handleQuantityChange = (index, newQuantity) => {
    const newData = [...tableData];
    newData[index].quantity = newQuantity;
    newData[index].total = newQuantity * newData[index].price;
    setTableData(newData);
  };

  const handlePriceChange = (index, newPrice) => {
    const newData = [...tableData];
    newData[index].price = newPrice;
    newData[index].total = newPrice * newData[index].quantity;
    setTableData(newData);
  };

  const handleDescriptionChange = (index, newDescription) => {
    const newData = [...tableData];
    newData[index].description = newDescription;
    setTableData(newData);
  };

  const handleGeneratePDF = () => {
    const input = document.getElementById('invoice-content');
    html2canvas(input, { scrollY: -window.scrollY }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgHeight = canvas.height * 208 / canvas.width;
      let position = 0;
      const pageHeight = 297; 
      let leftHeight = imgHeight;
  
      while (leftHeight > 0) {
        pdf.addImage(imgData, 'PNG', 0, position, 208, Math.min(leftHeight, pageHeight));
        leftHeight -= pageHeight;
        position -= 297;
        if (leftHeight > 0) {
          pdf.addPage();
        }
      }
  
      pdf.save("invoice.pdf");
    });
  };

  const handleSaveOnEnter = (e, setterFunction) => {
    if (e.key === 'Enter') {
      setterFunction(e.target.value);
    }
  };

  const handleTextAreaKeyDown = (e, setterFunction) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      e.target.style.height = 'auto';
      e.target.style.height = `${e.target.scrollHeight}px`;
      setterFunction(e.target.value);
    }
  };

  return (
    <div>
      <Paper ref={contentRef} style={styles.root} elevation={3} id="invoice-content">
        <input
          id="Name"
          type="text"
          pattern = "[0-9]"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          onKeyDown={(e) => handleSaveOnEnter(e, setCompanyName)}
          style={{ ...styles.input, textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}
        />

        <div style={styles.contentContainer}>
          <div style={styles.leftContent}>
            <input
              type="text"
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
              onKeyDown={(e) => handleSaveOnEnter(e, setCompanyAddress)}
              style={styles.input}
            />
            <br/>
            <input
              type="text"
              value={companyAddress2}
              onChange={(e) => setCompanyAddress2(e.target.value)}
              onKeyDown={(e) => handleSaveOnEnter(e, setCompanyAddress2)}
              style={styles.input}
            />
            <br />
            <input
              type="text"
              value={companyAddress4}
              onChange={(e) => setCompanyAddress4(e.target.value)}
              onKeyDown={(e) => handleSaveOnEnter(e, setCompanyAddress4)}
              style={styles.input}
            />
            <br />
            <br />
            <br />
            <input
              type="text"
              value={companyAddress5}
              onChange={(e) => setCompanyAddress5(e.target.value)}
              onKeyDown={(e) => handleSaveOnEnter(e, setCompanyAddress5)}
              style={styles.input}
            />
            <br/>
            <input
              type="text"
              value={companyAddress6}
              onChange={(e) => setCompanyAddress6(e.target.value)}
              onKeyDown={(e) => handleSaveOnEnter(e, setCompanyAddress6)}
              style={styles.input}
            />
          </div>
          <div style={styles.rightContent}>
            <input
              id="Add"
              type="text"
              value={companyAddress3}
              onChange={(e) => setCompanyAddress3(e.target.value)}
              onKeyDown={(e) => handleSaveOnEnter(e, setCompanyAddress3)}
              style={styles.Add}
            />
            <br/>
            <input
              id="Add"
              type="text"
              value={companyAddress7}
              onChange={(e) => setCompanyAddress7(e.target.value)}
              onKeyDown={(e) => handleSaveOnEnter(e, setCompanyAddress7)}
              style={styles.Add}
            />
            <br />
            <br />
            <br />
            <input
              id="Add"
              type="text"
              value={companyAddress8}
              onChange={(e) => setCompanyAddress8(e.target.value)}
              onKeyDown={(e) => handleSaveOnEnter(e, setCompanyAddress8)}
              style={styles.Add}
            />
            <br/>
            <input
              id="Add"
              type="text"
              value={companyAddress9}
              onChange={(e) => setCompanyAddress9(e.target.value)}
              onKeyDown={(e) => handleSaveOnEnter(e, setCompanyAddress9)}
              style={styles.Add}
            />
          </div>
        </div>
        <br />
        <br />
        <input
          type="text"
          value={companyAddress10}
          onChange={(e) => setCompanyAddress10(e.target.value)}
          onKeyDown={(e) => handleSaveOnEnter(e, setCompanyAddress10)}
          style={styles.input}
        />
        <br />
        <br />
        <textarea
          value={companyAddress11}
          onChange={(e) => setCompanyAddress11(e.target.value)}
          onKeyDown={(e) => handleTextAreaKeyDown(e, setCompanyAddress11)}
          style={styles.textarea}
        />
        <br/>
        <br />
        <input
          type="text"
          value={companyAddress12}
          onChange={(e) => setCompanyAddress12(e.target.value)}
          onKeyDown={(e) => handleSaveOnEnter(e, setCompanyAddress12)}
          style={styles.input}
        /> 
        <input
          type="text"
          value={companyAddress13}
          onChange={(e) => setCompanyAddress13(e.target.value)}
          onKeyDown={(e) => handleSaveOnEnter(e, setCompanyAddress13)}
          style={styles.input}
        />
        <br/>
        <br/>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell align="right" style={styles.alignRight45}>Quantity</TableCell>
                <TableCell align="right" style={styles.alignRight45}>Price</TableCell>
                <TableCell align="right" style={styles.alignRight150}>Total</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <input
                      type="text"
                      value={row.description}
                      onChange={(e) => handleDescriptionChange(index, e.target.value)}
                      onKeyDown={(e) => handleSaveOnEnter(e, () => handleDescriptionChange(index, e.target.value))}
                      style={styles.input}
                    />
                  </TableCell>
                  <TableCell align="right" style={styles.alignRight45}>
                    <input
                      type="number"
                      value={row.quantity}
                      onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                      onKeyDown={(e) => handleSaveOnEnter(e, () => handleQuantityChange(index, parseInt(e.target.value)))}
                      style={styles.input}
                    />
                  </TableCell>
                  <TableCell align="right" style={styles.alignRight45}>
                    <input
                      type="number"
                      value={row.price}
                      onChange={(e) => handlePriceChange(index, parseInt(e.target.value))}
                      onKeyDown={(e) => handleSaveOnEnter(e, () => handlePriceChange(index, parseInt(e.target.value)))}
                      style={styles.input}
                    />
                  </TableCell>
                  <TableCell align="right" style={styles.alignRight150}>{row.total}</TableCell>
                  <TableCell>
                    <DeleteIcon color="secondary" onClick={() => handleDeleteRow(index)} />
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} align="left">Subtotal</TableCell>
                <TableCell align="right">{subtotal}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3} align="left">GST Tax (10%)</TableCell>
                <TableCell align="right">{tax}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3} align="left">Total</TableCell>
                <TableCell align="right">{total}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <br />
        <input
          type="text"
          value={companyAddress14}
          onChange={(e) => setCompanyAddress14(e.target.value)}
          onKeyDown={(e) => handleSaveOnEnter(e, setCompanyAddress14)}
          style={styles.input}
        />
        <br />
        <br />
        <input
          type="text"
          value={companyAddress15}
          onChange={(e) => setCompanyAddress15(e.target.value)}
          onKeyDown={(e) => handleSaveOnEnter(e, setCompanyAddress15)}
          style={styles.input}
        />
      </Paper>
      <div style={styles.buttonContainer}>
        <Button variant="contained" color="primary"  onClick={handleAddRow}>Add Row</Button>
        <Button variant="contained" color="primary" onClick={handleGeneratePDF}>GET PDF</Button>
      </div>
    </div>
  );
};

export default InvoicePage;
