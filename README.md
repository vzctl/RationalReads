== README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


Please feel free to use a different markup language if you do not plan to run
<tt>rake doc:app</tt>.

# Issues
1.  In both work_index and work_read, many functions duplicated
2.  In Your Bookshelf, the items are sorted by avg rating rather than your rating
3.  Instead of replacing starts with, e.g. "Rating updating!", just flash it instead (so, gone, updated, back)
4.  Limit number of characters displayed in read_item and full_item
7.  Increment # of comments on show page when a user submits a comment
8.  Fetch all books once for entire site, instead of multiple times for each collection
9.  Not interested button (to filter recommendations)
10. Not doing bayesian average
11. Raty not working fully on front page
12. Add about page

#Features
1. Tags
2. Chapter
3. Use amazon api to populate work form from search bar


# Display Ideas
1. Logo
2. Navbar styling

#Refactor ideas
1. Loop through errors (copy from work_form.js), perhaps make global function
2. Combine templates / add folder
3. Rename files and names to be consistent
4. Maybe merge style and type in works options hash
5. Re-organize css files
6. Go over html element naming, establish convention
