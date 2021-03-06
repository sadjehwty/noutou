# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180118101327) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "costs", force: :cascade do |t|
    t.string "name"
    t.datetime "when"
    t.bigint "travel_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["travel_id"], name: "index_costs_on_travel_id"
  end

  create_table "friendships", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "friend_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["friend_id"], name: "index_friendships_on_friend_id"
    t.index ["user_id"], name: "index_friendships_on_user_id"
  end

  create_table "participants", force: :cascade do |t|
    t.bigint "travel_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["travel_id"], name: "index_participants_on_travel_id"
    t.index ["user_id"], name: "index_participants_on_user_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.bigint "user_id"
    t.string "oauth_token"
    t.datetime "oauth_expires_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_sessions_on_user_id"
  end

  create_table "shares", force: :cascade do |t|
    t.bigint "cost_id"
    t.decimal "value"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["cost_id"], name: "index_shares_on_cost_id"
    t.index ["user_id"], name: "index_shares_on_user_id"
  end

  create_table "travels", force: :cascade do |t|
    t.string "name"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_travels_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "surname"
    t.string "nickname"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "merge_code"
    t.string "uid"
    t.string "provider"
  end

  add_foreign_key "costs", "travels"
  add_foreign_key "friendships", "users"
  add_foreign_key "participants", "travels"
  add_foreign_key "participants", "users"
  add_foreign_key "sessions", "users"
  add_foreign_key "shares", "costs"
  add_foreign_key "shares", "users"
  add_foreign_key "travels", "users"
end
