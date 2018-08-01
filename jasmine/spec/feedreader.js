/* feedreader.js
*
* This is the spec file that Jasmine will read and contains
* all of the tests that will be run against your application.
*/

/* We're placing all of our tests within the $() function,
* since some of these tests may require DOM elements. We want
* to ensure they don't run until the DOM is ready.
*/
$(function() {
  /**
  * @description Test suite for the RSS feeds definitions.
  */
  describe('RSS Feeds', function() {
    /**
    * @description make sure that the allFeeds variable has been defined
    * and that it is not empty.
    */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /**
    * @description Loops through each feed in the allFeeds object and
    * ensures it has a URL defined and that the URL is not empty.
    */
    it('has url', function() {
      allFeeds.forEach(function(feed){
        expect(feed.url).toBeDefined();
        expect(feed.url).not.toBe(0);
        expect(feed.url).not.toBe('');
      })
    });

    /**
    * @description Loops through each feed in the allFeeds object and
    * ensures it has a name defined and that the name is not empty.
    */
    it('has name', function() {
      allFeeds.forEach(function(feed){
        expect(feed.name).toBeDefined();
        expect(feed.name).not.toBe(0);
        expect(feed.name).not.toBe('');
      })
    });
  });

  /**
  * @description Test suite for menu element behaviors.
  */
  describe('The menu', function() {
    /**
    * @description Ensures the menu element is hidden by default.
    */
    it('is hidden', function() {
      const menu = document.body;
      expect(menu.classList).toContain('menu-hidden');
    });

    /**
    * @description Ensures the menu changes visibility when the menu icon
    * is clicked.
    */
    it('is changing', function() {
      const menu = document.body;
      const menuIcon = document.querySelector('.menu-icon-link');

      menuIcon.click();
      expect(menu.classList).not.toContain('menu-hidden');
      menuIcon.click();
      expect(menu.classList).toContain('menu-hidden');
    });
  });

  /**
  * @description Test suite for the "Initial Entries" on feed.
  */
  describe('Initial Entries', function() {
    /**
    * @description Before each test, call the asynchronous function loadFeed.
    */
    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });

    /**
    * @description Ensures when the loadFeed function is called and completes
    * its work, there is at least a single .entry element within the .feed
    * container.
    */
    it('has at last a single entry', function(done) {
      const feedEntries = document.querySelectorAll('.feed .entry');

      expect(feedEntries.length).toBeGreaterThan(0);
      done();
    });
  });

  /**
  * @description Test suite for "New Feed Selection" behaviors.
  */
  describe('New Feed Selection', function() {
    /**
    * @description Sets the two states of feed to comparison.
    */
    let feed1, feed2;

    /**
    * @description Before each test, call the asynchronous function loadFeed,
    * one time to load a feed state with the contents of index 0, and one more
    * time to load another feed state with the contents of index 1.
    */
    beforeEach(function(done) {
      loadFeed(0, function() {
        feed1 = document.querySelector('.feed').innerHTML;

        loadFeed(1, function() {
          feed2 = document.querySelector('.feed').innerHTML;
          done();
        });
      });
    });

    /**
    * @description Ensures when a new feed is loaded by the loadFeed function
    * that the content actually changes.
    */
    it('is loaded', function(done) {
      expect(feed1).not.toBe(feed2);
      done();
    });
  });
}());
