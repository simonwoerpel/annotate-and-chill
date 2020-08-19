import { action, computed, thunkOn } from 'easy-peasy';

const aboutContent = require('~/pages/about.md');
const helpContent = require('~/pages/help.md');

const PageModel = {
  pages: [
    {
      slug: 'about',
      title: 'About',
      icon: 'info',
      content: aboutContent,
    },
    {
      slug: 'help',
      title: 'Help',
      icon: 'help',
      content: helpContent,
    },
  ],
  activePage: undefined,
  activeSlug: computed(s => s.activePage?.slug),
  selectPage: action((state, slug) => {
    if (slug) [state.activePage] = state.pages.filter(p => p.slug === slug);
    else state.activePage = undefined;
  }),

  // hide page on other actions
  hidePages: thunkOn(
    (_, { document }) => document.clear,
    actions => actions.selectPage(undefined)
  ),
};

export default PageModel;
