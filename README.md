Welcome to the RationalReads codebase! Below, you can see a list of bugs, design flaws, features to be implemented in the next release, and possible other features which may eventually be added.

Most of the code unique to this app can be found in one of two places -
[app/assets/javascript](https://github.com/Amit-P-Amin/RationalReads/tree/master/app/assets/javascripts), which contains the majority of the client-side code, and [app/models](https://github.com/Amit-P-Amin/RationalReads/tree/master/app/models), which contains the majority of the server-side code.

The entire project was written using the Ruby on Rails framework.

The client side code was written using backbone, a javascript library which helps create a single-page app and more easily manage data on the client-side.

If you want to contribute to this project, I will bless your soul. Or if you don't believe in souls, I will put in a good word for you with the AI god when the singularity happens.

# Disabled Features
1.  Replying to a comment sends an email to the parent comment author
2.  Follow / unfollow and email notification on chapter add
3.  User ratings page

# Possible features
1.  Like comments
2.  Karma
3.  Sequels / Series
4.  Author Functionality
5.  Lists
6.  Add group id to tags, (e.g. group 1 to completion status, group 2 to genre) to help organize tag display
7.  Work delete functionality
8.  User pages need the ability to recommend users to other users (based on similarity of ratings), and then also to follow the user
9.  When a user updates or creates a rating on the work show page, the rating bars and rating numbers get updated (not just averages and counts)
