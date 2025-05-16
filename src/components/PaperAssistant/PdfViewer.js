// src/components/PaperAssistant/PdfViewer.js
import React, { useState } from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set up the worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PdfViewer({ file }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  if (!file) {
    return null;
  }

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        PDF Preview
      </Typography>
      
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'auto',
          height: '500px',
        }}
      >
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<p>Loading PDF...</p>}
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            scale={1.2}
          />
        </Document>
      </Box>
      
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 2,
        }}
      >
        <Button
          disabled={pageNumber <= 1}
          onClick={() => changePage(-1)}
          variant="outlined"
          size="small"
        >
          Previous
        </Button>
        <Typography variant="body2">
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </Typography>
        <Button
          disabled={pageNumber >= numPages}
          onClick={() => changePage(1)}
          variant="outlined"
          size="small"
        >
          Next
        </Button>
      </Box>
    </Paper>
  );
}

export default PdfViewer;
