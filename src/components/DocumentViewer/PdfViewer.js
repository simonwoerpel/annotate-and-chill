import React, { createRef, useRef, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';

import { Document, Page } from 'react-pdf/dist/entry.webpack';
import { Rail } from 'semantic-ui-react';
// import { Waypoint } from 'react-waypoint';
import { Loader } from '~/components/common';
import PdfPageLoader from '~/components/DocumentLoader/PdfPageLoader';
import Annotations from '~/components/Annotations';
import AnnotationLocation from '~/components/Annotations/AnnotationLocation';

import { drawRect, clearCanvas, getRelativeLocation } from '~/util/draw';

import './PdfViewer.scss';
import './DrawRect.scss';

const PdfViewer = ({ options, file }) => {
  const annotations = useStoreState(s => s.annotations.current);
  const { hilighted } = useStoreState(s => s.ui.annotations);
  const { annotationForm, draw } = useStoreActions(s => s.ui);
  const updateRef = useStoreActions(s => s.reference.updateRef);
  const { pagesNum } = useStoreState(s => s.document);
  const { setPagesNum, incrementRenderedPages } = useStoreActions(
    s => s.document
  );
  // const [waypointActive, setWaypointActive] = useState(false);
  const document = createRef();

  const [drawing, setDrawing] = useState({
    isDrawing: false,
    width: null,
    height: null,
    offsetX: null,
    offsetY: null,
    page: 1,
  });
  const drawingRef = useRef(drawing);
  const updateDrawing = data => {
    data = { ...drawingRef.current, ...data };
    drawingRef.current = data;
    setDrawing(data);
  };

  const setupPage = (pageProxy, canvasRef) => {
    const [width, height] = pageProxy._pageInfo.view.slice(2); // eslint-disable-line
    const canvas = canvasRef.current;
    canvas.height = height;
    canvas.width = width;
    const ctx = canvas.getContext('2d');
    const page = document.current.pages[pageProxy.pageIndex];
    page.addEventListener('mousedown', ({ target, offsetX, offsetY }) => {
      if (target === canvas) {
        annotationForm.toggle(false);
        draw.setActiveCanvas(canvas);
        updateDrawing({
          startX: offsetX,
          startY: offsetY,
          endX: offsetX,
          endY: offsetY,
          isDrawing: true,
          page: pageProxy.pageIndex + 1,
          height: target.height,
          width: target.width,
        });
      }
    });
    page.addEventListener(
      'mouseup',
      ({ target, pageX, pageY, offsetX, offsetY }) => {
        if (target === canvas) {
          annotationForm.toggle(true);
          annotationForm.setPosition([pageY, pageX]); // [sic!]
          updateDrawing({ isDrawing: false, endX: offsetX, endY: offsetY });
          updateRef({
            location: getRelativeLocation(drawingRef.current),
            page: drawingRef.current.page,
          });
        }
      }
    );
    page.addEventListener('mousemove', ({ target, offsetX, offsetY }) => {
      if (target === canvas && drawingRef.current.isDrawing) {
        const { startX, startY } = drawingRef.current;
        const x = startX < offsetX ? startX : offsetX;
        const y = startY < offsetY ? startY : offsetY;
        const rectWidth = Math.abs(offsetX - startX);
        const rectHeight = Math.abs(offsetY - startY);
        clearCanvas(canvas);
        drawRect({ ctx, x, y, rectWidth, rectHeight });
      }
    });
    incrementRenderedPages();
  };

  const renderAnnotationLocations = page =>
    annotations
      .filter(({ reference }) => reference.page === page)
      .map(a => (
        <AnnotationLocation
          key={a.id}
          annotation={a}
          hilighted={hilighted === a.id}
        />
      ));

  return (
    <div className="PdfViewer">
      <Document
        ref={document}
        file={file}
        loading={Loader}
        onLoadSuccess={({ numPages }) => setPagesNum(numPages)}
        options={options}
      >
        {Array.from(new Array(pagesNum), (el, index) => {
          const pageNum = index + 1;
          const canvasRef = createRef();
          return (
            <Page
              key={`page_${pageNum}`}
              pageNumber={pageNum}
              loading={Loader}
              onRenderSuccess={p => setupPage(p, canvasRef)}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            >
              <canvas className="DrawRect" ref={canvasRef} />
              {renderAnnotationLocations(pageNum)}
              <Rail position="right">
                <Annotations
                  annotations={annotations.filter(
                    ({ reference }) => reference.page === pageNum
                  )}
                />
              </Rail>
            </Page>
          );
        })}
      </Document>
      <PdfPageLoader />
    </div>
  );
};

export default PdfViewer;
