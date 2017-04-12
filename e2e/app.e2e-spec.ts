import { NewsfeedPage } from './app.po';

describe('newsfeed App', () => {
  let page: NewsfeedPage;

  beforeEach(() => {
    page = new NewsfeedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
