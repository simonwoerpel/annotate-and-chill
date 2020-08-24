import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Container } from 'semantic-ui-react';

import Header from '~/components/Header';
import Footer from '~/components/Footer';
import DocumentLoader from '~/components/DocumentLoader';
import DocumentViewer from '~/components/DocumentViewer';
import AnnotationForm from '~/components/Annotations/AnnotationForm';
import CsvImporter from '~/components/Annotations/CsvImporter';
import ImporterModal from '~/components/Annotations/ImporterModal';

const App = () => {
  const { file } = useStoreState(s => s.document.data);
  const showForm = useStoreState(s => s.ui.annotationForm.show);
  const showImporter = useStoreState(s => s.ui.importer.show);
  const toggleImporter = useStoreActions(s => s.ui.importer.toggle);

  return (
    <>
      <Container>
        <Header />
        {showForm && <AnnotationForm />}
        {file ? <DocumentViewer file={file} /> : <DocumentLoader />}
        <ImporterModal open={showImporter} setOpen={toggleImporter}>
          <CsvImporter />
        </ImporterModal>
      </Container>
      <Footer toBottom={!file} />
    </>
  );
};

export default App;
