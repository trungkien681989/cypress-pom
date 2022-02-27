import NavigatorPage from '../../pages/navigator/navigator-page';
import PreLoginValidators from '../../validators/pre-login/prelogin-validators';
import CommonValidators from '../../validators/common/common-validators';
import CommonPage from '../../pages/common/common-page';

const commonPage = new CommonPage();
const navigatorPage = new NavigatorPage();
const preLoginValidators = new PreLoginValidators();
const commonValidators = new CommonValidators();

describe('Pre-Login', () => {
  beforeEach(() => {
    commonPage.setDefaultViewport('default');
  });

  it('Visit Site', () => {
    navigatorPage.navigateToSite();
  });

  it('Validate Pre-Login Sections', () => {
    preLoginValidators.validatePreLoginHeroSection();
    preLoginValidators.validatePreLoginSolutionsSection();
    preLoginValidators.validatePreLoginMarketingSection();
    preLoginValidators.validatePreLoginJustSoldSection();
    preLoginValidators.validatePreLoginSimpleHeadlineSection();
    preLoginValidators.validatePreLoginWaterfallSection();
    preLoginValidators.validatePreLoginNewsSection();
  });

  it('Validate Hero Section text', () => {
    commonValidators.validateText('WELCOME TO MANHEIM');
    commonValidators.validateText('THE WORLD\'S LARGEST WHOLESALE AUTO MARKETPLACE');
    commonValidators.validateText('Sold In The Last 24 Hours');
    commonValidators.validateText('Vehicles For Sale');
  });
});
