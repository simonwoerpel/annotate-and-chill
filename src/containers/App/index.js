import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Container } from 'semantic-ui-react';

import Header from '~/components/Header';
import Page from '~/components/Page';
import DocumentLoader from '~/components/DocumentLoader';
import DocumentViewer from '~/components/DocumentViewer';
import AnnotationForm from '~/components/Annotations/AnnotationForm';
import CsvImporter from '~/components/Annotations/CsvImporter';
import ImporterModal from '~/components/Annotations/ImporterModal';

const App = () => {
  const { file } = useStoreState(s => s.document.data);
  const { activePage } = useStoreState(s => s.pages);
  const showForm = useStoreState(s => s.ui.annotationForm.show);
  const showImporter = useStoreState(s => s.ui.importer.show)
  const toggleImporter = useStoreActions(s => s.ui.importer.toggle)

  return (
    <Container>
      <Header />
      {activePage ? (
        <Page page={activePage} />
      ) : (
        <>
          {showForm && <AnnotationForm />}
          {file ? <DocumentViewer file={file} /> : <DocumentLoader />}
        </>
      )}
      <ImporterModal open={showImporter} setOpen={toggleImporter}>
        <CsvImporter />
      </ImporterModal>
    </Container>
  );
};

export default App;
