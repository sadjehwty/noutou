Group::HABTM_Users.create!([
  {group_id: 1, user_id: 1},
  {group_id: 1, user_id: 2},
  {group_id: 1, user_id: 3},
  {group_id: 2, user_id: 2},
  {group_id: 2, user_id: 4},
  {group_id: 2, user_id: 5},
  {group_id: 3, user_id: 1},
  {group_id: 3, user_id: 2},
  {group_id: 3, user_id: 4},
  {group_id: 3, user_id: 5}
])
User::HABTM_Groups.create!([
  {group_id: 1, user_id: 1},
  {group_id: 1, user_id: 2},
  {group_id: 1, user_id: 3},
  {group_id: 2, user_id: 2},
  {group_id: 2, user_id: 4},
  {group_id: 2, user_id: 5},
  {group_id: 3, user_id: 1},
  {group_id: 3, user_id: 2},
  {group_id: 3, user_id: 4},
  {group_id: 3, user_id: 5}
])
Cost.create!([
  {name: "Viaggio", when: "2018-01-16 16:07:00", travel_id: 1},
  {name: "Cena", when: "2018-01-16 16:07:00", travel_id: 1},
  {name: "Viaggio", when: "2018-01-16 16:07:00", travel_id: 2},
  {name: "Tempio", when: "2018-01-16 16:07:00", travel_id: 2},
  {name: "Cena", when: "2018-01-16 16:07:00", travel_id: 3},
  {name: "Auto", when: "2018-01-16 16:07:00", travel_id: 3}
])
Friendship.create!([
  {user_id: 2, friend_id: 2},
  {user_id: 2, friend_id: 1},
  {user_id: 2, friend_id: 3},
  {user_id: 4, friend_id: 4},
  {user_id: 4, friend_id: 2},
  {user_id: 4, friend_id: 5},
  {user_id: 1, friend_id: 1},
  {user_id: 1, friend_id: 2},
  {user_id: 1, friend_id: 4},
  {user_id: 1, friend_id: 5}
])
Group.create!([
  {travel_id: 1},
  {travel_id: 2},
  {travel_id: 3}
])
Session.create!([
  {user_id: 1, oauth_token: "a", oauth_expires_at: "2019-01-16 15:59:00"},
  {user_id: 2, oauth_token: "b", oauth_expires_at: "2019-01-16 15:59:00"},
  {user_id: 4, oauth_token: "c", oauth_expires_at: "2019-01-16 15:59:00"}
])
Share.create!([
  {cost_id: 1, value: "3.0", user_id: 1},
  {cost_id: 1, value: "3.0", user_id: 2},
  {cost_id: 1, value: "4.0", user_id: 3},
  {cost_id: 3, value: "5.0", user_id: 2},
  {cost_id: 3, value: "3.0", user_id: 4},
  {cost_id: 5, value: "2.0", user_id: 1},
  {cost_id: 5, value: "3.0", user_id: 2},
  {cost_id: 5, value: "4.0", user_id: 4},
  {cost_id: 2, value: "1.0", user_id: 1},
  {cost_id: 2, value: "1.0", user_id: 2},
  {cost_id: 4, value: "4.0", user_id: 2},
  {cost_id: 4, value: "3.0", user_id: 5},
  {cost_id: 6, value: "3.0", user_id: 1},
  {cost_id: 6, value: "2.0", user_id: 2},
  {cost_id: 6, value: "4.0", user_id: 4},
  {cost_id: 6, value: "2.0", user_id: 5}
])
Travel.create!([
  {name: "Nihon'12", user_id: 2},
  {name: "Nihon'16", user_id: 4},
  {name: "CND'14", user_id: 1}
])
User.create!([
  {name: "Davide", surname: "Rizzi", nickname: nil, email: "dice@inwind.it", merge_code: nil, uid: "1", provider: "test"},
  {name: "Alessandro", surname: "Pasini", nickname: "Paso", email: "paso82@gmail.com", merge_code: nil, uid: "2", provider: "test"},
  {name: "Claudia", surname: "Pasini", nickname: "Kiriko", email: "kiriko@gmail.com", merge_code: nil, uid: nil, provider: nil},
  {name: "Daniele", surname: "Tiles", nickname: "Last", email: "last.hope@gmail.com", merge_code: nil, uid: "3", provider: "test"},
  {name: "Sara", surname: "Lobosco", nickname: "Teresa", email: "sara@gmail.com", merge_code: nil, uid: nil, provider: nil}
])
