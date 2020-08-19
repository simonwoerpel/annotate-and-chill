import React from 'react';
import { useStoreActions } from 'easy-peasy';
import { Breadcrumb, Divider, Segment } from 'semantic-ui-react';

const HtmlContent = ({ html }) => (
  <p dangerouslySetInnerHTML={{ __html: html }} /> // eslint-disable-line
);

const Page = ({ page }) => {
  const { selectPage } = useStoreActions(s => s.pages);
  return (
    <Segment className="Page">
      <Breadcrumb>
        <Breadcrumb.Section link onClick={() => selectPage()}>
          A &amp; C
        </Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section active>{page.title}</Breadcrumb.Section>
      </Breadcrumb>
      <Divider />
      <HtmlContent html={page.content} />
    </Segment>
  );
};

export default Page;
