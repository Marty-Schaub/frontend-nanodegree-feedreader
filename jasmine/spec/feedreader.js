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
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         // Loop structure was taken from here: https://stackoverflow.com/questions/32184607/loop-through-it-in-jasmine-describe-output-spec-not-found
        const testParams = allFeeds;

        for (var i = 0; i < testParams.length; i++) {

           (function (testURL) {
             it('each feed has a URL', function () {
               //test code here
               expect (testParams.url).not.toBe('');
             });
           })(testParams[i]);

        };

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        for (var i = 0; i < testParams.length; i++) {

           (function (testName) {
             it('each feed has a Name', function () {
               //test code here
               expect (testParams.name).not.toBe('');
             });
           })(testParams[i]);

        };
    });



//     	/* TODO: Write a new test suite named "The menu" */
    describe("The menu status", function() {
     		const myMenu = document.getElementById('myBody');
  			let myClicks = 0;
  			
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         it("has a default status", function() {

           myMenu.onclick = function() {myFunction()};

           function myFunction (){
             myClicks ++;
           };

           expect(myMenu.className === 'menu-hidden').toBe(true);
           expect (myClicks ===0).toBe(true);
         });



         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it("changes status when clicked", function() {
            const clickMenu = $('a.menu-icon-link');

            clickMenu.trigger('click'); //menu is visible
            expect(myMenu.className ==='menu-hidden').toBe(false);

            clickMenu.trigger('click');//menu is hidden
            expect(myMenu.className ==='menu-hidden').toBe(true);
          });

    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done){

            loadFeed(0,function(){

            	done();
            });

        });
//This is from course mentor Uzair. After many failed attempts
// I looked in the forums for help.
        it("has at least 1 feed", function() {
          expect($('.feed .entry').length).toBeGreaterThan(0);

        });

    });
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         // other than the beforeEach portion, I found this test to be
         // relatively easy as it was just comparing strings
         beforeEach(function(done){

             loadFeed(0,function(){
             		firstFeed =$('.feed').html();
             });
             loadFeed(1, function () {
                newFeed =$('.feed').html();
             		done();
             });

        });

        it("loads a new feed", function() {
          expect(newFeed != firstFeed).toBe(true);

        });

    });

}());
