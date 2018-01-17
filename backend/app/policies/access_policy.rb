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
      can :sendmail, User do |obj,usr|
        obj.mergable?
      end
      can :merge, User do |obj,usr|
        obj.mergable? && !obj.loggable?
      end
      can :destroy, User do |obj,usr|
        usr.friends.include?(obj) && !obj.loggable?
      end
      can :update, User do |obj, usr|
        obj==usr || (usr.friends.include?(obj) && !obj.loggable?)
      end
      # Travel
      can :read, Travel do |obj,usr|
        obj.user==usr || obj.group.users.include?(usr)
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
        obj.users.include?(usr)
      end
      can :update, Group do |obj,usr|
        obj.travel.user==usr
      end
      # Costs
      can :read, Cost do |obj,usr|
        obj.travel.user==usr || obj.travel.group.users.include?(usr)
      end
      can [:update,:destroy,:create], Cost do |obj,usr|
        obj.travel.user==usr
      end
      # Shares
      can :read, Share do |obj,usr|
        obj.cost.travel.user==usr || obj.cost.travel.group.users.include?(usr)
      end
      can [:update,:destroy,:create], Share do |obj,usr|
        obj.cost.travel.user==usr
      end
    end
  end
end
