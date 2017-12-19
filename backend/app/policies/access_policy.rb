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
        obj.friends.include?(usr) && obj.merge_code.nil?
      end
      can :update, User do |obj, usr|
        obj==usr || (obj.friends.include?(usr) && obj.merge_code.nil?)
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
        can? :read, obj.travel
      end
      can [:update,:destroy,:create], Cost do |obj,usr|
        can? :update, obj.travel
      end
      # Shares
      can :read, Share do |obj,usr|
        can? :read, obj.cost
      end
      can [:update,:destroy,:create], Share do |obj,usr|
        can? :update, obj.cost
      end
    end
  end
end
