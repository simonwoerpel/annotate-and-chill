import React from 'react';
import {
  Image,
  Icon,
  Segment,
  Container,
  Grid,
  Header,
  List,
} from 'semantic-ui-react';

import BmbfLogo from '~/img/logo-bmbf_en.svg';
import PtfLogo from '~/img/logo-ptf.svg';

const Footer = ({ toBottom }) => (
  <Container
    fluid
    className="Footer"
    style={toBottom ? { position: 'absolute', bottom: 0 } : null}
  >
    <Segment vertical style={{ padding: '5em 0em', color: 'grey' }}>
      <Container>
        <Grid divided stackable>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header
                as="h4"
                content="Annotate & Chill"
                style={{ color: 'grey ' }}
              />
              <p>
                &quot;Annotate &amp; Chill&quot; was created by Simon Wörpel and
                financed by the{' '}
                <a href="https://www.bmbf.de/en/index.html">
                  German Federal Ministry of Education
                </a>{' '}
                and Research as part of their funding for Open-source software
                with the{' '}
                <a href="https://prototypefund.de/en/">Prototype Fund</a>.
              </p>
              <p>
                Simon Wörpel is an investigative data journalist, independent
                researcher and leak librarian. His work is focused on computer
                assisted investigative reporting, document/leak processing and
                data wrangling.
              </p>
              <Header as="h4" content="Contact" style={{ color: 'grey ' }} />
              <List link>
                <List.Item
                  as="a"
                  href="https://github.com/simonwoerpel/annotate-and-chill/"
                >
                  <Icon name="github" />
                  Github
                </List.Item>
                <List.Item as="a" href="https://twitter.com/simonwoerpel">
                  <Icon name="twitter" />
                  @simonwoerpel
                </List.Item>
                <List.Item as="a" mailto="simon.woerpel@medienrevolte.de">
                  <Icon name="mail" />
                  simon.woerpel@medienrevolte.de
                </List.Item>
                <List.Item as="a" href="https://medienrevolte.de">
                  <Icon name="linkify" />
                  medienrevolte.de
                </List.Item>
                <List.Item as="a" href="https://medienrevolte.de/impressum/">
                  <Icon name="legal" />
                  Impress
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={8}>
              <Header as="h4" content="Funding" style={{ color: 'grey' }} />
              <p>
                The project &quot;Annotate &amp; Chill&quot; was funded as part
                of the platform &quot;Boromeo&quot; by the German Ministry of
                Education and Research under the funding reference number
                01IS19S19. The author is responsible for the content of this
                publication.
              </p>
              <Image.Group size="small">
                <Image>
                  <BmbfLogo />
                </Image>
                <Image>
                  <PtfLogo />
                </Image>
              </Image.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </Container>
);

export default Footer;
