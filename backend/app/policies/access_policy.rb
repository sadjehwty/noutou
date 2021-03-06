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
      # Friendship
      can :read, Friendship do |obj,usr|
        usr.friendships.include? obj
      end
      can :create, Friendship
      can :destroy, Friendship do |obj,usr|
        usr.friendships.include? obj
      end
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
        read_travel? obj,usr
      end
      can :create, Travel
      can :update, Travel do |obj,usr|
        obj.user==usr
      end
      can :destroy, Travel do |obj,usr|
        obj.user==usr && obj.users.count == 1
      end
      # Participant
      can :read, Participant do |obj,usr|
        obj.users.include?(usr)
      end
      can :update, Participant do |obj,usr|
        obj.travel.user==usr
      end
      can :destoy, Participant do |obj,usr|
        empty_share? obj.travel.costs.shares,obj.user
      end
      # Costs
      can :read, Cost do |obj,usr|
        read_cost? obj,usr
      end
      can [:update,:create], Cost do |obj,usr|
        obj.travel.user==usr
      end
      can :destroy, Cost do |obj,usr|
        obj.travel.user==usr && empty_share?(obj.shares,usr)
      end
      # Shares
      can :read, Share do |obj,usr|
        read_cost? obj.cost,usr
      end
      can [:update,:destroy,:create], Share do |obj,usr|
        obj.cost.travel.user==usr
      end
    end
  end
  private
  def read_cost? obj,usr
    read_travel? obj.travel,usr
  end
  def read_travel? obj,usr
    obj.user==usr || obj.users.include?(usr)
  end
  def empty_share? objs, usr
    objs.where('shares.user_id = ?', usr.id).count.zero?
  end
end
