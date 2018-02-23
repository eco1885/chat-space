class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  validates :content_image, presence: true
  mount_uploader :image, ImageUploader

  private

  def content_image
    content.presence or image.presence
  end

end
