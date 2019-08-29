--[[
	// Name:   Extended GroupService
	// Author: Sebastian Erik Bauer (SimplyData)
	// Date:   25/04/2019
--]]
local GroupService = {}
local RbxGroupService = game:GetService("GroupService")

local DEFAULT_ROLE = "Guest"

local function PagesToArray(Pages)
	local Array = {}
	local Length = 0

	while true do
		for _, Value in ipairs(Pages:GetCurrentPage()) do
			Length = Length + 1
			Array[Length] = Value
		end

		if Pages.IsFinished then break end
		pcall(Pages.AdvanceToNextPageAsync, Pages)
	end

	return Array
end

--[[**
	Gets the player's rank in the given group.
	@param [Instance<Player>] Player The player you are checking for. Can also be their UserID.
	@param [Integer] GroupID The ID of the group you are checking rank in.
	@returns [Integer] The player's rank.
**--]]
function GroupService:GetRankInGroupAsync(Player, GroupID)
	for _, Group in ipairs(GroupService:GetGroupsAsync(Player)) do
		if Group.Id == GroupID then
			return Group.Rank
		end
	end

	return 0
end

--[[**
	Gets the player's role in the given group.
	@param [Instance<Player>] Player The player you are checking for. Can also be their UserID.
	@param [Integer] GroupID The ID of the group you are checking role in.
	@returns [String] The player's role.
**--]]
function GroupService:GetRoleInGroupAsync(Player, GroupID)
	for _, Group in ipairs(GroupService:GetGroupsAsync(Player)) do
		if Group.Id == GroupID then
			return Group.Role
		end
	end

	return DEFAULT_ROLE
end

--[[**
	Gets the player's primary group if it exists.
	@param [Instance<Player>] Player The player you are checking for. Can also be their UserID.
	@returns [DictionaryOrNil] The player's primary group if it exists, otherwise nil.
**--]]
function GroupService:GetPrimaryGroupAsync(Player)
	for _, Group in ipairs(GroupService:GetGroupsAsync(Player)) do
		if Group.IsPrimary then
			return Group
		end
	end

	return nil
end

--[[**
	Checks if the player is in the given group.
	@param [Instance<Player>] Player The player you are checking for. Can also be their UserID.
	@param [Integer] GroupID The group you are checking.
	@returns [Boolean] Whether or not the player is in the group.
**--]]
function GroupService:IsInGroupAsync(Player, GroupID)
	for _, Group in ipairs(GroupService:GetGroupsAsync(Player)) do
		if Group.Id == GroupID then
			return true
		end
	end

	return false
end

--[[**
	Checks if the player's primary group is the given group.
	@param [Instance<Player>] Player The player you are checking for. Can also be their UserID.
	@param [Integer] GroupID The group you are checking.
	@returns [Boolean] Whether or not the primary group is the given group.
**--]]
function GroupService:IsPrimaryGroupAsync(Player, GroupID)
	for _, Group in ipairs(GroupService:GetGroupsAsync(Player)) do
		if Group.Id == GroupID and Group.IsPrimary then
			return true
		end
	end

	return false
end

--[[**
	Checks if the given group is an ally of the target group and vice-versa.
	@param [Integer] GroupID The group you are checking.
	@param [Integer] TargetGroupID The group you are checking.
	@returns [Boolean] Whether or not the groups are allies.
**--]]
function GroupService:IsGroupAlly(GroupID, TargetGroupID)
	for _, Group in ipairs(GroupService:GetGroupAlliesAsync(GroupID)) do
		if Group.Id == TargetGroupID then
			return true
		end
	end

	return false
end

--[[**
	Gets an array of the given group's allies.
	@param [Integer] GroupID The group you are checking.
	@returns [Array] All of the group's allies in an array.
**--]]
function GroupService:GetGroupAlliesAsync(GroupID)
	local Success, GroupAlliesPages = pcall(RbxGroupService.GetAlliesAsync, RbxGroupService, GroupID)
	return Success and PagesToArray(GroupAlliesPages) or {}
end

--[[**
	Gets an array of the given player's groups.
	@param [Instance<Player>] Player The player you are checking for. Can also be their UserID.
	@returns [Array] All of the groups the player is in.
**--]]
function GroupService:GetGroupsAsync(Player)
	local UserId = (typeof(Player) == "Instance" and Player:IsA("Player")) and Player.UserId or type(Player) == "number" and Player
	local Success, Groups = pcall(RbxGroupService.GetGroupsAsync, RbxGroupService, UserId)
	return Success and Groups or {}
end

--[[**
	Gets a dictionary of the given group's information.
	@param [Integer] GroupID The group you are checking.
	@returns [Dictionary] The group's information.
**--]]
function GroupService:GetGroupInfoAsync(GroupID)
	local Success, GroupInfo = pcall(RbxGroupService.GetGroupInfoAsync, RbxGroupService, GroupID)
	return Success and GroupInfo or {}
end

return GroupService
