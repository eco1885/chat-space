# README
# DB設計

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique: true|
|mail|string|null: false|

### Association
- has_many :members
- has_many :messages
- has_many :groups, through: :members

## groupsテーブル

|Column|Type|Option|
|------|----|------|
|name|string|null: false, unique: true|

### Association
- has_many :messages
- has_many :members
- has_many :users, through: :members

## messagesテーブル

|Column|Type|Option|
|------|----|------|
|content|string||
|image|string||
|group_id|integer|null: false, foreign_key:true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


## membersテーブル
|Column|Type|Oprions|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true, add_index|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

