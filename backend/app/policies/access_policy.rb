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
    end
  end
end
