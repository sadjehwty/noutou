class AccessPolicy
  include AccessGranted::Policy

  def configure
    # Example policy for AccessGranted.
    # For more details check the README at
    #
    # https://github.com/chaps-io/access-granted/blob/master/README.md
    #
    # Roles inherit from less important roles, so:
    # - :admin has permissions defined in :member, :guest and himself
    # - :member has permissions from :guest and himself
    # - :guest has only its own permissions since it's the first role.
    #
    # The most important role should be at the top.
    # In this case an administrator.
    #
    # role :admin, proc { |user| user.admin? } do
    #   can :destroy, User
    # end

    # More privileged role, applies to registered users.
    #
    # role :member, proc { |user| user.registered? } do
    #   can :create, Post
    #   can :create, Comment
    #   can [:update, :destroy], Post do |post, user|
    #     post.author == user
    #   end
    # end

    # The base role with no additional conditions.
    # Applies to every user.
    role :guest do
     can :read, User
     can :seach, User
     can :merge, User do |obj,usr|
       !obj.merge_code.nil?
     end
     can :destroy, User do |obj,usr|
       obj.friends.contains?(usr) && obj.merge_code.nil?
     end
     can :update, User do |obj, usr|
       obj.id==usr.id || (obj.friends.contains?(usr) && obj.merge_code.nil?)
     end
    end
  end
end
