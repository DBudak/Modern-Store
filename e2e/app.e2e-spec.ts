import { ModernshopPage } from './app.po';

describe('modernshop App', function() {
  let page: ModernshopPage;

  beforeEach(() => {
    page = new ModernshopPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
