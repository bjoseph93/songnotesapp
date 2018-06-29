class HomeController < ApplicationController
  def show
    @notes = Note.all
  end
end