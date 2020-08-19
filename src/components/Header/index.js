import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Button, Icon, Menu } from 'semantic-ui-react';

import Profile from '~/components/Profile';
import PagesMenu from '~/components/Page/PagesMenu';
import CsvExporter from '~/components/Annotations/CsvExporter';

const Header = () => {
  const { file } = useStoreState(s => s.document.data);
  const annotations = useStoreState(s => s.annotations.current);
  const { clear } = useStoreActions(s => s.document);
  const toggleImporter = useStoreActions(s => s.ui.importer.toggle);

  return (
    <Menu>
      <Menu.Item header>Annotate &amp; chill</Menu.Item>
      {file?.name && (
        <>
          <Menu.Item>
            <Icon name="pdf file" />
            <Button icon labelPosition="right" onClick={clear}>
              {file.name}
              <Icon name="close" />
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
