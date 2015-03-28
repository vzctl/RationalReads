desc "This task is called by the Heroku scheduler add-on"
task :update_user_rankings => :environment do
  puts "Updating user points..."
  User.update_points
  puts "done."
end
