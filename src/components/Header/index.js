import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import {
  Button,
  Icon,
  Menu,
  Header as UIHeader,
  Popup,
} from 'semantic-ui-react';

import Profile from '~/components/Profile';
import PagesMenu from '~/components/Page/PagesMenu';
import CsvExporter from '~/components/Annotations/CsvExporter';

const Header = () => {
  const { file } = useStoreState(s => s.document.data);
  const annotations = useStoreState(s => s.annotations.current);
  const { clear } = useStoreActions(s => s.document);
  const toggleImporter = useStoreActions(s => s.ui.importer.toggle);
  const overflow = file?.name.length > 40;
  const fileName = overflow ? `${file?.name.slice(0, 40)}...` : file?.name;
  const renderedFilename = (
    <UIHeader className="Header__filename">{fileName}</UIHeader>
  );

  return (
    <Menu className="Header">
      <Menu.Item header>Annotate &amp; chill</Menu.Item>
      {file?.name && (
        <>
          <Menu.Item>
            {overflow ? (
              <Popup
                content={file.name}
                trigger={renderedFilename}
                position="bottom center"
              />
            ) : (
              renderedFilename
            )}
          </Menu.Item>
          <Menu.Item>
            <Button icon labelPosition="right" onClick={clear}>
              New
              <Icon name="pdf file" />
            </Button>
          </Menu.Item>
          <Menu.Item>
            <CsvExporter data={annotations} />
          </Menu.Item>
          <Menu.Item>
            <Button primary onClick={() => toggleImporter(true)}>
              <Icon name="upload" /> CSV
            </Button>
          </Menu.Item>
        </>
      )}
      <Menu.Menu position="right">
        <Menu.Item>
          <Profile />
        </Menu.Item>
        <PagesMenu />
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
