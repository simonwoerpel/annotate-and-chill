import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Dropdown, Icon } from 'semantic-ui-react';

const PagesMenu = () => {
  const { pages, activeSlug } = useStoreState(s => s.pages);
  const { selectPage } = useStoreActions(s => s.pages);

  return (
    <Dropdown item icon="bars" simple>
      <Dropdown.Menu>
        {pages.map(({ slug, title, icon }) => (
          <Dropdown.Item
            key={slug}
            active={slug === activeSlug}
            onClick={() => selectPage(slug)}
          >
            <Icon name={icon} />
            {title}
          </Dropdown.Item>
        ))}
        {activeSlug && (
          <>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => selectPage()}>
              <Icon name="angle double left" />
              Back
            </Dropdown.Item>
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default PagesMenu;
