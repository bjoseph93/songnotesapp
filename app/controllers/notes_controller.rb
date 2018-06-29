class NotesController < ApplicationController
  def create
    Note.create!(title: params[:params][:title], body: params[:params][:body])
  end

  def index
    @notes = Note.all
    render json: @users
  end

  def update
    Note.update(params[:params][:id], title: params[:params][:title], body: params[:params][:body])
  end

  def destroy
    Note.destroy(params[:id])
  end
end