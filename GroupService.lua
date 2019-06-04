--[[
	// Name:   Extended GroupService
	// Author: Sebastian Erik Bauer (SimplyData)
	// Date:   25/04/2019
--]]
local GroupService = { }
local RbxGroupService = game:GetService("GroupService")

local function PagesToArray(Pages)
	local Array = { }
	while true do
		for _, Value in next, Pages:GetCurrentPage() do Array[#Array + 1] = Value end
		if Pages.IsFinished then break end
		pcall(Pages.AdvanceToNextPageAsync, Pages)
	end
end

function GroupService:GetRankInGroupAsync(Player, GroupID)
	local Groups = GroupService:GetGroupsAsync(Player)
	for Index = 1, #Groups do
		local Group = Groups[Index]
		if Group.Id == GroupID then
			return Group.Rank
		end
	end
	return 0
end

function GroupService:GetRoleInGroupAsync(Player, GroupID)
	local Groups = GroupService:GetGroupsAsync(Player)
	for Index = 1, #Groups do
		local Group = Groups[Index]
		if Group.Id == GroupID then
			return Group.Role
		end
	end
	return "Guest"
end

function GroupService:GetPrimaryGroupAsync(Player)
	local Groups = GroupService:GetGroupsAsync(Player)
	for Index = 1, #Groups do
		local Group = Groups[Index]
		if Group.IsPrimary then
			return Group
		end
	end
	return nil
end

function GroupService:IsInGroupAsync(Player, GroupID)
	local Groups = GroupService:GetGroupsAsync(Player)
	for Index = 1, #Groups do
		if Groups[Index].Id == GroupID then
			return true
		end
	end
	return false
end

function GroupService:IsPrimaryGroupAsync(Player)
	local Groups = GroupService:GetGroupsAsync(Player)
	for Index = 1, #Groups do
		if Groups[Index].IsPrimary then
			return true
		end
	end
	return false
end

function GroupService:IsGroupAlly(GroupID, TargetGroupID)
	local Groups = GroupService:GetGroupAlliesAsync(GroupID)
	for Index = 1, #Groups do
		if Groups[Index].Id == TargetGroupID then
			return true
		end
	end
	return false
end

function GroupService:GetGroupAlliesAsync(GroupID)
	local Success, GroupAlliesPages = pcall(RbxGroupService.GetAlliesAsync, RbxGroupService, GroupID)
	local GroupAllies = Success and GroupAlliesPages and PagesToArray(GroupAlliesPages)
	return GroupAllies
end

function GroupService:GetGroupsAsync(Player)
	local UserId = (typeof(Player) == "Instance" and Player:IsA("Player")) and Player.UserId or typeof(Player) == "number" and Player
	local Success, Groups = pcall(RbxGroupService.GetGroupsAsync, RbxGroupService, UserId)
	return Success and Groups or { }
end

function GroupService:GetGroupInfoAsync(GroupID)
	local Success, GroupInfo = pcall(RbxGroupService.GetGroupInfoAsync, RbxGroupService, GroupID)
	return Success and GroupInfo or { }
end

return GroupService
