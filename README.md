Welcome to the RationalReads codebase! Below, you can see a list of bugs, design flaws, features to be implemented in the next release, and possible other features which may eventually be added.

Most of the code unique to this app can be found in one of two places -
[app/assets/javascript](https://github.com/Amit-P-Amin/RationalReads/tree/master/app/assets/javascripts), which contains the majority of the client-side code, and [app/models](https://github.com/Amit-P-Amin/RationalReads/tree/master/app/models), which contains the majority of the server-side code.

The entire project was written using the Ruby on Rails framework.

The client side code was written using backbone, a javascript library which helps create a single-page app and more easily manage data on the client-side.

Although this project uses bootstrap, 1400 lines of css were also written. However, that is the weakest part of the project. In the April release, I will be improving the stylesheets directory.

# Bugs
1.  User getting recommendation results, even when not logged in (was not happening before)


# Features to implement in March release
1.  Add sign-up button on sign-in page (for new users)
7.  Allow passwords to be reset
10.  Instead of checking if a user hasn't followed a work by getting an error response, change the logic in the follows controller and backbone views

# Features/fixes to be implemented
0.  Allow comments to be edited or deleted
1.  In both work_index and work_read, many functions duplicated - DRY out the code
2.  Check if comment sort getting called in home page. If so, remove.
3.  Not interested button on recommendation results (to filter recommendations)
4.  Stop pluralizing comments and ratings when there's only 1 (e.g. 1 comments)
5.  Add global function to fetch and give current user id
6.  Add an onclick event that closes the searchbar and any search items, when outside the search area (currently only on mouseout)
7.  Move chapter controller to api namespace
8.  Move chapter show jbuilder to a partial
9.  For index, am currently fetching entire collection, and then fetching individual pages (double fetching). Improve.
10.  Instead of using pre-wrap, convert newlines to p elements, possibly using a regex
11.  Implement pagination on search pages
12.  Add alt text to search results (from searchForm, not filterForm)
13.  Mention that a user must be logged in to add a work before they click the add button (so they don't waste time)
14.  Add an average_rating column to works table (to avoid having to re-calc average all the time)
15.  User settings page, where their password can be changed and their comment reply setting can be toggled
16.  Instead of sending e-mails inline, add e-mails to queue and create background job to process queue
17.  I would like others to be able to see My Books list and to be able to see others if they allow it. One of the best ways to find good stories is to come across users that share a similar value set and give the stories which they rated high a chance
18.  Make it so that filtering/ordering works through the router (so that 1) users can interact with filtering/ordering through url, and so that the back button works there, and so that it's more clear that the pagination is getting new works)

# Possible features
1.  Like comments
2.  Karma
3.  Sequels / Series
4.  Author Functionality
5.  Lists
6.  Add group id to tags, (e.g. group 1 to completion status, group 2 to genre) to help organize tag display
7.  Work delete functionality
8.  User pages, with information on the works they've rated and ratings they've given, and ability to recommend users to other users (based on similarity of ratings), and then also to follow the user
9.  Follow a work, which sends a ping when a new chapter is added

# Tag ideas
1.  Free-Online
2.  Paid-Online
3.  Free-EBook
4.  Paid-EBook
5.  Hardcopy
