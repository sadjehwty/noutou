export class Travel { 
  user_id: number,
  name: string,
  nickname: string,
  surname: string,
  email: string,
  
  t.string "email"
  t.datetime "created_at", null: false
  t.datetime "updated_at", null: false
  t.string "merge_code"
  t.string "uid"
  t.string "provider"
}
