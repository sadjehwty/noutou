class AccessPolicy
  include AccessGranted::Policy

  def configure
    # Example policy for AccessGranted.
    # For more details check the README at
    #
    # https://github.com/chaps-io/access-granted/blob/master/README.md
    #
    # The base role with no additional conditions.
    # Applies to every user.
    role :guest do
     # User
     can :read, User
     can :seach, User
     can :create, User
     can :merge, User do |obj,usr|
       !obj.merge_code.nil?
     end
     can :destroy, User do |obj,usr|
       obj.friends.contains?(usr) && obj.merge_code.nil?
     end
     can :update, User do |obj, usr|
       obj==usr || (obj.friends.contains?(usr) && obj.merge_code.nil?)
     end
     # Travel
     can :read, Travel do |obj,usr|
       obj.user==usr || obj.group.users.contains?(usr)
     end
     can :create, Travel
     can :update, Travel do |obj,usr|
       obj.user==usr
     end
     can :destroy, Travel do |obj,usr|
       obj.user==usr && obj.group.users.count == 1
     end
     # Group
     can :read, Group do |obj,usr|
       obj.users.contains?(usr)
     end
     can :update, Group do |obj,usr|
       obj.travel.user==usr
     end
    end
  end
end
