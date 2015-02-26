class BayesianAverage < ActiveRecord::Migration
  def change
    add_column :works, :bayesian_average, :float
  end
end
